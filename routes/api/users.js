const { User, Game,Playground,Comment } =require('../../models/models');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');



//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: "gitara" });
    });
});

module.exports = router;