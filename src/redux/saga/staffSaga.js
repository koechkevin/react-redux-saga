import axios from 'axios';
import localStorage from 'local-storage';
import swal from 'sweetalert';
import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import {baseUrl} from './index';
import errorHandler from '../../helpers/errorHandler';
import {
  createStaffFailure,
  deleteStaffSuccess, fetchAllStaff,
  fetchAllStaffSuccess,
  getRolesSuccess,
  shuffleSuccess
} from '../actions/staffActions';
import { history} from '../../App';

const config = {
  headers: {
    Authorization: localStorage.get('jwt_token'),
    'Content-Type': 'application/json'
  }};
const api = (url) => axios.get(`${baseUrl}/users/staff${url}`, config);
const createAPI = (data) => axios.post(`${baseUrl}/users/staff/create`, data, config);
const updateAPI = (id, data) => axios.put(`${baseUrl}/users/staff/${id}/update`, data, config);
const rolesAPI = () => axios.get(`${baseUrl}/users/roles`, config);
const deleteStaffAPI = (id) => axios.delete(`${baseUrl}/users/staff/${id}/delete`, config);

export function* watchFetchStaff() {
  yield takeLatest('FETCH_ALL_STAFF', fetchAllStaffSaga);
}
export function* fetchAllStaffSaga(action) {
  try {
    const response = yield call(api, action.url);
    yield put(fetchAllStaffSuccess(response.data));
  } catch(error) {
    const {errors, errorMessage, status} = errorHandler(error);
    if (status === 401) {
      localStorage.clear();
      setTimeout(history.push('/'), 5000);
    }
    console.log(errors, errorMessage);
  }
}
export function* watchShuffle() {
  yield takeLatest('SHUFFLE', shuffle);
}

export function* shuffle(action){
  yield put(shuffleSuccess({
    currentPosition: action.currentPosition, newPosition: action.newPosition
  }));
}

export function* watchCreateSaga(){
  yield takeLatest('CREATE_STAFF', createSaga);
}

export function* createSaga(action) {
  try {
    yield call(createAPI, action.data);
    action.success();
  } catch (error) {
    const {errors, status} = errorHandler(error);
    yield put(createStaffFailure(errors));
    if (status === 401) {
      localStorage.clear();
      setTimeout(history.push('/'), 5000);
    }
  }
}

export function* watchUpdateStaffSaga(){
  yield takeLatest('UPDATE_STAFF', updateSaga);
}

export function* updateSaga(action) {
  try {
    const response = yield call(updateAPI, action.id, action.data);
    swal('Success', 'Edit Successful', 'success')
      .then(() => {
        history.push(`/staff/${response.data.updated.idNumber}`);
      });
  } catch(error) {
    const {errors, status} = errorHandler(error);
    yield put(createStaffFailure(errors));
    if (status === 401) {
      localStorage.clear();
      setTimeout(history.push('/'), 5000);
    }
  }
}
export function* fetchRoles() {
  try {
    const response = yield call(rolesAPI);
    yield put(getRolesSuccess(response.data));
  } catch(error) {
    console.log(error);
  }
}

export function* watchFetchRoles() {
  yield takeEvery('GET_ROLES', fetchRoles);
}

export function* watchDeleteStaff() {
  yield takeLatest('DELETE_STAFF', deleteStaff);
}

export function* deleteStaff(action) {
  try {
    yield call(deleteStaffAPI, action.id);
    // yield put(deleteStaffSuccess(action.id));
    yield put(fetchAllStaff(action.url,()=>null));
  } catch (error) {
    console.log(error);
  }
}
