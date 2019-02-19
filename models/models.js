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
  
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  });

var User = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city:Sequelize.STRING,
    email:Sequelize.STRING,
    passwordHash:Sequelize.STRING,
    gamesPlayed:Sequelize.INTEGER,
    avatarLocation:Sequelize.STRING,
    name:Sequelize.STRING,
    surname:Sequelize.STRING,
    login:Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        values: ['USER','ADMIN']
    }
    }
  );

  User.prototype.validatePassword = function (password) {
   return bcrypt.compareSync(password, this.password_hash);
    };

  User.prototype.setPassword = function(password) {
    hash=bcrypt.hashSync(password, 8);
    this.password_hash = hash;
  };

  const Game = sequelize.define('Games', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate:Sequelize.DATE,
    endDate:Sequelize.DATE,
    playersCount:Sequelize.INTEGER,
    maxPlayers:Sequelize.INTEGER,
    description:Sequelize.TEXT,
    playgroundId:Sequelize.INTEGER
  });

  const Playground = sequelize.define('Playgrounds', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city:Sequelize.STRING,
    gamesPlayed:Sequelize.INTEGER,
    imageLocation:Sequelize.STRING,
    latitude:Sequelize.DOUBLE,
    longitude:Sequelize.DOUBLE,
    light:Sequelize.BOOLEAN,
    name:Sequelize.STRING,
    ratingCount:Sequelize.INTEGER,
    ratingSum:Sequelize.INTEGER,
    state:{
      type: Sequelize.ENUM,
        values: ['OLD','NEW']
    },
    street:Sequelize.STRING,
    surface:{
      type: Sequelize.ENUM,
        values: ['ASPHALT','RUBBER']
    },
    type:{
      type: Sequelize.ENUM,
        values: ['SCHOOL','ORLIK','OTHER']
    }
  });

  const Comment = sequelize.define('Comments', {
    id: {type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    content: Sequelize.STRING,
    userId:Sequelize.INTEGER
  });

  User.hasMany(Comment, {foreignKey: 'userId'});
  Comment.belongsTo(User,{foreignKey: 'userId' });


  Playground.hasMany(Game, {foreignKey: 'playgroundId'});
  Game.belongsTo(Playground, {foreignKey: 'playgroundId'});

  User.belongsToMany(User, {as: 'Friends',through:'FriendsList'});

  Game.belongsToMany(User, { as: 'players', through: 'User_games', foreignKey: 'gameId' })
  User.belongsToMany(User, { as: 'games', through: 'User_games', foreignKey: 'userId' })

  Playground.hasMany(Comment);
  Comment.belongsTo(Playground);



  sequelize.sync({force:true})

  module.exports = { User, Game,Playground,Comment };
