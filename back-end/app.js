const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require("dotenv").config();

const usersRouter = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
 
// http://localhost:4001 this works
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api', usersRouter);

module.exports = app;