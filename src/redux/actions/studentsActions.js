export const fetchAllStudents = (url) => ({
  type: 'FETCH_ALL_STUDENTS',
  url
});
export const fetchAllStudentSuccess = (data) => ({
  type: 'FETCH_ALL_STUDENTS_SUCCESS',
  data
});
export const createStudent = (data, success) => ({
  type: 'CREATE_STUDENT',
  data, success
});
