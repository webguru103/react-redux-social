import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
  getData,
} from 'utils/request';

import {
  FETCH_SOCIAL_URL,
  SET_SOCIAL_URLS,
} from './constants';
import {
  connectionCallback,
} from './actions';

export function* getSocialUrls() {
  const currentAccount = yield select(makeSelectCurrentAccount());
  const data = {
    payload: {
      account_id: currentAccount.account_id,
      callback: connectionCallback,
    },
  };
  const params = serialize(data);
  const requestUrl = `/connection_api/social_urls?${params}`;
  const result = yield call(getData, requestUrl);

  if (result.data.status === 'success') {
    const urls = result.data.urls;
    yield put({ type: SET_SOCIAL_URLS, urls });
  } else {
    // console.log(result);
  }
}

export function* connectChannel() {
  const watcher = yield takeLatest(FETCH_SOCIAL_URL, getSocialUrls);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  connectChannel,
];

const serialize = (obj, prefix) => {
  const str = [];
  let p;
  obj.allKeys.forEach((key) => {
    const k = prefix ? `${prefix}[${key}]` : p;
    const v = obj.key;
    str.push((v !== null && typeof v === 'object') ?
      serialize(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });
  return str.join('&');
};
