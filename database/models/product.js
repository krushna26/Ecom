const mongoose=require('mongoose')

const productschema=new mongoose.Schema(
    
    {
        name:String,
        price:String,
        color:String,
        Category:String,
        Description:String,
        ProductImageurl:String,
        // id:String,
        quantity:Number
      }
);

const product=mongoose.model('product',productschema);
module.exports=product;