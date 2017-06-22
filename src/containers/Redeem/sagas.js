import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import cookie from 'react-cookie';
import { LOCATION_CHANGE } from 'react-router-redux';

import { postData } from 'utils/request';

import {
  REDEEM_TOKEN,
} from './constants';

import {
  redeemTokenSuccess,
  redeemTokenError,
} from './actions';

export function* redeemTokenWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(postData, `/account_api/redeem_token/${payload.token}`, {}, payload.apiKeyRequired);

    yield put(redeemTokenSuccess(response.data));
  } catch (error) {
    yield put(redeemTokenError(error));
  }
}

export function* redeemSaga() {
  const watcherA = yield takeLatest(REDEEM_TOKEN, redeemTokenWorker);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

export default [
  redeemSaga,
];
