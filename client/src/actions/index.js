import {
  FETCH_CURRENT_USER,
  FETCH_USER,
  FETCH_USERS,
  EDIT_PROFILE,
  SUBMIT_NEW_POST,
  FETCH_USER_POSTS
} from "./types";
import { toast } from "react-toastify";

import axios from "axios";

import { tostOptions, errorTostStyle } from "../styles/toastifyStyles";

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

export const fetchUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  // console.log(res);
  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const editProfile = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`/api/user-profile/${id}/edit`, values);
    dispatch({ type: EDIT_PROFILE, payload: res.data });
    toast("You have successfully edited your profile!", tostOptions);
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to edit profile!", errorTostStyle);
  }
};

export const submitNewPost = values => async dispatch => {
  try {
    const res = await axios.post("/api/posts/new", values);

    dispatch({ type: SUBMIT_NEW_POST, payload: res.data });

    // console.log(res.data)
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to add new post!", errorTostStyle);
  }
};

export const fetchUserPosts = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}/posts`);
    // console.log(res);
    dispatch({ type: FETCH_USER_POSTS, payload: res.data });
  } catch (err) {
    console.error(err);
    toast("Server error. Failed to fetch posts!", errorTostStyle);
    history.goBack();
  }
};
