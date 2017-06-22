// import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';

import {
  getData,
} from 'utils/request';

import {
  IS_LOADING_CHANNEL,
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_ERR,
} from './constants';

export function* getChannel() {
  const fetchchannel = yield take(FETCH_CHANNEL);
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
