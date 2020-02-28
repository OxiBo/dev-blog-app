import { FETCH_CURRENT_USER } from "../actions/types";

const defaultAuthState = {
  user: null
};

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
