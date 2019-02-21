var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const {User, Game, Playground, Comment} = require('./models/models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.post('', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    Playground.create(req.playground).then(
        playground => {
            res.status(200).send(playground);
        }
    );
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Playground.findByPk(id, {
        include: [{model: Comment}, {model: Game}]
    }).then(court => {
        res.status(200).send(court);
    })
});

router.get('', function (req, res) {
    Playground.findAll().then(games => {
        res.json(games);
    })
});

router.post('/rate', passport.authenticate('jwt', {
    session: false
}), function (req, res) {


    Comment.create(req.body.comment, {UserId: req.user.id}).then(comment => {
        //comment.setUser(req.user);
        comment.getPlayground().then(playground => {
            comment.setPlayground(playground);
            playground.updateRating();

            res.status(200).send();
        });

    })



});
module.exports = router;
