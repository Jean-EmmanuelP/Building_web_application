const usersRouter = require('express').Router();
const { auth } = require('../middleware/auth');
const {createUser, loginUser, getUserById, updateUser, deleteUser, getAllUsers} = require("../controllers/userControllers");

usersRouter.post('/users/signup', createUser);
usersRouter.post('/users/login', loginUser);
usersRouter.get('/users/:id', auth, getUserById);
usersRouter.put('/users/:id', auth,  updateUser);
usersRouter.delete('/users/:id', auth, deleteUser);
usersRouter.get('/users', auth, getAllUsers);

module.exports = usersRouter;