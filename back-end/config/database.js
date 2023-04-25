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
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false },
});

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres',
  logging: false,
  ssl: { rejectUnauthorized: false },
});

// Initialize models
const User = createUserModel(sequelize);
const Post = createPostModel(sequelize);
const Comment = createCommentModel(sequelize);
const Like = createLikeModel(sequelize);

// Set up associations
Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });


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
};
