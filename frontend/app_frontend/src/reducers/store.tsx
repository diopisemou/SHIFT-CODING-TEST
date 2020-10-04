
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';

import auth from "./authreducer";
import home from "./homereducer";
import results from "./resultreducer";
import quizzs from "./quizzreducer";
import questions from "./questionreducer";
import users from "./usersreducer";

const reducers = combineReducers({
  auth,
  home,
  results,
  quizzs,
  questions,
  users,
});

let middleware: any[] = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
