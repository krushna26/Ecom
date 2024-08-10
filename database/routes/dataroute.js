var express = require('express');
var router = express.Router();
const User = require('../models/user');  // Use a capital 'U' for the model
const jwt = require('jsonwebtoken');
// const jwt_decode = require('jwt-decode');



router.post('/add', async function(req, res, next) {
  try {
    const userData = req.body;
    const username=userData.username;
    const email=userData.email;
    const password=userData.password;
  
    const user = new User({
      username,email,password
    }
    );
    const savedUser = await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET route to fetch all users
// router.get('/', async function(req, res, next) {
//   try {
//     const users = await User.find();
//     res.status(200).send(users);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });



//code for the login Functanalities
router.post('/login',async (req,res,next)=>{
  const email=req.body.email;
  const password=req.body.password;

  const checkuser=await User.findOne({email});
  if (!checkuser){
    res.status(400).send({error:"Invalid email"});

  }

  if (checkuser.password!=password){
    res.status(400).send({error:"Invalid email or password"});

  }
  try {
    const token = jwt.sign({ userId: checkuser._id },process.env.JWT_SECRET,{ expiresIn: '1h' });
    res.status(200).send({ token ,username:checkuser.username,id:checkuser.id});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }

  
})





module.exports = router;
