const postRouter = require('express').Router();
const { createNewPost, retrievePost, updatePost, deletePost, listAllPosts, listAllPostsFromUser } = require('../controllers/postControllers');

postRouter.post('/posts', createNewPost);
postRouter.get('/posts/:id', retrievePost);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);
postRouter.get('/posts', listAllPosts);
postRouter.get('/users/:user_id/posts', listAllPostsFromUser);

module.exports = postRouter;
