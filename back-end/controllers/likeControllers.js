const createLikeModel = require('../models/likeModel');
const { sequelize } = require('../config/database');
const Like = createLikeModel(sequelize);


// THE MAIN PROBLEM ARE THE CONNEXION BETWEEN THE INDEXES 
// BAD POINT : FIRST STARTING FROM 2 OR FROM 5 
// GOOD POINT : ALL IS LINKED AND FUNCTIONAL
// work but the problem is the key post_id = 1 problem with the links between the id
const createNewLike = async (req, res) => {
  try {
    const like = new Like(req.body);
    await like.save();
    return res.status(201).json(like);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

// Retrieve a like by id works but the problem is the id
const retrieveLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }
    return res.json(like);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a like but problem of id same thing
const deleteLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }
    await like.destroy();
    return res.json({ message: 'Like deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// List all likes is working
const listAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll();
    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// List all likes for a specific post
const listAllLikesForPost = async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { post_id: req.params.post_id } });
    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// List all likes by a specific user
const listAllLikesByUser = async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { user_id: req.params.user_id } });
    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewLike,
  retrieveLike,
  deleteLike,
  listAllLikes,
  listAllLikesForPost,
  listAllLikesByUser,
};
