const { Sequelize } = require('sequelize');
const { Pool } = require("pg");

// Import models
const createUserModel = require('../models/userModel');
const createPostModel = require('../models/postModel');
const createCommentModel = require('../models/commentModel');
const createLikeModel = require('../models/likeModel');

require("dotenv").config();

// Creates the connection between the Postgres database and the NodeJS server.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

async function showTables() {
  const models = [User, Post, Comment, Like];
  console.log('Tables in the database:');
  models.forEach((model) => {
    console.log(model.getTableName());
  });
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set this to `true` if you are using a custom SSL certificate
    },
  },
});

// Initialize models
const User = createUserModel(sequelize);
const Post = createPostModel(sequelize);
const Comment = createCommentModel(sequelize);
const Like = createLikeModel(sequelize);

// Set up associations
Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'author' });
User.hasMany(Comment, { foreignKey: 'user_id', sourceKey: 'id' });

Comment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });
Post.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'id' });

// Like associations
Like.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Like, { foreignKey: 'user_id', sourceKey: 'id' });

Like.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });
Post.hasMany(Like, { foreignKey: 'post_id', sourceKey: 'id' });

// Returns the query's response
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
}

module.exports = {
  query,
  User,
  Post,
  Comment,
  Like,
  sequelize,
  showTables,
};
