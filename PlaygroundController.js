var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const {User, Game, Playground, Comment } = require('./models.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('/add', function (req,res) {
    
})

router.post('/get', function (req,res) {
    Playground.findById(req.body.game_id).then(g => {
        res.status(200).send(g);
    })
})

router.post('/all', function (req,res) {
    Playground.findAll().then(games => {
        res.json(games);
    })
})

router.post('/rate', function (req,res) {
  
})

router.post('/add_comment', function (req,res) {
  
})

module.exports = router;