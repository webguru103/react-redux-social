import { takeLatest, call, put } from 'redux-saga/effects';

import { getData } from 'utils/request';

import {
  FETCH_POST_SET_REQUEST,
} from './constants';

import {
  fetchPostSetSuccess,
  fetchPostSetError,
} from './actions';

export function* fetchPostSetWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/post_api/public_post_set/${payload.id}`, false);
    const { data } = response;
    if (data.status === 'success') {
      yield put(fetchPostSetSuccess(data.post_set));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(fetchPostSetError(error));
  }
}

export function* fetchPostSetSaga() {
  yield takeLatest(FETCH_POST_SET_REQUEST, fetchPostSetWorker);
}

export default [
  fetchPostSetSaga,
];
