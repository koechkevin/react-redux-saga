import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import localStorage from 'local-storage';
import {baseUrl} from './index';
import {loginFailure, loginSuccess} from '../actions/loginActions';
import errorHandler from '../../helpers/errorHandler';

const api = (data) => axios.post(`${baseUrl}/login`, data);

export function* watchLogin() {
  yield takeLatest('LOGIN', loginSaga);
}

export function* loginSaga(action){
  try {
    const response = yield call(api, action.data);
    localStorage('jwt_token', response.data.jwt_token);
    yield put(loginSuccess({roles: response.data.roles}));
    localStorage('roles', response.data.roles);
  } catch (error) {
    const {errors} = errorHandler(error);
    yield put(loginFailure(errors));
  }
}
