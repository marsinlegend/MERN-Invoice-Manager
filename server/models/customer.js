const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    companyType: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    name: Joi.string().required(),
    companyName: Joi.string().required(),
    companyType: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
