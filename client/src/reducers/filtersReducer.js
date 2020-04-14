import { SET_SORT_BY, SET_FIND_BY_TITLE } from "../actions/types";

const defaultFiltersReducer = {
  sortBy: "newest",
  findByTitle: "",
};

export default (state = defaultFiltersReducer, action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_FIND_BY_TITLE:
      return {
        ...state,
        findByTitle: action.payload,
      };
    default:
      return state;
  }
};
