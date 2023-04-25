/*

Table: Like

Create a new like: POST /likes
Retrieve a like by id: GET /likes/:id
Delete a like: DELETE /likes/:id
List all likes: GET /likes
List all likes for a specific post: GET /posts/:post_id/likes
List all likes by a specific user: GET /users/:user_id/likes

*/
const likeRouter = require('express').Router();
const { createNewLike, retrieveLike, deleteLike, listAllLikes, listAllLikesForPost, listAllLikesByUser } = require('../controllers/likeControllers');

likeRouter.post('/likes', createNewLike);
likeRouter.get('/likes/:id', retrieveLike);
likeRouter.delete('/likes/:id', deleteLike);
likeRouter.get('/likes', listAllLikes);
likeRouter.get('/posts/:post_id/likes', listAllLikesForPost);
likeRouter.get('/users/:user_id/likes', listAllLikesByUser);

module.exports = likeRouter;
