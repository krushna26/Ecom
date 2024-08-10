const express = require('express');
const router=express.Router();
const User=require('../models/user')



//Code to fetch cartitems data and 


router.get('/getcartdetail/:userid',async (req,res,next)=>{
   try {
    const userid=req.params.userid;
    const userwithcart=await User.findById(userid);
    if(userwithcart){
        res.status(200).send(userwithcart);
    }
    else{
        res.status(500).send({message:"Can't fetch the details for particular user "})
    }
    
   } catch (error) {
    res.status(500).send({ error: err.message });
    
   }


});


router.put('/updatecart/:userid',async (req,res,next)=>{
    try {
        const userids=req.params.userid;
        const cartdata=req.body;
        const updatedres= await User.findByIdAndUpdate(
            userids,
            {$set:  { cartitems: cartdata }   },
            {new:true}
           
        );

        if (updatedres){
            res.status(200).send({message:"Added"});

        }
        else{
            res.status(500).send({ error: "err.message "});
        }

        
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
})



module.exports = router;