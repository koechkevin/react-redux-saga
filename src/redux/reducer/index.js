import { combineReducers } from 'redux';
import login from './login';
import staff from './staff';
import students from './students';

export default combineReducers({
  login, staff, students
});
