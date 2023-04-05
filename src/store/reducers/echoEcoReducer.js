import { ALL_ECHO_ECOS, COUNTER_URL } from "../types/types";

const initialState = {
  allEchoEcos: [],
  counterUrl: ""
};

const echoEcoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ECHO_ECOS:
      const combinedArray = [...state?.allEchoEcos, ...action.payload].reduce((acc, obj) => {
        if (!acc[obj.id]) {
          acc[obj.id] = obj;
        }
        return acc;
      }, {});
      return {
        ...state,
        allEchoEcos: [...Object.values(combinedArray)],
      };
    case COUNTER_URL: return {
      ...state,
      counterUrl: action.payload
    };
    default:
      return state;
  }
};
export default echoEcoReducer;
