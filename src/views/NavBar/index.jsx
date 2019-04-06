import React, { Component } from 'react';
import { history} from '../../App';

class NavBar extends Component {

  onChange = (e) => {
    const { location: {pathname }, children} = this.props;
    history.push(`${pathname}?search=${e.target.value}`);
    return (
      <children key={children} />
    );
  };
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="nav-bar">
          <span className="search">
            <input type="text" placeholder="Search staff or Id" onChange={this.onChange} />
          </span>
          <span className="nav-icons">
            <i className="material-icons">
          notifications_none
            </i>
            <span className="avatar">
              <img alt="logo" src="https://lh6.googleusercontent.com/-gqegbA4lDbw/AAAAAAAAAAI/AAAAAAAAAAc/_ENwek7Tv4U/s50/photo.jpg" />
            </span>
            <button type="button" className="drop-down">
              <i className="material-icons">
            arrow_drop_down
              </i>
            </button>
          </span>
        </div>
        {children}
      </div>
    );
  }
}

export default NavBar;
