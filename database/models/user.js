const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cartitems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 0 },
    },
  ],
});

const user = mongoose.model("user", userschema);
module.exports = user;
