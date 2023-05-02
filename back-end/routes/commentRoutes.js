const commentRouter = require('express').Router();
const { createNewComment, retrieveComment, updateComment, deleteComment, listAllComments, listAllCommentsForPost, listAllCommentsByUser } = require('../controllers/commentControllers');

commentRouter.post('/comments', createNewComment);
commentRouter.get('/comments/:id', retrieveComment);
commentRouter.put('/comments/:id', updateComment);
commentRouter.delete('/comments/:id', deleteComment);
commentRouter.get('/comments', listAllComments);
commentRouter.get('/posts/:post_id/comments', listAllCommentsForPost);
commentRouter.get('/users/:user_id/comments', listAllCommentsByUser);

module.exports = commentRouter;