import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../views/Home';

const HigherOrderComponent = ({Container, allowedRoles }) => {
  class higherComponent extends Component {
    static propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
      roles: PropTypes.array,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired
    };
    static defaultProps = {
      roles: []
    };
    render(){
      const { isLoggedIn, roles, location, match } = this.props;
      return(
        <div>
          {isLoggedIn && roles.some(e => e.includes(allowedRoles)) ? (
            <Container
              location={location} match={match} />
          ): <Home />}
        </div>
      );
    }
  }
  const mapStateToProps = ({ login: {isLoggedIn, roles } }) => ({
    isLoggedIn, roles
  });
  return connect(mapStateToProps, {})(higherComponent);
};

export default HigherOrderComponent;
