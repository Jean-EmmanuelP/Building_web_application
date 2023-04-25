// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Create a new user: POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, username } = req.body;
    
    // Validate the input data
    if (!email || !password || !first_name || !last_name || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one letter and one number' });
    }
    
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      username
    });
    
    // Send the response
    res.status(201).json({ message: 'User created successfully', user: newUser });
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again later' });
  }
};

// Retrieve a user by id: GET /users/:id
// userController.js
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user: PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, username } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user details
    user.email = email || user.email;
    user.password = password ? await hashPassword(password) : user.password;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.username = username || user.username;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user: DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List all users: GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// done just have to check if each function response the good format
// and if its okay for my frond end teammate