const { uploadFileToCloudinary } = require("../config/cloudinary");
const Post = require("../model/Post");
const Story = require("../model/story");
const response = require("../utils/responceHandler");




const createPost = async(req,res) =>{
    try {
        const userId = req.user.userId;

        const {content} = req.body;
        const file= req.file;
        let mediaUrl = null;
        let mediaType = null;

        if(file) {
          const uploadResult = await uploadFileToCloudinary(file)
          mediaUrl= uploadResult?.secure_url;
          mediaType= file.mimetype.startsWith('video') ? 'video' : 'image';
        }
       
       // Create and save the post
    const newPost = await new Post({
      user: userId,
      content,
      mediaUrl,
      mediaType,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    });

        await newPost.save();

           // ✅ Populate the user field after saving
    const populatedPost = await Post.findById(newPost._id)
      .populate('user', '_id username email profilePicture');

        return response(res,201,'Post created successfully', populatedPost)

    } catch (error) {
         console.log('error creating post',error)
         return response(res,500, 'Internal server error',error.message)
    }
}

//create story 


const createStory = async(req,res) =>{
    try {
        const userId = req.user.userId;
        const file= req.file;
        
        if(!file){
            return response(res,400,'File is required to create a story')
        }
        let mediaUrl = null;
        let mediaType = null;

        if(file) {
          const uploadResult = await uploadFileToCloudinary(file)
          mediaUrl= uploadResult?.secure_url;
          mediaType= file.mimetype.startsWith('video') ? 'video' : 'image';
        }
       
       // Create and save the newStory
    const newStory = await new Story({
      user: userId,
      mediaUrl,
      mediaType
    });

        await newStory.save();
        return response(res,201,'Story created successfully', newStory)

    } catch (error) {
         console.log('error creating post',error)
         return response(res,500, 'Internal server error',error.message)
    }
}

//get all story

const getAllStory=async(req,res) =>{
    try{
        const story=await Story.find()
        .sort({createdAt : -1})
        .populate('user','_id username profilePicture email')
        
        return response(res,201,'Get all story succesfully',story)
    } catch(error){
         console.log('Error getting story',error)
         return response(res,500,'Internal server error',error.message)
    }
}

//get all posts
const getAllPosts=async(req,res) =>{
    try{
        const posts=await Post.find()
        .sort({createdAt : -1})
        .populate('user','_id username profilePicture email')
        .populate({
            path:'comments.user',
            select:'username , profilePicture'
        })
        return response(res,201,'Get all posts succesfully',posts)
    } catch(error){
         console.log('Error getting posts',error)
         return response(res,500,'Internal server error',error.message)
    }
}

//get post by userId
const getPostByUserId=async(req,res) =>{
    const {userId} = req.params;

    try{
        if(!userId){
            return response(res,400,'UserId is required to get user post')
        }

          const posts=await Post.find({user:userId})
        .sort({createdAt : -1})
        .populate('user','_id username profilePicture email')
        .populate({
            path:'comments.user',
            select:'username , profilePicture'
        })
     return response(res,201,'Get user post succesfully',posts)

    }catch(error){
         console.log('Error getting posts',error)
         return response(res,500,'Internal server error',error.message)
    }
}

//like post api
const likePost = async(req,res) => {
    const {postId} = req.params;
    const userId=req.user.userId;
    try{
         const post=await Post.findById(postId)
         if(!post){
           return response(res,404,'Post not found')
         }
         const hasLiked = post.likes.includes(userId)
         if(hasLiked){
            post.likes = post.likes.filter(id => id.toString() !== userId.toString())
            post.likeCount=Math.max(0, post.likeCount-1); //ensure likecount does not go negetive
         }else{
            post.likes.push(userId)
            post.likeCount += 1
         }

         //save the like in updated post
         const updatedpost = await post.save();
         return response(res,201, hasLiked ? 'Post unlike successfully' : 'Post liked successfully',updatedpost)
    }catch(error){
           console.log(error)
         return response(res,500,'Internal server error',error.message)
    }
}

//post comments by user
const addCommentToPost = async(req,res) => {
    const {postId} = req.params;
    const userId=req.user.userId;
    const {text} = req.body;
    try{
         const post=await Post.findById(postId)
         if(!post){
           return response(res,404,'Post not found')
         }
      
        post.comments.push({user:userId,text})
        post.commentCount += 1;

         //save the post  with new commnet
         await post.save();
         return response(res,201,'comments added successfully' ,post)
    }catch(error){
           console.log(error)
         return response(res,500,'Internal server error',error.message)
    }
}

//Share on post by user
const sharePost = async(req,res) => {
    const {postId} = req.params;
    const userId=req.user.userId;
    try{
         const post=await Post.findById(postId)
         if(!post){
           return response(res,404,'Post not found')
         }
         const hasUserShared= post.share.includes(userId)
         if(!hasUserShared){
            post.share.push(userId);
         }

         post.shareCount +=1 ;

         //save the share in updated post
        await post.save();
         return response(res,201,'Post shared successfully' ,post)
    }catch(error){
           console.log(error)
         return response(res,500,'Internal server error',error.message)
    }
}


module.exports={
    createPost,
    getAllPosts,
    getPostByUserId,
    likePost,
    addCommentToPost ,
    sharePost,
    createStory ,
    getAllStory
}