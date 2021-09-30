const { Invoice, validate } = require("../models/invoice");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort("name");
  res.send(invoices);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let invoice = new Invoice();
  invoice.customerId = req.body.customerId;
  invoice.from.companyName = req.body.from.companyName;
  invoice.from.name = req.body.from.name;
  invoice.from.companyAddress = req.body.from.companyAddress;
  invoice.from.city = req.body.from.city;
  invoice.from.pincode = req.body.from.pincode;
  invoice.from.phone = req.body.from.phone;
  invoice.products = req.body.products;

  invoice.to.clientCompany = req.body.to.clientCompany;
  invoice.to.clientAddress = req.body.to.clientAddress;
  invoice.to.city = req.body.to.city;
  invoice.to.pincode = req.body.to.pincode;
  invoice.to.phone = req.body.to.phone;
  invoice.invoiceDate = req.body.invoiceDate;
  invoice.dueDate = req.body.dueDate;
  invoice.subtotal = req.body.subtotal;
  invoice.salestax = req.body.salestax;
  invoice.total = req.body.total;
  invoice.invoiceNotes = req.body.invoiceNotes;
  invoice.invoiceTerms = req.body.invoiceTerms;

  invoice.products = req.body.products;

  invoice = await invoice.save();
  res.send(invoice);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    {
      customerId: req.body.customerId,
      from: {
        companyName: req.body.from.companyName,
        name: req.body.from.name,
        companyAddress: req.body.from.companyAddress,
        city: req.body.from.city,
        pincode: req.body.from.pincode,
        phone: req.body.from.phone,
      },
      to: {
        clientCompany: req.body.to.clientCompany,
        clientAddress: req.body.to.clientAddress,
        city: req.body.to.city,
        pincode: req.body.to.pincode,
        phone: req.body.from.phone,
      },
      invoiceNotes: req.body.invoiceNotes,
      invoiceTerms: req.body.invoiceTerms,
      invoiceDate: req.body.invoiceDate,
      dueDate: req.body.dueDate,
      subtotal: req.body.subtotal,
      salestax: req.body.salestax,
      total: req.body.total,
      products: req.body.products,
    },
    { new: true }
  );

  if (!invoice) return res.status(404).send("Invoice not Found");
  // invoice.name = req.body.name;
  // invoice.products = req.body.products;

  invoice.customerId = req.body.customerId;
  invoice.from = req.body.from;
  // invoice.from.companyName = req.body.from.companyName;
  // invoice.from.name = req.body.from.name;
  // invoice.from.companyAddress = req.body.from.companyAddress;
  // invoice.from.city = req.body.from.city;
  // invoice.from.pincode = req.body.from.pincode;
  // invoice.from.phone = req.body.from.phone;
  invoice.products = req.body.products;
  invoice.to = req.body.to;
  // invoice.to.clientCompany = req.body.to.clientCompany;
  // invoice.to.clientAddress = req.body.to.clientAddress;
  // invoice.to.city = req.body.to.city;
  // invoice.to.pincode = req.body.to.pincode;
  // invoice.to.phone = req.body.to.phone;from.

  invoice.invoiceDate = req.body.invoiceDate;
  invoice.dueDate = req.body.dueDate;
  invoice.invoiceNotes = req.body.invoiceNotes;
  invoice.invoiceTerms = req.body.invoiceTerms;
  invoice.subtotal = req.body.subtotal;
  invoice.salestax = req.body.salestax;
  invoice.total = req.body.total;

  invoice.products = req.body.products;

  res.send(invoice);
});

router.delete("/:id", auth, async (req, res) => {
  const invoice = await Invoice.findByIdAndRemove(req.params.id);
  if (!invoice) return res.status(404).send("Invoice not Found");
  res.send(invoice);
});

router.get("/:id", auth, async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).send("Invoice not Found");
  res.send(invoice);
});
module.exports = router;
