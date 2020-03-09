import { SUBMIT_NEW_POST, FETCH_USER_POSTS } from "../actions/types";

const defaultPostReducer = {
  post: null,
  posts: [],
  user_posts: []
};

export default (state = defaultPostReducer, action) => {
  // console.log(action)
  switch (action.type) {
    case SUBMIT_NEW_POST:
      return {
        ...state,
        post: action.payload
      };
    case FETCH_USER_POSTS:
      return {
        ...state,
        user_posts: action.payload
      };
    default:
      return state;
  }
};
