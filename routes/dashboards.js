const express = require('express');
const router  = express.Router();
const websiteHelper = require('../lib/dashboard');

// Displays list of User's website
router.get('/', (req, res) => {
  websiteHelper.getWebsites(1).then(info => {
    console.log(info);
    res.render('dashboards', {info});
  })
});

router.post('/:id/update', (req, res) => {
  websiteHelper.updatePassword(req.body.password, req.params.id).then(() => {
    res.redirect('/dashboard');
  });
});

module.exports = router;
