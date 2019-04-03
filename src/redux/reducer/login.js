import localStorage from 'local-storage';

const initialState = {
  isLoggedIn: !!localStorage.get('jwt_token'),
  errors: [],
  roles: localStorage.get('roles')
};

export default (state=initialState, action) => {
  switch(action.type){
  case 'LOGIN':
    return state;
  case 'LOGIN_SUCCESSFUL':
    return {
      ...state, isLoggedIn: true, roles: action.roles
    };
  case 'LOGIN_FAILURE':
    return {
      ...state, isLoggedIn: false, errors: action.errors, roles: []
    };
  default:
    return state;
  }
};

