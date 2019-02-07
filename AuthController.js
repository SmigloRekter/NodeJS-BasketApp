var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const { User, Game,Playground,Comment } = require('./models.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
   const user= User.build({ 
    city:req.body.city,
    email:req.body.email,
    password_hash:hashedPassword,
    games_played:0,
    avatar_location:req.body.avatar_location,
    name:req.body.name,
    surname:req.body.surname,
    login:req.body.login,
    role: req.body.role })

    user.save().then(() => {
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
      })
      
      user.save().catch(error => {
        return res.status(500).send("There was a problem registering the user`.");
      })
  });

  module.exports = router;