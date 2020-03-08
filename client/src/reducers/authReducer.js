import { FETCH_CURRENT_USER, FETCH_USER, FETCH_USERS, EDIT_PROFILE } from "../actions/types";

const defaultAuthState = {
  current_user: null,
  user: null,
  users: []
};

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // console.log(action.payload)
      return {
        ...state,
        current_user: action.payload
      };
    case FETCH_USER:
      // console.log(action.payload)
      return {
        ...state,
        user: action.payload
      };
      case FETCH_USERS:
      // console.log(action.payload)
      return {
        ...state,
        users: action.payload
      };
    case EDIT_PROFILE:
      // console.log(action.payload)
      return {
        ...state,
        current_user: action.payload
      };
    default:
      return state;
  }
};
