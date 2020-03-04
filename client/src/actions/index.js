import { FETCH_CURRENT_USER, FETCH_USER, EDIT_PROFILE } from "./types";
import axios from "axios";

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

export const editProfile = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`/api/user-profile/${id}/edit`, values);
    dispatch({ type: EDIT_PROFILE, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
