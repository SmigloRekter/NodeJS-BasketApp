const Sequelize = require('sequelize');

const sequelize = new Sequelize('monsterek', 'monsterek', 'lcQPr4rdk51v4THx', {
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

const User = sequelize.define('users', {
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

  const Comment = this.sequelize.define('comment', {
    id: {type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    content: Sequelize.STRING,
    playground_id: Sequelize.INTEGER,
    user_id:Sequelize.INTEGER
  });

  User.hasMany(this.Comment, {
    foreignKey: 'user_id',
    constraints: false,
  });
  Comment.belongsTo(this.User, {
    foreignKey: 'user_id',
    constraints: false,
  });


  //sequelize.sync()

  module.exports = { Monsterek_Type, Monsterek };
