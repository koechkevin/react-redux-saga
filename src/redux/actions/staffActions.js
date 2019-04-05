export const fetchAllStaff = (url, redirect) => ({
  type: 'FETCH_ALL_STAFF',
  url, redirect
});
export const fetchAllStaffSuccess = (data) => ({
  type: 'FETCH_ALL_STAFF_SUCCESS',
  data
});
export const fetchAllStaffFailure = () => ({
  type: 'FETCH_ALL_STAFF_FAILURE'
});

export const handleShuffle = ({ currentPosition, newPosition }) => ({
  type: 'SHUFFLE',
  currentPosition, newPosition
});

export const shuffleSuccess = ({ currentPosition, newPosition }) => ({
  type: 'SHUFFLE_SUCCESS',
  currentPosition, newPosition
});

export const createStaff = (data, success) => ({
  type: 'CREATE_STAFF',
  data, success
});

export const createStaffFailure = (errors) => ({
  type: 'CREATE_STAFF_FAIL',
  errors
});

export const updateStaff = (id, data) => ({
  type: 'UPDATE_STAFF',
  id, data
});

export const getRoles = () => ({
  type: 'GET_ROLES'
});

export const getRolesSuccess = (data) => ({
  type: 'GET_ROLES_SUCCESS',
  data
});

export const deleteStaff = (id, url) => ({
  type: 'DELETE_STAFF',
  id, url
});

// export const deleteStaffSuccess = (id) => ({
//   type: 'DELETE_STAFF_SUCCESS',
//   id
// });
