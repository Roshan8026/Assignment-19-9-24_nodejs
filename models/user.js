'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

   User.associate = function(models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Like, { foreignKey: 'userId' });
    User.belongsToMany(models.User, {
      as: 'Followers',
      through: models.Follow,
      foreignKey: 'followingId'
    });
    User.belongsToMany(models.User, {
      as: 'Following',
      through: models.Follow,
      foreignKey: 'followerId'
    });
  };
  
  return User;
};