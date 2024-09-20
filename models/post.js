module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    heading: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    filePath: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Like, { foreignKey: 'postId' });
  };

  return Post;
};
