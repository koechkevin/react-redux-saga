import { combineReducers } from 'redux';
import login from './login';
import staff from './staff';

export default combineReducers({
  login, staff
});
