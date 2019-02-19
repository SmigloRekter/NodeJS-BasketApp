var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile',passport.authenticate('jwt', {session: false}), function(req, res, next) {
    res.send(req.user);
});

module.exports = router;