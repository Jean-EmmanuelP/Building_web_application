const Post = require('../models/postModel');

// return for each response
// check if title is a string
// check if this is valid, content must be a image
// start with image already
// return responser
const createNewPost = async (req, res) => {
  const { title, content, userId } = req.body;
  // description, image
  const newPost = new Post({ title, content, userId });
  await newPost.save();
  res.status(201).json(newPost);
};

const retrievePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { title, body } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json({ message: 'Post deleted successfully' });
};

const listAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

const listAllPostsFromUser = async (req, res) => {
  const posts = await Post.find({ userId: req.params.user_id });
  res.status(200).json(posts);
};

module.exports = {
  createNewPost,
  retrievePost,
  updatePost,
  deletePost,
  listAllPosts,
  listAllPostsFromUser
};
