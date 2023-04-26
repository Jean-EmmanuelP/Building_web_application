const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4001;

const { sequelize, showTables } = require('./config/database');

sequelize
  .authenticate()
  .then(async () => {
    console.log('Database connection has been established successfully.');
    await showTables();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
