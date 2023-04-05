import { combineReducers } from "redux";
import authReducer from "./authReducer";
import byrdsPageReducer from "./byrdsPageReducer";
import echoEcoReducer from "./echoEcoReducer";
import leaderBoardReducer from "./leaderBoardReducer";
import transactionReducer from "./transactionReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  echoEco: echoEcoReducer,
  leaderBoard: leaderBoardReducer,
  byrdsPage: byrdsPageReducer,
  transaction: transactionReducer
});

export default rootReducers;
