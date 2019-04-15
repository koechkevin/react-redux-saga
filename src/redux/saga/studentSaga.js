import { takeLatest, call, put } from 'redux-saga/effects';
import {baseUrl} from './index';
import errorHandler from '../../helpers/errorHandler';
import {authenticationFailed} from '../actions/loginActions';
import {history} from '../../views/App';
import axios from '../../helpers/axios';
import {fetchAllStudents, fetchAllStudentSuccess} from '../actions/studentsActions';

export function* watchFetchStudents() {
  yield takeLatest('FETCH_ALL_STUDENTS', fetchAllStudentsSaga);
}

export function* fetchAllStudentsSaga(action) {
  try {
    const api = (url) => axios.get(`${baseUrl}/students${url}`);
    const response = yield call(api, action.url);
    yield put(fetchAllStudentSuccess(response.data));
  } catch(error) {
    const {errors, errorMessage, status} = errorHandler(error);
    if (status === 401) {
      yield put(authenticationFailed());
      history.push('/');
    }
    console.log(errors, errorMessage);
  }
}

export function* watchCreateStudent() {
  yield takeLatest('CREATE_STUDENT', createStudentSaga);
}

export function* createStudentSaga(action) {
  try {
    const createAPI = (data) => axios.post(`${baseUrl}/students/create`, data);
    yield call(createAPI, action.data);
    yield put(fetchAllStudents(''));
    action.success();
  } catch(error){
    const {errors, status} = errorHandler(error);
    if (status === 401) {
      yield put(authenticationFailed());
      history.push('/');
    }
  }
}
