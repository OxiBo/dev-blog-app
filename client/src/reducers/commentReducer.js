import { SUBMIT_NEW_COMMENT, FETCH_COMMENTS, DELETE_COMMENT } from "../actions/types";

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
          case DELETE_COMMENT: 
          return {
              ...state,
              comments: state.comments.filter(comment => {
                  return comment._id !== action.payload
              })
          }
    default:
      return state;
  }
};
