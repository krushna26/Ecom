const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const mailer = require('../helpers/mailer');
const { validationResult } = require('express-validator');

const userRegister = async function(req, res) {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "errors",
                errors: errors.array()
            });
        }

        const { name, email, mobile, password } = req.body;

        // Check if the email is already registered
        const dataemail = await userModel.findOne({ email: email });
        if (dataemail) {
            return res.status(400).json({
                success: false,
                msg: "User Already Registered!"
            });
        }

        // Check if an image file is uploaded
        // if (!req.file) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "Image is required!"
        //     });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Create a new user
        const user = new userModel({
            name,
            email,
            mobile,
            password: hashedPassword,
            // is_verified: 1,
            // image: 'images/' + req.file.filename
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Send verification email
        const msg = `<p>Hi ${name}, Verify your email <a href="http://localhost:3001/api/register">here</a></p>`;
        mailer.sendMail(email, "Mail Verification", msg);

        // Return the newly created user
        return res.status(200).json({
            success: true,
            data: savedUser
        });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            msg: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    userRegister
};
