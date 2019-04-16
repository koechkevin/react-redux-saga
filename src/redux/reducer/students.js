const initialState = {
  data: {
    students: [],
    pagination: {
      count: 13,
      pageCount: 2,
      currentPage: 1
    }
  },
  errors: []
};

export default (state=initialState, action) => {
  switch(action.type) {
  case 'FETCH_ALL_STUDENTS':
    return state;
  case 'FETCH_ALL_STUDENTS_SUCCESS':
    return {
      ...state, data: action.data
    };
  case 'CREATE_STUDENT_FAIL':
    return {
      ...state, errors: action.errors
    };
  default:
    return state;
  }
};
