const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const { createPost, getAllPosts, getPostByUserId, likePost, sharePost, addCommentToPost, createStory, getAllStory } = require('../controllers/postController');
const router=express.Router();

//create post
router.post('/posts',authMiddleware,multerMiddleware.single('media'),createPost)

//get all posts
router.get('/posts',authMiddleware,getAllPosts)

//get post by userid
router.get('/posts/user/:userId',authMiddleware,getPostByUserId);

//get user like post route
router.post('/posts/likes/:postId',authMiddleware,likePost);

//get user share post route
router.post('/posts/share/:postId',authMiddleware,sharePost);

//get user comment post route
router.post('/posts/comments/:postId',authMiddleware,addCommentToPost);

//create story
router.post('/story',authMiddleware,multerMiddleware.single('media'),createStory)

//get all story
router.get('/story',authMiddleware,getAllStory)

module.exports=router;


