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
