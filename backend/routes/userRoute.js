const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { followUser, unfollowUser, deleteUserFromRequest, getAllFriendsRequest, getAllUserForRequest, getAllMutualFriends, getAllUsers, getUserProfile, checkUserAuth } = require('../controllers/userController');
const { createOrUpdateUserBio, updateUserProfile, updateCoverPhoto } = require('../controllers/createOrUpdateController');
const { multerMiddleware } = require('../config/cloudinary');
const router=express.Router();

//user follow
router.post('/follow',authMiddleware,followUser);

//user unfollow
router.post('/unfollow',authMiddleware,unfollowUser);

//remove user from req
router.post('/friend-request/remove',authMiddleware,deleteUserFromRequest);

//get all friends request
router.get('/friend-request',authMiddleware,getAllFriendsRequest )


//get all friends for request
router.get('/user-to-request',authMiddleware,getAllUserForRequest)


//get all mutual friends 
router.get('/mutual-friends/:userId',authMiddleware,getAllMutualFriends)

//get all users from search
router.get('/profile/:userId',authMiddleware,getUserProfile)

//get all users from search
router.get('/check-auth',authMiddleware,checkUserAuth)

//create or update user bio
router.put('/bio/:userId',authMiddleware,createOrUpdateUserBio)

// update user profile
router.put('/profile/:userId',authMiddleware, multerMiddleware.single('profilePicture'),updateUserProfile)


// update user cover
router.put('/profile/cover-photo/:userId',authMiddleware,multerMiddleware.single('coverPhoto') ,updateCoverPhoto)

module.exports=router;


