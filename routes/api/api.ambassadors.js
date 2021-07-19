const express = require('express');
var exphbs = require('express-handlebars');
const router = express.Router();
const app = express();
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
const passport = require('passport');

// controllers
const Ambassadors = require('../../controllers/ambassadorsController.js');
const AmbassadorService = Ambassadors.AmbassadorsService;

router.use((req, res, next) => {
  res.set({
    // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
    // Set content-type for all api requests
    'Content-type': 'application/json'
  });
  if (req.method == 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {

  if (req.body.username && req.body.password) {
    AmbassadorService.assign(req).then((delegate) => {
      req.session.user = delegate.username;
      res.redirect('/embassy/lobby/');
    });
  } else {
    res.redirect('/');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/embassy/lobby',
  failureRedirect: '/',
  failureFlash: false       // flash messages are supported
  })
);
router.get('/logout', (req, res, next) => {
  if (req.user) {
    req.user == null;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});
router.post('/create', (req, res, next) => {
  if (req.body.username && req.body.password) {
    // you should be checking if the user exist if not then you wouldn't create them.
    AmbassadorService.assign(req).then((delegate) => {
      res.status(200);
      res.send(JSON.stringify(delegate));
    });
  } else {
    res.redirect('/');
  }
});
router.get('/list/', (req, res, next) => {
  AmbassadorService.list().then((delegate) => {
    res.status(200);
    res.send(JSON.stringify(delegate));
  });
});


module.exports = router;
