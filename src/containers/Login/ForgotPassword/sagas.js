import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { toastr } from 'lib/react-redux-toastr';
import { postData } from 'utils/request';

import {
  FORGOT_PASSWORD,
} from './constants';

import {
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';

export function* forgotPasswordWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(postData, '/user_api/password_reset', { payload }, false);
    const { data } = response;
    if (data.status === 'success') {
      toastr.success('Success', 'Please check your email inbox for instructions on how to reset your password.');
      yield put(forgotPasswordSuccess(data.payload.token));
    }
  } catch (error) {
    toastr.error('We do not have a user account associated with the email you provided.');
    yield put(forgotPasswordError(error));
  }
}

export function* forgotPasswordSaga() {
  const watcherA = yield takeLatest(FORGOT_PASSWORD, forgotPasswordWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

export default [
  forgotPasswordSaga,
];
