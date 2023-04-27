const { Sequelize, DataTypes } = require('sequelize');

const createPostModel = (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'Post',
  });

  return Post;
}

module.exports = createPostModel;
