const { Sequelize } = require('sequelize');
const { Pool } = require("pg");
const createUserModel = require('./models/user');

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

const User = createUserModel(sequelize);

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
};
// the code done by phind 
// config/database.js
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
//   host: 'your_host',
//   dialect: 'mysql',
// });

// module.exports = sequelize;

// Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// // Sync models with the database
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Tables have been created or updated.');
//   })
//   .catch((error) => {
//     console.error('Unable to sync with the database:', error);
//   });
