const createLikeModel = require('../models/likeModel');
const { sequelize } = require('../config/database');
const Like = createLikeModel(sequelize);

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

const listAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll();
    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const listAllLikesForPost = async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { post_id: req.params.post_id } });
    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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