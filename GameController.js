const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

const {
    UserGames,
    User,
    Game,
    Playground
} = require('./models/models.js');

router.post('', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    const user = req.user;

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

router.get('', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    Game.findAll().then(games => {
        res.json(games);
    })
});

router.get('/plays/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.user;
    var id = req.params.id;

    UserGames.count({
        where: {
            GameId: id,
            UserId: user.id
        }
    }).then(cnt => {
        if (cnt == 0)
            res.status(200).send();
        else
            res.status(403).send();
    });
});

router.get('/join/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.user;
    var id = req.params.id;
    Game.findByPk(id).then(game => {
        user.getGames().then(games => {
            if (games.includes(game))
                res.status(403).send();
            else {
                game.addUser(user);
                game.playersCount += 1;
                game.save();
                res.status(200).send(game);
            }
        });

    });

});

router.get('/leave/:id', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.user;
    var id = req.params.id;
    Game.findByPk(id).then(game => {
        game.removeUser(user);
        res.status(200).send();
    });

});


module.exports = router;