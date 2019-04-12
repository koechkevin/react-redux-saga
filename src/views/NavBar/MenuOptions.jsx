import React, { Component } from 'react';

class MenuOptions extends Component {
  render(){
    const { status, logout } = this.props;
    return (
      <div className={`menu-options ${status}`}>
        <div className="options">
          <button type="button">Profile</button>
          <br />
          <button type="button" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}


export default MenuOptions;
