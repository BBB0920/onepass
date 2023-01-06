// Functions used on dashboard page

const db = require('../connection');

// Add new website and its password - NOT IMPLEMENTED YET
const addWebsites = function(website_name, url, category, password, user_id, organization_id){
  return db
  .query(`INSERT INTO websites (website_name, url, category, password, user_id, organization_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [website_name, url, category, password, user_id, organization_id])
  .then((result) => {
    return result.rows[0];
  })
}

// Get all websites that are available to the specified user
const getWebsites = function(userId, role){

  if(role[0] === 'admin') {
    return db
    .query(`SELECT passwords.id as id, user_id, name, login_url, username, password FROM passwords JOIN users ON user_id = users.id WHERE organization_id = $1 ORDER BY name`, [role[1]])
    .then((result) => {
      return result.rows;
    })
  } else {
    return db
    .query(`SELECT * FROM passwords WHERE user_id = $1 ORDER BY name`, [userId])
    .then((result) => {
      return result.rows;
    })
  }
}

// Get website based on its id
const getWebsiteById = function(id){
  return db
  .query(`SELECT * FROM passwords WHERE id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  })
}

// Update password to the website
const updatePassword = function(newPassword, id) {
  return db
  .query(`UPDATE passwords SET password = $1 WHERE id = $2`, [newPassword, id])
}

// Delete the website from the passwords database
const deleteWebsite = function(id) {
  return db
  .query(`DELETE FROM passwords WHERE id = $1`, [id])
}

module.exports = {
  addWebsites,
  getWebsites,
  getWebsiteById,
  updatePassword,
  deleteWebsite
}
