var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

const {
    User,
    Game,
    Playground,
    Comment
} = require('./models/models.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('/add', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.user;

    Game.create(req.body.game).then(game => {
        game.addUser(user);
    });
    res.status(200).send();
});

router.get('/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var id = req.params.id;
    Game.findByPk(id).then(game => {
        res.status(200).send(game);
    });
});

router.get('/all', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Game.findAll().then(games => {
        res.json(games);
    })
})

router.get('/join/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.user;
    var id = req.params.id;
    Game.findByPk(id).then(game => {
        game.getUsers({}).then(players => {
            if (players.includes(user))
                res.status(400).send();
            else {
                game.addUser(user);
                game.playersCount+=1;
                game.save();
                res.status(200).send(game);
            }
        });

    });

});

router.get('/leave', function (req, res) {

})

module.exports = router;