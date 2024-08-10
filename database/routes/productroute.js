var express = require("express");
var router = express.Router();
const product = require("../models/product");
// const product = require("../models/product");
/* GET home page. */
router.post("/add", async function (req, res, next) {
  try {
    const productData = req.body;
    const user1 = new product(productData);
    const savedUser = await user1.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/", async function (req, res, next) {
  try {
    const products = await product.find();
    // console.log(products);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//To fetch the details of the product
router.get("/productdetails/:id", async function (req, res, next) {
  try {
    const pid = req.params.id;
    const productdetails = await product.findById(pid);
    res.status(200).send(productdetails);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/// Update product
router.put("/updateproduct/:id", async (req, res, next) => {
  const productId = req.params.id;
  const updateFields = req.body;

  try {
    if (updateFields._id) {
      delete updateFields._id;
    }

    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).send({ message: "Successfully Updated !!", updatedProduct });
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send({ error: err.message });
  }
});

//Code for the deleting the particular elements from the data this feature is only for the seller only..
router.delete("/delete/:id", async (req, res, next) => {
  const user_id = req.params.id;
  const result = await product.findByIdAndDelete(user_id);
  if (result) {
    res.status(200).send({ message: "User Deleted Sucessfully!" });
  } else {
    res.status(400).send({ error: err.message });
  }
});


// For Finding of popular product
router.get("/limit", async function (req, res, next) {
  try {
    const l=3;
    const products = await product.find().limit(l);
    // console.log(products);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
