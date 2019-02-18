
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { User, Game,Playground,Comment } =require('../models/models');

passport.use(new LocalStrategy({
  usernameField: 'user[login]',
  passwordField: 'user[password]',
}, (login, password, done) => {
    User.findOne({ login })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'login or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));