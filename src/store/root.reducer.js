import authReducer from "./auth/authReducer";
import drawerReducer from "./drawer/drawerReducer";
import userCheckReducer from "./usercheck/userCheckReducer";
import { combineReducers } from "redux";
import toggleReducer from "./Toggle/toggleReducer";

export default combineReducers({
  auth: authReducer,
  drawerData: drawerReducer,
  userCheckData: userCheckReducer,
  toggleReducer: toggleReducer,
});
