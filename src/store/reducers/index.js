import {combineReducers} from "redux";
import users from './users';
import balance from './balance';

export default combineReducers({
  users,
  balance
})
