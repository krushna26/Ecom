const mongoose = require('mongoose');


const cartschema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    items:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
        quantity:{type:Number,default:1}

    }]
});
const cart=mongoose.model('cart',cartschema);
module.exports=cart;