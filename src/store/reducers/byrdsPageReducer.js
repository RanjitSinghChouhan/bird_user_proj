import { ALL_POSTS, AREA } from "../types/types";

const initialState = {
  allPosts: [],
  totalUsedArea: 0
};

const byrdsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POSTS: return {
      ...state,
      allPosts: action.payload
    }
    case AREA:
      return {
        ...state,
        totalUsedArea: action.payload,
      };
    default:
      return state;
  }
};
export default byrdsPageReducer;