import { SET_SPINNER } from "../actions/types";

const defaultFiltersReducer = {
  isLoading: true,
};

export default (state = defaultFiltersReducer, action) => {
  switch (action.type) {
    case SET_SPINNER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
