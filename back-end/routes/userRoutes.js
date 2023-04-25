// Table: User
const usersRouter = require('express').routes();
const {createUser, retrieveUser, updateUser, deleteUser, listAllUsers} = require("../controllers/userControllers");

usersRouter.post('/users', createUser); // Create a new user: POST /users
usersRouter.get('/users/:id', retrieveUser); // Retrieve a user by id: GET /users/:id
usersRouter.put('/users/:id', updateUser); // Update a user: PUT /users/:id
usersRouter.delete('/users/:id', deleteUser); // Delete a user: DELETE /users/:id
usersRouter.get('/users', listAllUsers); // List all users: GET /users

module.exports = usersRouter;
