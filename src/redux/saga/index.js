import { all } from 'redux-saga/effects';
import {watchLogin} from './loginSaga';
import {watchFetchStaff, watchShuffle} from './staffSaga';

export const baseUrl = 'http://localhost:5000/api/v1';
function* saga() {
  yield all([
    watchLogin(),
    watchFetchStaff(),
    watchShuffle()
  ]);
}

export default saga;
