const { sequelize } = require('../config/database');
const createPostModel = require('../models/postModel');
const Post = createPostModel(sequelize);

/*
  todo : 

  - createNewPost -> the title should be the description,
  the content should be the description.
  - retrievePost -> working well as expected
  - updatePost -> problem with title, there is no need for the 
                  title to be here in the body
  - deletePost -> NTR
  - listAllPosts -> NTR
  - listAllPostsFromUser -> NTR
*/

const createNewPost = async (req, res) => {
  const { title, content, userId } = req.body;
  const newPost = new Post({ title, content, user_id: parseInt(userId) });
  await newPost.save();
  return res.status(201).json(newPost);
};

const retrievePost = async (req, res) => {
  console.log(req.params.id);
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.params.id);
  const [updateCount, updatedPosts] = await Post.update({ title, content }, {
    where: { id: req.params.id },
    returning: true,
  });

  if (updateCount === 0) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = updatedPosts[0];
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const post = await Post.destroy({ where: { id: req.params.id }});
  if (post === 0) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(200).json({ message: 'Post deleted successfully' });
};

const listAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  return res.status(200).json(posts);
};

const listAllPostsFromUser = async (req, res) => {
  const posts = await Post.findAll({ where: { user_id: req.params.user_id } });
  return res.status(200).json(posts);
};

module.exports = {
  createNewPost,
  retrievePost,
  updatePost,
  deletePost,
  listAllPosts,
  listAllPostsFromUser
};
