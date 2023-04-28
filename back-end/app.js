const express = require('express'); // framework utilise 
const app = express(); // on active ce framework
const cors = require('cors'); // permet davoir des images de plusieurs origines 
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const helmet = require('helmet'); //  securite http
require("dotenv").config(); // taccede a lenv

// routes
const usersRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const likeRouter = require("./routes/likeRoutes");
const commentRouter = require("./routes/commentRoutes");

// middleware 
app.use(cors()); // http
app.use(express.json()); // pour transformer la requete en json 
app.use(express.urlencoded({ extended: true })); //  pour mettre dans le corps de la requete (req.body)
app.use(helmet());
 
// http://localhost:4001 this works
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// 
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