const {check} =require('express-validator')

exports.registerValidators=[
    check('name','Name is Required').not().isEmpty(),
    check('email','Enter Valid email').isEmail().normalizeEmail(),

     check('mobile','Enter the mobile number of 10 digits only').isLength({
        min:10,
        max:10
     }),
    check('password','Enter password of length of 6 which has 1 special char,1 uppercase,1 lowercase,1 number').isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minSymbols:1,
        minNumbers:1
    })
    // check('image').custom((value, { req }) => {
    //     if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpg") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }).withMessage("Upload Image of Jpg/png Type.")
    




]