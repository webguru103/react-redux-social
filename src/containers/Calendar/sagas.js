/* eslint-disable no-console */
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  getData,
  putData,
} from 'utils/request';

import {
  FETCH_POSTS,
  UPDATE_POST_REQUEST,
} from './constants';

import {
  setPosts,
} from './actions';

function* fetchPostsWorker({ accountId }) {
  const requestUrl = `/post_api/posts/${accountId}`;

  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    const posts = response.data.posts;
    yield put(setPosts(posts));
  } else {
    console.log(response);
  }
}

function* updatePostWorker({ post }) {
  const requestUrl = `/post_api/post/${post.post_id}`;
  const requestData = {
    payload: {
      ...post,
    },
  };

  const response = yield call(putData, requestUrl, requestData);
  if (response.data.result === 'success') {
    yield put({ type: 'UPDATE_POST_SUCCESS', post: response.data.post });
  } else {
    console.log(response);
  }
}

export function* fetchPostsWatcher() {
  const watcher = yield takeLatest(FETCH_POSTS, fetchPostsWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updatePostWatcher() {
  const watcher = yield takeLatest(UPDATE_POST_REQUEST, updatePostWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  // fetchPostsWatcher,
  // updatePostWatcher,
];
