const Sequelize = require('sequelize');

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

const User = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city:Sequelize.STRING,
    email:Sequelize.STRING,
    password_hash:Sequelize.STRING,
    games_played:Sequelize.INTEGER,
    avatar_location:Sequelize.STRING,
    name:Sequelize.STRING,
    surname:Sequelize.STRING,
    login:Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        values: ['USER','ADMIN']
    }
  });

  const Game = sequelize.define('Games', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_date:Sequelize.DATE,
    end_date:Sequelize.DATE,
    players_count:Sequelize.INTEGER,
    max_players:Sequelize.INTEGER,
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
    games_played:Sequelize.INTEGER,
    image_location:Sequelize.STRING,
    latitude:Sequelize.DOUBLE,
    longitude:Sequelize.DOUBLE,
    light:Sequelize.BOOLEAN,
    name:Sequelize.STRING,
    rating_count:Sequelize.INTEGER,
    rating_sum:Sequelize.INTEGER,
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
    user_id:Sequelize.INTEGER
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



  //sequelize.sync()

  module.exports = { User, Game,Playground,Comment };
