import axiosInstance from "./url.service"


//crate method for Post api
export const createPost = async(postData) =>{
    try {
        const result=await axiosInstance.post('/users/posts',postData)
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//crate method for story api
export const createStory = async(postData) =>{
    try {
        const result=await axiosInstance.post('/users/story',postData)
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//get all post method
export const getAllPosts = async() =>{
    try {
        const result=await axiosInstance.get('/users/posts')
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//get all story method
export const getAllStory = async() =>{
    try {
        const result=await axiosInstance.get('/users/story')
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//method for like  POST
export const likePost = async(postId) =>{
    try {
        const result=await axiosInstance.post(`/users/posts/likes/${postId}`)
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//method for comment  POST
export const commentsPost = async(postId,comment) =>{
    try {
        const result=await axiosInstance.post(`/users/posts/comments/${postId}`,comment)
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//method for share  POST
export const sharePost = async(postId) =>{
    try {
        const result=await axiosInstance.post(`/users/posts/share/${postId}`)
        return result?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//get all users posts

export const getAllUserPosts = async(userId) =>{
    try {
        const result=await axiosInstance.get(`/users/posts/user/${userId}`);
         return result?.data?.data;
    } catch (error) {
          console.log(error);
        throw error;
    }
}