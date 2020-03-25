import { reset } from "redux-form";

import {
  FETCH_CURRENT_USER,
  FETCH_USER,
  FETCH_USERS,
  EDIT_PROFILE,
  SUBMIT_NEW_POST,
  FETCH_USER_POSTS,
  FETCH_POST,
  FETCH_POSTS,
  DELETE_POST,
  SUBMIT_NEW_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "./types";
import { toast } from "react-toastify";

import axios from "axios";

import { toastOptions, errorToastStyle } from "../styles/toastifyStyles";

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // console.log(res);
  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/api/user-profile/${id}`);
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// TODO change to fetch posts with particular userId
export const fetchUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  // console.log(res);
  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const editProfile = (id, values, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/user-profile/${id}/edit`, values);
    dispatch({ type: EDIT_PROFILE, payload: res.data });
    toast("You have successfully edited your profile!", toastOptions);
    history.push(`/user-profile/${id}`);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to edit profile!", errorToastStyle);
  }
};

export const submitNewPost = values => async dispatch => {
  try {
    const res = await axios.post("/api/posts/new", values);

    dispatch({ type: SUBMIT_NEW_POST, payload: res.data });

    // console.log(res.data)
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to add new post!", errorToastStyle);
  }
};

export const editPost = (values, id, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/posts/edit/${id}`, values);

    await dispatch({ type: FETCH_POST, payload: res.data });
    toast("Post edited successfully!", toastOptions);
    history.push(`/posts/show/${id}`); // console.log(res.data)
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to edit post!", errorToastStyle);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/delete/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
    toast("Your post has been removed!", toastOptions);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to delete post!", errorToastStyle);
  }
};

export const fetchUserPosts = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}/posts`);
    // console.log(res);
    dispatch({ type: FETCH_USER_POSTS, payload: res.data });
    // history(`/user/${id}/posts`);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to fetch posts!", errorToastStyle);
    history.goBack();
  }
};

export const fetchPosts = () => async dispatch => {
  try {
    const res = await axios.get(`/api//posts`);
    // console.log(res);
    dispatch({ type: FETCH_POSTS, payload: res.data });
    // history(`/user/${id}/posts`);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to fetch posts!", errorToastStyle);
    // history.goBack();
  }
};

export const fetchPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/show/${id}`);
    console.log(res.data);
    dispatch({ type: FETCH_POST, payload: res.data });
    // history(`/user/${id}/posts`);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to fetch the post!", errorToastStyle);
  }
};

export const submitNewComment = (values, postId) => async dispatch => {
  try {
    // console.log(values);
    const res = await axios.post(
      `/api/posts/show/${postId}/comments/new`,
      values
    );

    dispatch({ type: SUBMIT_NEW_COMMENT, payload: res.data });
    dispatch(reset("newComment"));
    // console.log(res.data)
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to add new comment!", errorToastStyle);
  }
};

export const fetchComments = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/show/${postId}/comments`);
    // console.log(res);
    dispatch({ type: FETCH_COMMENTS, payload: res.data });
    // history(`/user/${id}/posts`);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to fetch posts!", errorToastStyle);
    // history.goBack();
  }
};

export const deleteComment = (id, postId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/show/${postId}/comments/${id}`);

    dispatch({ type: DELETE_COMMENT, payload: id });
    toast("Your comment has been removed!", toastOptions);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to delete comment!", errorToastStyle);
  }
};


export const editComment = (values, commentId, postId) => async dispatch => {
  try {
    const res = await axios.patch(`/api/posts/show/${postId}/comments/edit/${commentId}`, values);
console.log(res.data)
    await dispatch({ type: EDIT_COMMENT, payload: res.data });
    // toast("Post edited successfully!", toastOptions);
    // history.push(`/posts/show/${id}`); // console.log(res.data)
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to edit comment!", errorToastStyle);
  }
};