export default (error) => {
  let errorMessage;
  let errors = [];
  switch(error.response.status) {
  case 400:
    errorMessage = error.response.data.message;
    break;
  case 401:
    errorMessage = 'invalid credentials';
    errors = [
      {
        name: 'idNumber',
        message: 'invalid credentials'
      }, {
        name: 'password',
        message: 'id and password do not match'
      }
    ];
    break;
  case 422:
    errorMessage = error.response.data.message||'An error occurred';
    errors = error.response.data.errors;
    break;
  case 409:
    errorMessage = error.response.data.message||'An error occurred';
    errors = error.response.data.errors;
    break;
  case 404:
    errorMessage = error.response.data.message||'An error occurred';
    errors = error.response.data.errors;
    break;
  case 500:
    errorMessage = 'Server error, try again';
    break;
  default:
    errorMessage = 'Possible network error, try again';
  }
  return {
    errorMessage, errors, status: error.response.status
  };
};
