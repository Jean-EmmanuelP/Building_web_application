const Like = require('../models/Like');
// return res
// Create a new like
exports.createNewLike = async (req, res) => {
  try {
    const like = new Like(req.body);
    await like.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a like by id
exports.retrieveLike = async (req, res) => {
  try {
    const like = await Like.findById(req.params.id);
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a like
exports.deleteLike = async (req, res) => {
  try {
    const like = await Like.findByIdAndDelete(req.params.id);
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }
    res.json({ message: 'Like deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all likes
exports.listAllLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all likes for a specific post
exports.listAllLikesForPost = async (req, res) => {
  try {
    const likes = await Like.find({ post_id: req.params.post_id });
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all likes by a specific user
exports.listAllLikesByUser = async (req, res) => {
  try {
    const likes = await Like.find({ user_id: req.params.user_id });
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
