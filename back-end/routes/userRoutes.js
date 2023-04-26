// Table: User
const usersRouter = require('express').Router();
const { auth } = require('../middleware/auth');
const {createUser, loginUser, getUserById, updateUser, deleteUser, getAllUsers} = require("../controllers/userControllers");

usersRouter.post('/users/signup', createUser); // Create a new user: POST /users/signup
usersRouter.post('/users/login', auth, loginUser); // Logs in a user: POST /users/login
usersRouter.get('/users/:id', auth, getUserById); // Retrieve a user by id: GET /users/:id
usersRouter.put('/users/:id', auth,  updateUser); // Update a user: PUT /users/:id
usersRouter.delete('/users/:id', auth, deleteUser); // Delete a user: DELETE /users/:id
usersRouter.get('/users', auth, getAllUsers); // List all users: GET /users

module.exports = usersRouter;
