const express = require('express');
const router  = express.Router();
const websiteHelper = require('../db/queries/dashboards');
const cookieSession = require('cookie-session');
const app = express();

//  middleware
app.use(express.urlencoded({ extended: false })); // changed from true to false when using cookieSession insetad of cookieParser
app.use(cookieSession({
  name: 'cookiemonster',
  keys: ['hfy843hfhdsakfytdsaghfbad43q46', 'fhdjak4728946fa6df8sdhffa646']
}));

// Displays list of User's website
router.get('/', (req, res) => {

  const userId = 1;         //req.session.id; implement this when login feature is available
  const role = ['admin', 1];  //[req.session.role, req.session.organizationId];

  console.log('user id is :', userId);
  console.log(role);

  // Implement this when log in feature is available
  // if(!userId) {
  //   res.redirect('/');
  //   return;
  // }

  websiteHelper.getWebsites(userId, role).then(info => {
    res.render('dashboards', {info});
  })
});

// Updates user's password
router.post('/:id/update', (req, res) => {
  websiteHelper.updatePassword(req.body.password, req.params.id).then(() => {
    res.redirect('/dashboard');
  });
});

router.post('/:id/new', (req, res) => {

  const userId = 1; //req.session.id; implement this when login feature is available

  // Implement this when log in feature is available
  // if(!userId) {
  //   res.redirect('/');
  //   return;
  // }

  websiteHelper.addWebsites(userId, req.body.name, req.body.login_url, req.body.username, req.body.password)
  res.redirect('/dashboard');
})

// Deletes entry
router.post('/:id/delete', (req, res) => {
  websiteHelper.deleteWebsite(req.params.id).then(() => {
    res.redirect('/dashboard');
  });
});

module.exports = router;
