import { SUBMIT_NEW_COMMENT, FETCH_COMMENTS } from "../actions/types";

const defaultCommentReducer = {
  comment: null,
  comments: []
};

export default  (state = defaultCommentReducer, action) => {
  switch (action.type) {
    case SUBMIT_NEW_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
      case FETCH_COMMENTS:
          return {
              ...state,
              comments: action.payload
          }
    default:
      return state;
  }
};
