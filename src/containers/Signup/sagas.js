import { takeLatest, call, put } from 'redux-saga/effects';

import { getData } from 'utils/request';

import {
  FETCH_PLAN,
} from './constants';

import {
  fetchPlanSuccess,
  fetchPlanError,
} from './actions';

export function* fetchPlanWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/payment_api/plan_info/${payload.planId}`);
    const { data: { plan_info } = {} } = response;
    yield put(fetchPlanSuccess(plan_info));
  } catch (error) {
    yield put(fetchPlanError(error));
  }
}

export function* signupSaga() {
  yield takeLatest(FETCH_PLAN, fetchPlanWorker);
}

export default [
  signupSaga,
];
