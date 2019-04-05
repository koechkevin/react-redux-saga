import _ from '../../helpers/array';

const initialState = {
  data: {
    staff: [],
    pagination: {
      count: 13,
      pageCount: 2,
      currentPage: 1
    }
  },
  errors: [],
  roles: []
};
export default (state=initialState, action) => {
  switch (action.type) {
  case 'FETCH_ALL_STAFF':
    return {
      ...state
    };
  case 'FETCH_ALL_STAFF_SUCCESS':
    return {
      ...state, data: action.data
    };
  case 'FETCH_ALL_STAFF_FAILURE':
    return {
      ...state
    };
  case 'SHUFFLE_SUCCESS':
    return {
      ...state, data: { ...state.data, staff: _(state.data.staff, action.currentPosition, action.newPosition)}
    };
  case 'CREATE_STAFF_FAIL':
    return {
      ...state, errors: action.errors
    };
  case 'GET_ROLES_SUCCESS':
    return {
      ...state, roles: action.data.roles
    };
  case 'DELETE_STAFF_SUCCESS':
    return {
      ...state, data:
        {
          ...state.data,
          staff: state.data.staff.filter((e) => e.staff.idNumber !== action.id)
        }
    };
  default:
    return state;
  }
};
