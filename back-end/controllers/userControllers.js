// controllers/userController.js
const { sequelize } = require('../config/database');
const createUserModel = require('../models/userModel');
const User = createUserModel(sequelize);
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

exports.createUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, username } = req.body;

    if (!email || !password || !first_name || !last_name || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one letter and one number' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      username
    });

    const token = jwt.sign({user_id: newUser.id, email: newUser.email}, process.env.TOKEN_KEY);
    if (!token) {
      return res.status(400).json({error: "Error occured with token"});
    }

    const updatedUser = await User.findByPk(newUser.id);
    updatedUser.token = token || updatedUser.token;
    await updatedUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong. Please try again later' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All input are required." });
    }

    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ user_id: userData.id, email: userData.email }, process.env.TOKEN_KEY);
    if (!token) {
      return res.status(400).json({ error: "Error occurred with token" });
    }

    const updatedUser = await User.findByPk(userData.id);
    updatedUser.token = token || updatedUser.token;
    await updatedUser.save();

    return res.status(200).json({ message: "User is logged in", token, user: userData });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error occurred during user's authorization" });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
try {
const { email, password, first_name, last_name, username } = req.body;
const user = await User.findByPk(req.params.id);
if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

user.email = email || user.email;
user.password = password ? await hashPassword(password) : user.password;
user.first_name = first_name || user.first_name;
user.last_name = last_name || user.last_name;
user.username = username || user.username;

await user.save();
res.json(user);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  };
  
  exports.deleteUser = async (req, res) => {
  try {
  const user = await User.findByPk(req.params.id);
  if (!user) {
  return res.status(404).json({ error: 'User not found' });
  }
  await user.destroy();
  res.json({ message: 'User deleted successfully' });
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  };
  
  exports.getAllUsers = async (req, res) => {
  try {
  const users = await User.findAll();
  res.json(users);
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  };