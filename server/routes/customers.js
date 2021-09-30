const auth = require("../middleware/auth");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    companyName: req.body.companyName,
    companyType: req.body.companyType,
    email: req.body.email,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: req.body.name,
      companyName: req.body.companyName,
      companyType: req.body.companyType,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("Customer not Found");
  customer.userId = req.body.userId;
  customer.firstName = req.body.firstName;
  customer.lastName = req.body.lastName;
  customer.name = req.body.name;
  customer.companyName = req.body.companyName;
  customer.companyType = req.body.companyType;
  customer.email = req.body.email;
  customer.phone = req.body.phone;

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not Found");
  res.send(customer);
});

router.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not Found");
  res.send(customer);
});
module.exports = router;
