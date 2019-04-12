import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../main.scss';
import localStorage from 'local-storage';
import {login} from '../../redux/actions/loginActions';

export const Login = ({errors, onSubmit, onChange}) => {
  let error = [];
  let errorMessage = {
    idNumber: '',
    password: ''
  };
  errors.forEach((element) => {
    error[error.length] = element.name;
    errorMessage[element.name] = element.message;
  });
  return(
    <div className="login">
      <div className="login-card">
        <form onSubmit={onSubmit}>
          <input
            className={error.includes('idNumber')?'error':''}
            type="text" placeholder="Id number" name="idNumber" onChange={onChange} />
          <div className={error.includes('idNumber')?'error-message':'not-visible'}>
            {errorMessage.idNumber}
          </div>
          <input
            className={error.includes('password')?'error':''}
            type="password" placeholder="Password" name="password" onChange={onChange} />
          <div className={error.includes('password')?'error-message':'not-visible'}>
            {errorMessage.password}
          </div>
          <input type="submit" value="Login" className="l-button" />
        </form>
      </div>
    </div>
  );
};

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  onChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = (e) => {
    const { action } = this.props;
    e.preventDefault();
    action(this.state);
  };
  home = () => (
    <div>
      This is a home page
    </div>
  );
  render() {
    const { login: { errors, isLoggedIn: logged } } = this.props;
    const isLoggedIn = logged || (!!localStorage.get('jwt_token') && !!localStorage.get('roles'));
    return(
      <div>
        {
          isLoggedIn? this.home(): Login({errors, onSubmit: this.onSubmit, onChange: this.onChange})
        }
      </div>
    );
  }
}
const mapStateToProps = ({ login }) => ({
  login
});
Home.propTypes = {
  login: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired
};
export default connect(mapStateToProps, { action: login })(Home);
