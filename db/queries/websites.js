const db = require('../connection');

const addWebsites = function(website_name, url, category, password, user_id, organization_id){
  return db
  .query(`INSERT INTO websites (website_name, url, category, password, user_id, organization_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [website_name, url, category, password, user_id, organization_id])
  .then((result) => {
    return result.rows[0];
  })
}

const getWebsites = function(user_id){
  return db
  .query(`SELECT * FROM websites WHERE user_id = $1`, [user_id])
  .then((result) => {
    return result.rows;
  })
}

const getWebsiteById = function(id){
  return db
  .query(`SELECT * FROM websites WHERE id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  })
}

const updatePassword = function(newPassword, id) {
  return db
  .query(`UPDATE websites SET password = $1 WHERE id = $2`, [newPassword, id])
}

const deleteWebsite = function(id) {
  return db
  .query(`DELETE FROM websites WHERE id = $1`, [id])
}

 // Missing Create and Read
module.exports = {
  addWebsites,
  getWebsites,
  getWebsiteById,
  updatePassword,
  deleteWebsite
}
