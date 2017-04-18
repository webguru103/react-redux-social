import { takeLatest, call, put } from 'redux-saga/effects';

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
    const response = yield call(postData, `/account_api/redeem_token/${payload.token}`);

    yield put(redeemTokenSuccess(response));
  } catch (error) {
    yield put(redeemTokenError(error));
  }
}

export function* redeemSaga() {
  yield takeLatest(REDEEM_TOKEN, redeemTokenWorker);
}

export default [
  redeemSaga,
];
