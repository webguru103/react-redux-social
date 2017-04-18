import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

import {
    IS_LOADING_CHANNEL,
    FETCH_CHANNEL,
    FETCH_CHANNEL_SUCCESS,
    FETCH_CHANNEL_ERR,
    FETCH_CHANNEL_CONNECTION,
} from './constants';

import {
    getData
} from 'utils/request.js';

export function* getChannel() {
    let fetchchannel = yield take(FETCH_CHANNEL);
    const channelId = fetchchannel.channelid;
    const requestURL = `/connection_api/analytics/${channelId}`;
    yield put({ type: IS_LOADING_CHANNEL });
    try {
      const channel = yield call(getData, requestURL);
      if (channel.data.error) {
        yield put({ type: FETCH_CHANNEL_ERR, channel });
      } else {
        const channelInfo = channel.data;
        yield put({ type: FETCH_CHANNEL_SUCCESS, channelInfo });
      }
    } catch (error) {
      yield put({ type: FETCH_CHANNEL_ERR, error });
    }
}

export default [
  getChannel,
];


// const serialize = function(obj, prefix) {
//   var str = [], p;
//   for(p in obj) {
//     if (obj.hasOwnProperty(p)) {
//       var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
//       str.push((v !== null && typeof v === "object") ?
//         serialize(v, k) :
//         encodeURIComponent(k) + "=" + encodeURIComponent(v));
//     }
//   }
//   return str.join("&");
// };