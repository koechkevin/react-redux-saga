import { all } from 'redux-saga/effects';
import {watchLogin} from './loginSaga';
import {watchCreateSaga, watchFetchRoles, watchFetchStaff, watchShuffle, watchUpdateStaffSaga} from './staffSaga';

export const baseUrl = 'http://localhost:5000/api/v1';
function* saga() {
  yield all([
    watchLogin(),
    watchFetchStaff(),
    watchShuffle(),
    watchCreateSaga(),
    watchUpdateStaffSaga(),
    watchFetchRoles()
  ]);
}

export default saga;
