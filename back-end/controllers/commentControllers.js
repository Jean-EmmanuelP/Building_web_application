const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/userModel');

exports.createNewComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.retrieveComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    res.json({ comment });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) {
      throw new Error('Comment not found');
    }
    res.json({ comment });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.listAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listAllCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.post_id });
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listAllCommentsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      throw new Error('User not found');
    }
    const comments = await Comment.find({ user_id: req.params.user_id });
    res.json({ comments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
