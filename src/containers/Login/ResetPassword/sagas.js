import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { toastr } from 'lib/react-redux-toastr';
import { putData } from 'utils/request';

import {
  RESET_PASSWORD,
} from './constants';

import {
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

export function* resetPasswordWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(putData, '/user_api/user', { payload });
    const { data } = response;
    if (data.status === 'success') {
      toastr.success('Success', 'Password has been reset successfully.');
      cookie.remove('token', { path: '/' });
      yield put(resetPasswordSuccess(data.payload.token));
      browserHistory.push('/login');
    }
  } catch (error) {
    toastr.error('Password reset failure');
    yield put(resetPasswordError(error));
  }
}

export function* resetPasswordSaga() {
  const watcherA = yield takeLatest(RESET_PASSWORD, resetPasswordWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

export default [
  resetPasswordSaga,
];
