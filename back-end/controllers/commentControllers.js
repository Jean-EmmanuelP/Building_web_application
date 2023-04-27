const { User, Comment } = require('../config/database');


// same problem the comment is working now it is the a problem of index
exports.createNewComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.retrieveComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, { include: { model: User, as: 'author' } });
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
    const [updatedRowsCount, updatedRows] = await Comment.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!updatedRowsCount) {
      throw new Error('Comment not found');
    }
    res.json({ comment: updatedRows[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedRowsCount = await Comment.destroy({ where: { id: req.params.id } });
    if (!deletedRowsCount) {
      throw new Error('Comment not found');
    }
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.listAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: { model: User, as: 'author' } });
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listAllCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { post_id: req.params.post_id }, include: { model: User, as: 'author' } });
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listAllCommentsByUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    if (!user) {
      throw new Error('User not found');
    }
    const comments = await Comment.findAll({ where: { user_id: req.params.user_id }, include: { model: User, as: 'author' } });
    res.json({ comments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
