const express = require("express");
const router = express.Router();
const client = require("../db/connection");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("login");
});


router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await login(req, res, email, password);

  async function login(req, res, email, password) {
    try {
      const result = await client.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rowCount === 0) {
        throw new Error("Invalid email or password");
      }
      const user = result.rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
      }
      req.session.user = {
        id: user.id,
        organizationId: user.organization_id,
        email: user.email,
        role: user.role,
      };
    console.log("User created successfully");

    res.redirect("/auth");

    } catch (err) {
      console.error(err);
      throw err;
    }
  }



});




module.exports = router;
