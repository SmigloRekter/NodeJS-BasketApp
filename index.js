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
const expressSwagger = require('express-swagger-generator')(app);
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

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:5000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./GameController.js'] //Path to the API handle folder
};
expressSwagger(options);

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

