const express = require("express");
const router = express.Router();
const client = require('../db/connection');
const db = require("../db/connection");
const bcrypt = require("bcryptjs");



router.get("/", (req, res) => {
  res.render("register");


});
