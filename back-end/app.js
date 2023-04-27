const express = require('express');
const app = express();
const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const helmet = require('helmet');
require("dotenv").config();

const usersRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const likeRouter = require("./routes/likeRoutes");
const commentRouter = require("./routes/commentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
 
// http://localhost:4001 this works
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api', usersRouter);
app.use('/api', postRouter);
app.use('/api', likeRouter);
app.use('/api', commentRouter);
app.use('/api', usersRouter);

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

module.exports = app;