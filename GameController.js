var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var auth=require('./routes/auth');


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const {User, Game, Playground, Comment } = require('./models/models.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('/add', auth.required, function (req,res) {
    

    const tempGame = Game.build(req.body.game);
    tempGame.save().then(()=>{
        res.status(200).send();
    })

});

router.get('/:id', function (req,res) {
    var id=req.params.id;
    Game.findByPk(id).then(game => {
        res.status(200).send(game);
    });
});

router.post('/all', function (req,res) {
    Game.findAll().then(games => {
        res.json(games);
    })
})

router.post('/join', function (req,res) {
  
})

router.post('/leave', function (req,res) {
  
})

module.exports = router;
