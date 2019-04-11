import React from 'react';
import localStorage from 'local-storage';
import { history } from '../App';

const logout = () => {
  localStorage.clear();
  history.push('/');
};
const MenuOptions = ({ status }) => (
  <div className={`menu-options ${status}`}>
    <div className="options">
      <button type="button">Profile</button>
      <br />
      <button type="button" onClick={logout}>Logout</button>
    </div>
  </div>
);


export default MenuOptions;
