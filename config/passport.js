
const passport = require('passport');
const LocalStrategy = require('passport-local');
const config=require('./../config');

const {User} =require('../models/models');

const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

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

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : config.secret
},
function (jwtPayload, cb) {

  //find the user in db if needed
  return User.findByPk(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));