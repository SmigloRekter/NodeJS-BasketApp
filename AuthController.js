var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const {User, Game, Playground, Comment } = require('./models.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('/identify', function (req,res) {
  var token = req.body.token;
  var j = jwt.decode(token);
  User.findById(j.id).then(u => {
    res.status(200).send(u);
  })
})

router.post('/reset_password', function (req,res) {
  res.status(200).send("TODO");
})

router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const temp_user = User.build({
    city: req.body.city,
    email: req.body.email,
    password_hash: hashedPassword,
    games_played: 0,
    avatar_location: req.body.avatar_location,
    name: req.body.name,
    surname: req.body.surname,
    login: req.body.login,
    role: req.body.role
  })


  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) return res.status(500).send({
      status: "EMAIL_TAKEN"
    });
    User.findOne({
      where: {
        login: req.body.login
      }
    }).then(user => {
      if (user) return res.status(500).send({
        status: "LOGIN_TAKEN"
      });
      temp_user.save().then(() => {
        var token = jwt.sign({
          id: temp_user.id
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
          auth: true,
          token: token
        });
      }).catch(error => {
        return res.status(500).send({
          status: "FAIL"
        });
      })
    })
  })
});


router.post('/login', function (req, res) {
  User.findOne({
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (!user) return res.status(404).send({
      status: "FAIL"
    });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password_hash);
    if (!passwordIsValid) return res.status(401).send({
      auth: false,
      token: null
    });
    var token = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
      token: token
    });
  });
});

module.exports = router;
