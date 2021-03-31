import { combineReducers } from "redux";
import { postMessage } from "./postMessage";
import auth from "./auth";

export const reducers = combineReducers({
  postMessage,
  auth,
});
