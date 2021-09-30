const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("./product");

const Invoice = mongoose.model(
  "Invoices",
  new mongoose.Schema({
    customerId: { type: String, trim: true, required: true },
    from: {
      companyName: { type: String, required: true },
      name: { type: String, required: true },
      companyAddress: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
      phone: { type: Number, required: true },
    },
    to: {
      clientCompany: { type: String, required: true },
      clientAddress: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
      phone: { type: Number, required: true },
    },
    invoiceNotes: { type: String, required: true },
    invoiceTerms: { type: String, required: true },
    invoiceDate: { type: Date },
    dueDate: { type: Date },
    subtotal: { type: Number, required: true },
    salestax: { type: Number, required: true },
    total: { type: Number, required: true },
    products: [productSchema],
  })
);

function validateInvoice(invoice) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    from: Joi.object({
      companyName: Joi.string().required(),
      name: Joi.string().required(),
      companyAddress: Joi.string().required(),
      city: Joi.string().required(),
      pincode: Joi.number().required(),
      phone: Joi.number().required(),
    }),
    to: Joi.object({
      clientCompany: Joi.string().required(),
      clientAddress: Joi.string().required(),
      city: Joi.string().required(),
      pincode: Joi.number().required(),
      phone: Joi.number().required(),
    }),
    invoiceNotes: Joi.string().required(),
    invoiceTerms: Joi.string().required(),
    invoiceDate: Joi.date(),
    dueDate: Joi.date(),
    subtotal: Joi.number().required(),
    salestax: Joi.number().required(),
    total: Joi.number().required(),
    products: Joi.array().items(
      Joi.object({
        item: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        amount: Joi.number().required(),
      })
    ),
  });
  return schema.validate(invoice);
}

exports.Invoice = Invoice;
exports.validate = validateInvoice;
