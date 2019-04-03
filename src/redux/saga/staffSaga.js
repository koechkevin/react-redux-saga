import axios from 'axios';
import localStorage from 'local-storage';
import { takeLatest, call, put } from 'redux-saga/effects';
import {baseUrl} from './index';
import errorHandler from '../../helpers/errorHandler';
import {fetchAllStaffSuccess, shuffleSuccess} from '../actions/staffActions';
import { history} from '../../App';

const api = (url) => axios.get(`${baseUrl}/users/staff${url}`, {
  headers: {
    Authorization: localStorage.get('jwt_token'),
    'Content-Type': 'application/json'
  }
});

export function* watchFetchStaff() {
  yield takeLatest('FETCH_ALL_STAFF', fetchAllStaffSaga);
}
export function* fetchAllStaffSaga(action) {
  try {
    const response = yield call(api, action.url);
    yield put(fetchAllStaffSuccess(response.data));
  } catch(error) {
    const {errors, errorMessage, status} = errorHandler(error);
    console.log(status);
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

