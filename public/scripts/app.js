// Client facing scripts here
const db = require("../db/connection");

/*
const users = await getUsersByOrganization('Acme Inc');
*/
async function getUsersByOrganization(organizationName) {
  try {
    await client.connect();
    const result = await client.query(
      "SELECT u.* FROM users u JOIN organizations o ON u.organization_id = o.id WHERE o.name = $1",
      [organizationName]
    );
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve users");
  } finally {
    await client.end();
  }
}


/* Create User
await createUser(1, 'jane.doe@acme.com', 'P@ssw0rd123', 'admin');
-check email
-hash password
-create session cookie
*/

async function createUser(req, res, organizationId, email, password, role) {
  try {
    await client.connect();
    const emailCheck = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rowCount > 0) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await client.query(
      "INSERT INTO users (organization_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [organizationId, email, hashedPassword, role]
    );
    const userId = result.rows[0].id;
    req.session.userId = userId;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

/* LOGIN
await login(req, res, 'jane.doe@acme.com', 'P@ssw0rd123');
*/

async function login(req, res, email, password) {
  try {
    await client.connect();
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
    req.session.userId = user.id;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}


/* Get resources by user
- retrieve all the passwords, secure notes, and files that belong to a user
await login(req, res, 'jane.doe@acme.com', 'P@ssw0rd123');

const userId = 1;
const resources = await getUserResources(userId);

*/

async function getUserResources(userId) {
  try {
    await client.connect();
    const result = await client.query(
      "SELECT * FROM resources WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}


module.exports = {
  getUsersByOrganization,
  createUser,
  login,
  getUserResources
};
