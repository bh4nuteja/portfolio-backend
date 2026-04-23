const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const express = require("express");


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: admin._id }, "secret123");

  res.json({ token });
});

module.exports = router;