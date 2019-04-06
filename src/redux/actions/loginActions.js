export const login = (data) => ({
  type: 'LOGIN',
  data
});

export const loginSuccess = ({roles}) => ({
  type: 'LOGIN_SUCCESSFUL',
  roles
});

export const loginFailure = (errors) => ({
  type: 'LOGIN_FAILURE',
  errors
});

export const authenticationFailed = () => ({
  type: 'authentication_failed'
});
