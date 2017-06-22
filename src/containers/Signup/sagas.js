import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData, postData } from 'utils/request';

import {
  FETCH_PLAN,
  RESEND_ACTIVATION_EMAIL,
} from './constants';

import {
  fetchPlanSuccess,
  fetchPlanError,
  resendActivationEmailSuccess,
} from './actions';

export function* fetchPlanWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/payment_api/plan_info/${payload.planId}`, false);
    const { data: { plan_info } = {} } = response;
    yield put(fetchPlanSuccess(plan_info));
  } catch (error) {
    yield put(fetchPlanError(error));
  }
}

export function* resendActivationEmailWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(postData, '/user_api/resend_activation_email', { payload }, false);
    const { data: { status } = {} } = response;
    yield put(resendActivationEmailSuccess(status));
  } catch (error) {
    console.log(error);
  }
}

export function* signupSaga() {
  const watcherA = yield takeLatest(FETCH_PLAN, fetchPlanWorker);
  const watcherB = yield takeLatest(RESEND_ACTIVATION_EMAIL, resendActivationEmailWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

export default [
  signupSaga,
];
