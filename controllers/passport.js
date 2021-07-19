const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
//const User = mongoose.model('Ambassador');
const User = require('../models/adminUsers.js');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {

  User.findOne({ username })
    .then((user) => {

      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({'username': id}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
