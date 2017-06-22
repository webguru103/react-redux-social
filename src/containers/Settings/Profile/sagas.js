import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'lib/react-redux-toastr';

import { putData, getData } from 'utils/request';

import { GET_USER } from 'containers/App/constants';
import {
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR,
} from 'containers/Main/constants';
import {
  UPDATE_ACCOUNT_PROFILE,
  FETCH_CURRENT_ACCOUNT,
} from './constants';

export function* setAccount(updateData) { // eslint-disable-line no-unused-vars
  const { accountID, update } = updateData.data;
  const requestUrl = `/account_api/account/${accountID}`;
  const result = yield call(putData, requestUrl, update);
  if (result.data.status === 'success') {
    yield put({ type: FETCH_CURRENT_ACCOUNT, accountId: accountID });
    yield put({ type: GET_USER });
    toastr.success('Success!', 'Settings have been updated.');
  } else {
    console.log(result.data);
  }
}

export function* getAccount(updateData) { // eslint-disable-line no-unused-vars
  const accountID = updateData.accountId;
  const requestUrl = `/account_api/account/${accountID}`;
  if (accountID) {
    try {
      const account = yield call(getData, requestUrl);
      console.log(account);
      if (account.data.error) {
        yield put({ type: FETCH_ACCOUNT_ERROR, account });
      } else {
        yield put({ type: FETCH_ACCOUNT_SUCCESS, account });
      }
    } catch (error) {
      yield put({ type: FETCH_ACCOUNT_ERROR, error });
    }
  } else {
    console.log('Account ID is undefined.');
  }
}

export function* updateProfile() {
  const watcher = yield takeLatest(UPDATE_ACCOUNT_PROFILE, setAccount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getProfile() {
  yield takeEvery(FETCH_CURRENT_ACCOUNT, getAccount);
}

export default [
  updateProfile,
  getProfile,
];
