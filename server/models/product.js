const mongoose = require("mongoose");
// const Joi = require("joi");

const productSchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema);

exports.productSchema = productSchema;
exports.Product = Product;
// exports.validate = validateProduct;
