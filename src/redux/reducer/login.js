import localStorage from 'local-storage';

const initialState = {
  isLoggedIn: !!localStorage.get('jwt_token'),
  errors: [],
  roles: localStorage.get('roles')
};

export default (state=initialState, action) => {
  switch(action.type){
  case 'LOGIN':
    return {
      ...state, isLoggedIn: false, roles: []
    };
  case 'LOGIN_SUCCESSFUL':
    return {
      ...state, isLoggedIn: true, roles: action.roles
    };
  case 'LOGIN_FAILURE':
    return {
      ...state, isLoggedIn: false, errors: action.errors, roles: []
    };
  case 'authentication_failed':
    localStorage.clear();
    return {
      ...state, isLoggedIn: false
    };
  case 'LOGOUT':
    localStorage.clear();
    return  {
      isLoggedIn: false, errors: [], roles: []
    };
  default:
    return state;
  }
};

