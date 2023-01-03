const { Pool } = require('pg');
const { user } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

module.exports = {
  getWebsites: function(user_id){
    return pool
    .query(`SELECT * FROM websites WHERE user_id = $1`, [1])
    .then((result) => {
      return result.rows;
    })
  },

  updatePassword: function(newPassword, id) {
    return pool
    .query(`UPDATE websites SET password = $1 WHERE id = $2`, [newPassword, id])
  }
}
