import {
  SUBMIT_NEW_POST,
  FETCH_USER_POSTS,
  FETCH_POST,
  FETCH_POSTS,
  DELETE_POST
} from "../actions/types";

const defaultPostReducer = {
  post: null,
  posts: [],
  user_posts: [],
  isLoading: true
};

export default (state = defaultPostReducer, action) => {
  // console.log(action)
  switch (action.type) {
    case SUBMIT_NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case FETCH_USER_POSTS:
      return {
        ...state,
        user_posts: action.payload,
        isLoading: false
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [state.posts.filter(post => post._id === action.payload)],
        isLoading: false
      };
    default:
      return state;
  }
};
