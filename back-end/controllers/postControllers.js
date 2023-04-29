const { sequelize } = require('../config/database');
const createPostModel = require('../models/postModel');
const Post = createPostModel(sequelize);
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');


/*
  todo : 

  - createNewPost -> the title should be the description,
  the content should be the description.
  - retrievePost -> working well as expected
  - updatePost -> NTR
  - deletePost -> NTR
  - listAllPosts -> NTR
  - listAllPostsFromUser -> NTR
*/

const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};


const createNewPost = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }
    try {
      const { title, userId } = req.body;
      const imageUrl = await uploadImageToCloudinary(req.file);
      const newPost = new Post({ title, content: imageUrl, user_id: parseInt(userId) });
      await newPost.save();
      return res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  });
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
  const { content } = req.body;
  console.log(req.params.id);
  const [updateCount, updatedPosts] = await Post.update({ content }, {
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
