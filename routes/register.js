const express = require("express");
const router = express.Router();
const client = require('../db/connection');
const db = require("../db/connection");
const bcrypt = require("bcryptjs");


router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const organizationId = req.body.organizationId;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  await createUser(req, res, organizationId, email, password, role);

async function createUser(req, res, organizationId, email, password, role) {
  try {
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rowCount > 0) {
      throw new Error("Email already exists");
    }

    // Check for a valid organization ID
    const organizationCheck = await db.query(
      "SELECT * FROM organizations WHERE id = $1",
      [organizationId]
    );
    if (organizationCheck.rowCount === 0) {
      throw new Error("Invalid organization ID");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      "INSERT INTO users (organization_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [organizationId, email, hashedPassword, role]
    );
    const userId = result.rows[0].id;

    // Store the user data in the cookie session
    req.session.user = {
      id: userId,
      organizationId: req.body.organizationId,
      email: req.body.email,
      role: req.body.role,
    };

    res.send("User created successfully");
  } catch (err) {
    console.error(err);
    // throw err;
    res.send("Error creating user");

  }
}


});


module.exports = router;
