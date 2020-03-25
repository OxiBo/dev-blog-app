import {
  SUBMIT_NEW_COMMENT,
  FETCH_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RENDER_EDIT_COMMENT
} from "../actions/types";

const defaultCommentReducer = {
  comment: null,
  comments: [],
  renderEditForm: ""
};

export default (state = defaultCommentReducer, action) => {
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
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => {
          return comment._id !== action.payload;
        })
      };
    case EDIT_COMMENT: // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
      return {
        ...state, // Object.assign(items[items.findIndex(el => el.id === item.id)], item)
        // comments: state.comments.filter(comment => comment._id !== action.payload._id).concat(action.payload)
        comments: state.comments.map(comment => {
          if (comment._id === action.payload._id) return action.payload;
          return comment;
        })
      };
    case RENDER_EDIT_COMMENT:
      return {
        ...state,
        renderEditForm: action.payload
      };

    default:
      return state;
  }
};
