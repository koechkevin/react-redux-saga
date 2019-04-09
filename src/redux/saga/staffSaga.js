import swal from 'sweetalert';
import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import {baseUrl} from './index';
import errorHandler from '../../helpers/errorHandler';
import {
  createStaffFailure,fetchAllStaff,
  fetchAllStaffSuccess,
  getRolesSuccess,
  shuffleSuccess
} from '../actions/staffActions';
import { history} from '../../views/App';
import axios from '../../helpers/axios';
import {authenticationFailed} from '../actions/loginActions';

const api = (url) => axios.get(`${baseUrl}/users/staff${url}`);
const createAPI = (data) => axios.post(`${baseUrl}/users/staff/create`, data);
const updateAPI = (id, data) => axios.put(`${baseUrl}/users/staff/${id}/update`, data);
const rolesAPI = () => axios.get(`${baseUrl}/users/roles`);
const deleteStaffAPI = (id) => axios.delete(`${baseUrl}/users/staff/${id}/delete`);

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
      yield put(authenticationFailed());
      history.push('/');
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
      yield put(authenticationFailed());
      history.push('/');
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
      yield put(authenticationFailed());
      history.push('/');
    }
  }
}
export function* fetchRoles() {
  try {
    const response = yield call(rolesAPI);
    yield put(getRolesSuccess(response.data));
  } catch(error) {
    const {status} = errorHandler(error);
    if (status === 401) {
      yield put(authenticationFailed());
      history.push('/');
    }
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
    const {status} = errorHandler(error);
    if (status === 401) {
      yield put(authenticationFailed());
      history.push('/');
    }
  }
}
