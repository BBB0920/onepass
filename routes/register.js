const express = require("express");
const router = express.Router();
const client = require('../db/connection');
const db = require("../db/connection");
const bcrypt = require("bcryptjs");


router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const organizationName = req.body.organizationName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  await createUser(req, res, organizationName, email, password, role);

async function createUser(req, res, organizationName, email, password, role) {
  try {
    // Check if email already exists
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rowCount > 0) {
      throw new Error("Email already exists");
    }

    // Insert new organization into organizations table and get the generated id
    const result = await db.query(
      "INSERT INTO organizations (name) VALUES ($1) RETURNING id",
      [organizationName]
    );
    const organizationId = result.rows[0].id;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into users table
    const result2 = await db.query(
      "INSERT INTO users (organization_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [organizationId, email, hashedPassword, role]
    );
    const userId = result2.rows[0].id;

    // Store the user data in the cookie session
    req.session.user = {
      id: userId,
      organizationId: organizationId,
      email: email,
      role: role,
    };

    console.log("User created successfully");

    res.redirect("/auth");
  } catch (err) {
    console.error(err);
    res.send("Error creating user");
  }
}


});


module.exports = router;
