import React, { Component } from 'react';
import { history} from '../App';
import MenuOptions from './MenuOptions';

class NavBar extends Component {
  state = {
    status: 'close'
  };
  static propTypes = () => {};
  onChange = (e) => {
    const { location: {pathname }} = this.props;
    history.push(`${pathname}?search=${e.target.value}`);
  };
  render() {
    const { children } = this.props;
    const { status } = this.state;
    return (
      <div>
        <div className="nav-bar">
          <span className="search">
            <input type="text" onSubmit={() => this.forceUpdate()} placeholder="Search staff or Id" onChange={this.onChange} />
          </span>
          <span className="nav-icons">
            <i className="material-icons">
          notifications_none
            </i>
            <span className="avatar">
              <img alt="logo" src="https://lh6.googleusercontent.com/-gqegbA4lDbw/AAAAAAAAAAI/AAAAAAAAAAc/_ENwek7Tv4U/s50/photo.jpg" />
            </span>
            <button
              onClick={() => this.setState({ status: status === 'close'?'':'close'})}
              type="button"
              className="drop-down">
              <i className="material-icons">
            arrow_drop_down
              </i>
            </button>
          </span>
        </div>
        <MenuOptions status={status} />
        {children}
      </div>
    );
  }
}

export default NavBar;
