import { takeLatest, take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData, deleteData } from 'utils/request';

import {
  FETCH_SUBSCRIPTIONS,
  CANCEL_SUBSCRIPTION,
} from './constants';

import {
  fetchSubscriptionsSuccess,
  fetchSubscriptionsError,
  cancelSubscriptionSuccess,
  cancelSubscriptionError,
} from './actions';

export function* fetchSubscriptionsWorker(action) {
  const { payload } = action;

  try {
    const { data } = yield call(getData, `/payment_api/subscriptions/${payload.accountId}`);

    if (data.status !== 'success') {
      yield put(fetchSubscriptionsError(data.message));
    } else {
      yield put(fetchSubscriptionsSuccess(data.subscriptions[0]));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* cancelSubscriptionSaga() {
  for (;;) {
    const { payload: { accountId, planId } } = yield take(CANCEL_SUBSCRIPTION);

    try {
      const { data } = yield call(deleteData, `/payment_api/subscription/${accountId}/${planId}`);

      if (data.status === 'success') {
        yield put(cancelSubscriptionSuccess(data.payload));
      } else {
        yield put(cancelSubscriptionError(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function* settingsSaga() {
  const watcherA = yield takeLatest(FETCH_SUBSCRIPTIONS, fetchSubscriptionsWorker);
  const watcherB = yield fork(cancelSubscriptionSaga);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}

export default [
  settingsSaga,
];
