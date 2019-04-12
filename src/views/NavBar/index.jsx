import React, { Component } from 'react';
import {connect} from 'react-redux';
import { history} from '../App';
import MenuOptions from './MenuOptions';
import {logout} from '../../redux/actions/loginActions';

class NavBar extends Component {
  state = {
    status: 'close'
  };
  static propTypes = () => {};
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside);
  }

  setRef = (node) => this.wrapperRef = node;

  clickOutside = (e) => {
    if (!this.wrapperRef.contains(e.target)) {
      this.setState({
        status: 'close'
      });
    }
  };
  onChange = (e) => {
    const { location: {pathname }} = this.props;
    history.push(`${pathname}?search=${e.target.value}`);
  };
  render() {
    const { children, logout } = this.props;
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
              onClick={() => this.setState({
                status: status === 'close'?'':'close'
              })}
              type="button"
              className="drop-down">
              <i className="material-icons">
            arrow_drop_down
              </i>
            </button>
          </span>
        </div>
        <span ref={this.setRef}>
          <MenuOptions logout={logout} status={status} />
        </span>
        {children}
      </div>
    );
  }
}


export default connect(null, { logout })(NavBar);
