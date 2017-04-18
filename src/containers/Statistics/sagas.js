import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
    FETCH_SOCIAL_URL,
    SET_SOCIAL_URLS,
} from './constants';

import {
    connectionCallback,
} from './actions';

import {
    getData
} from 'utils/request.js';

export function* getSocialUrls(action, dispatch) {
  
    const currentAccount = yield select(makeSelectCurrentAccount());
    console.log(currentAccount);
    const data = {
        payload: {
          account_id: currentAccount.account_id,
          callback: connectionCallback
    }};
    const params = serialize(data);
    
    const requestUrl = `/connection_api/social_urls?${params}`;
    
    const result = yield call(getData, requestUrl);
    console.log(result);
    if(result.data.status == 'success') {
        const urls = result.data.urls;
        yield put({type: SET_SOCIAL_URLS, urls});
    } else {
        console.log(result);
    }
}

export function* connectChannel() {
    const watcher = yield takeLatest(FETCH_SOCIAL_URL, getSocialUrls);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    connectChannel
];

const serialize = function(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};