const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4001;

const { sequelize } = require('./config/database');

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});