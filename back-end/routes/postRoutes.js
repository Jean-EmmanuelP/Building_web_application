/* 
Table: Post

Create a new post: POST /posts
Retrieve a post by id: GET /posts/:id
Update a post: PUT /posts/:id
Delete a post: DELETE /posts/:id
List all posts: GET /posts
List all posts by a specific user: GET /users/:user_id/posts

*/
const postRouter = require('express').routes();
const { createNewPost, retrievePost, updatePost, deletePost, listAllPosts, listAllPostsFromUser } = require('../controllers/postControllers');

postRouter.post('/posts', createNewPost);
postRouter.get('/posts/:id', retrievePost);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);
postRouter.get('/posts', listAllPosts);
postRouter.get('/posts', listAllPostsFromUser);

module.exports = postRouter;