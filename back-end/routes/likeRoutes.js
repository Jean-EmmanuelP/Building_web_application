const likeRouter = require('express').Router();
const { createNewLike, retrieveLike, deleteLike, listAllLikes, listAllLikesForPost, listAllLikesByUser } = require('../controllers/likeControllers');

likeRouter.post('/likes', createNewLike);
likeRouter.get('/likes/:id', retrieveLike);
likeRouter.delete('/likes/:id', deleteLike);
likeRouter.get('/likes', listAllLikes);
likeRouter.get('/posts/:post_id/likes', listAllLikesForPost);
likeRouter.get('/users/:user_id/likes', listAllLikesByUser);

module.exports = likeRouter;
