const Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

const sequelize = new Sequelize('basket_node', 'basket_node', 'UpTxH5i14BmhoX7A', {
    host: '87.98.236.38',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    operatorsAliases: false
});

var User = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city: Sequelize.STRING,
    email: Sequelize.STRING,
    passwordHash: Sequelize.STRING,
    gamesPlayed: {type: Sequelize.INTEGER, defaultValue: 0},
    avatarLocation: Sequelize.STRING,
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    login: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        values: ['USER', 'ADMIN'],
        defaultValue: 'USER'
    }
    }
);

User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

User.prototype.setPassword = function (password) {
    hash = bcrypt.hashSync(password, 8);
    this.passwordHash = hash;
};

const Game = sequelize.define('Games', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    playersCount: {type: Sequelize.INTEGER, defaultValue: 0},
    maxPlayers: Sequelize.INTEGER,
    description: Sequelize.TEXT
});

const Playground = sequelize.define('Playgrounds', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city: Sequelize.STRING,
    gamesPlayed: Sequelize.INTEGER,
    imageLocation: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    light: Sequelize.BOOLEAN,
    rating: Sequelize.DOUBLE,
    name: Sequelize.STRING,
    state: {
        type: Sequelize.ENUM,
        values: ['OLD', 'NEW']
    },
    street: Sequelize.STRING,
    surface: {
        type: Sequelize.ENUM,
        values: ['ASPHALT', 'RUBBER']
    },
    type: {
        type: Sequelize.ENUM,
        values: ['SCHOOL', 'ORLIK', 'OTHER']
    }
});

const Comment = sequelize.define('Comments', {

    content: Sequelize.STRING,
    rating: Sequelize.INTEGER,
    PlaygroundId: {type: Sequelize.INTEGER, primaryKey: true},
    UserId: {type: Sequelize.INTEGER, primaryKey: true}
});

Playground.prototype.updateRating = function () {

    Comment.findAll({where: {PlaygroundId: this.id}}).then(
        comments => {
            var rating = 0.0;

            comments.forEach(function (comment) {
                rating += comment.rating;
            });
            rating /= comments.length;
            console.log(rating);
            this.rating = rating.toFixed(2);
            this.save();
        }
    )

};

User.hasMany(Comment);
Comment.belongsTo(User, {through: 'UserId'});


Playground.hasMany(Game);
Game.belongsTo(Playground);

User.belongsToMany(User, {as: 'Friends', through: 'FriendsList'});

const UserGames = sequelize.define('userGames');

Game.belongsToMany(User, {through: UserGames});
User.belongsToMany(Game, {through: UserGames});


Playground.hasMany(Comment);
Comment.belongsTo(Playground, {through: 'PlaygroundId'});

sequelize.sync();

module.exports = {User, Game, Playground, Comment, UserGames};
