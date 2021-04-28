import Axios from "axios";
import { LIKE_POST, FETCH_POSTS, UNLIKE_POST, POST_OK } from "./types";
import jwt from "jsonwebtoken";

const API_URL="http://localhost:8080/api"

export const likePost = (postId, userId) =>async (dispatch) => {
    try {
      const likePosetRespone= await Axios.post(`${API_URL}/posts/like/${postId}`,{userId: userId})
      dispatch({ type: LIKE_POST })

      const posts = await Axios.get(`${API_URL}/posts/all`)
      dispatch({ type: FETCH_POSTS, payload: posts.data });
    } catch (error) {
      console.log(error)
    }
};

export const unlikePost = (postId, userId) =>async (dispatch) => {
   try {
      const unlikePosetRespone=await Axios.post(`${API_URL}/posts/unlike/${postId}`,{userId: userId})
      dispatch({ type: UNLIKE_POST })

      const posts = await Axios.get(`${API_URL}/posts/all`)
      dispatch({ type: FETCH_POSTS, payload: posts.data });
   } catch (error) {
     console.log(error)
   }
};

export const deletePost = (postId) => async (dispatch) => {
    try {
       const deletRes= await Axios.delete( `${API_URL}/posts/${postId}` )
       const posts = await Axios.get(`${API_URL}/posts/all`)
       dispatch({ type: FETCH_POSTS, payload: posts.data });
    } catch (error) {
       console.log(error)
    }
};

export const retweet = (postValues) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let userId = await jwt.decode(token);
      const res=await  Axios.post(`${API_URL}/posts/new/${userId._id}`,postValues)
      await dispatch({ type: POST_OK, payload: res.data });
      return "OK";
    } catch (error) {
      console.log(error)
    }
};
