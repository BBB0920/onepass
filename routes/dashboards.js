const express = require('express');
const router  = express.Router();
const websiteHelper = require('../db/queries/dashboards');

// Displays list of User's website
// Currently using 1 as a standalone
router.get('/', (req, res) => {
  websiteHelper.getWebsites(1).then(info => {
    res.render('dashboards', {info});
  })
});

// Updates user's password
router.post('/:id/update', (req, res) => {
  websiteHelper.updatePassword(req.body.password, req.params.id).then(() => {
    res.redirect('/dashboard');
  });
});

// Deletes entry
router.post('/:id/delete', (req, res) => {
  websiteHelper.deleteWebsite(req.params.id).then(() => {
    res.redirect('/dashboard');
  });
});

module.exports = router;
