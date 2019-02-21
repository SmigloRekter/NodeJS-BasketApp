//Init
const { User, Game,Playground,Comment } = require('./models/models');
const PORT = process.env.PORT || 5000;
require('./config/passport');


var test = require('./test');
var AuthController = require('./AuthController.js');
var GameController = require('./GameController.js');
var PlaygroundController = require('./PlaygroundController');

const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
};
const passport = require('passport');
const LocalStrategy = require('passport-local');
var express = require("express");
var app = express();
var cors = require('cors');
// Add headers
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});

app.use(require('./routes'));
app.use(LoggerMiddleware);


app.get("/user", (req, res, next) => {
    User.findAll().then(users => {
        res.json(users);
      })

   });


app.use('/api/auth', AuthController);
app.use('/api/game', GameController);
app.use('/test',test);
app.use('/api/ground', PlaygroundController);
module.exports = app;
app.listen(PORT, () => {
 console.log("Server running on port 5000");
});

