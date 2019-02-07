//Init
const { User, Game,Playground,Comment } = require('./models.js');

var AuthController = require('./AuthController.js');

const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}

var express = require("express");
var app = express();
app.use(LoggerMiddleware);

app.get("/user", (req, res, next) => {
    User.findAll().then(users => {
        res.json(users);
      })

   });


app.use('/api/auth', AuthController);
module.exports = app;
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

