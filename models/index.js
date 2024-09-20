const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Post = require('./post')(sequelize, Sequelize.DataTypes);
db.Like = require('./like')(sequelize, Sequelize.DataTypes);
db.Follow = require('./follow')(sequelize, Sequelize.DataTypes);

// Relationships
db.User.associate(db);
db.Post.associate(db);
db.Like.associate(db);
db.Follow.associate(db);

module.exports = db;
