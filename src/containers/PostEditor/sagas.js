import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel, select, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import moment from 'moment';
import { makeSelectUser } from 'containers/App/selectors';

import {
  getData,
  postData,
  deleteData,
  putData,
} from 'utils/request';

import {
  makeSelectActiveCollection,
} from './selectors';

import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
  SUBMIT_BUNCH_POSTS_REQUEST,
  SUBMIT_BUNCH_POSTS_SUCCESS,
  ADD_POST_TO_POSTSET,
  VIDEO_PROCESSING,
  CREATE_MEDIA_ITEM,
  CREATE_MEDIA_ITEM_SUCCESS,
  CREATE_MEDIA_ITEM_ERROR,
  UPDATE_MEDIA_ITEM,
  UPDATE_MEDIA_ITEM_SUCCESS,
  FETCH_URL_CONTENT,
  FETCH_URL_CONTENT_SUCCESS,
  POST_EDITOR_ERROR,
  GET_MEDIA_ITEM,
  GET_MEDIA_ITEM_SUCCESS,
  FETCH_COLLECTIONS,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
  FETCH_MEDIA_ITEMS_SUCCESS,
  PROCESS_ITEM,
  PROCESS_ITEM_SUCCESS,
  FETCH_WORDPRESS_GUI_REQUEST,
  CREATE_POST_REQUEST,
} from './constants';

import {
  fetchWordpressGUISuccess,
  fetchWordpressGUIFailure,
  createPostSuccess,
  createPostFailure,
} from './actions';

export function* getComments(payload) {
  const requestUrl = `/post_api/comments/${payload.postSetId}`;
  const result = yield call(getData, requestUrl);
  if (result.data.result === 'success') {
    const comments = result.data.comments.sort((a, b) => a.creation_time - b.creation_time);
    yield put({ type: SET_COMMENTS, comments });
  } else {
    // console.log(result);
  }
}

export function* getLinkData(action) {
  const data = {
    payload: {
      url: action.url,
    },
  };

  const params = serialize(data);

  const result = yield call(getData, `/media_api/url_content?${params}`);
  if (result.data.result === 'success') {
    const urlData = {
      ...result.data.url_data[0],
      short_url: result.data.short_url,
    };

    yield put({ type: FETCH_URL_CONTENT_SUCCESS, urlData });
  } else {
    yield put({ type: POST_EDITOR_ERROR, error: 'Error getting url content' });
  }
}

export function* getAccountTags(payload) {
  const requestUrl = `/post_api/tags/${payload.accountId}`;
  const result = yield call(getData, requestUrl);
  if (result.data.result === 'success') {
    yield put({ type: SET_ACCOUNT_TAGS, accountTags: result.data.tags });
  } else {
    // console.log(result);
  }
}

export function* postCommentRequest(payload) {
  const requestUrl = `/post_api/comment/${payload.postSetId}`;
  const requestData = {
    payload: {
      comment_type: 'general',
      text: payload.text,
    },
  };
  const currentUser = yield select(makeSelectUser());
  try {
    const response = yield call(postData, requestUrl, requestData);
    const { data } = response;
    if (data.result === 'success') {
      yield put({
        type: ADD_COMMENT,
        comment: {
          ...data.payload,
          comment_id: data.comment_id,
          creation_time: moment().unix(),
          user: {
            user_id: currentUser.user_id,
            properties: currentUser.properties,
            display_name: currentUser.display_name,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* submitPost(post) {
  const requestUrl = '/post_api/post';
  const requestData = {
    payload: post,
  };
  try {
    const response = yield call(postData, requestUrl, requestData);
    const { data } = response;
    if (data.result === 'success') {
      yield put({ type: ADD_POST_TO_POSTSET, post: data.post });
    }
  } catch (error) {
    console.log(error);
  }
}

function* submitAllPosts(posts) {
  for (const key in posts) {
    const post = posts[key];
    yield fork(submitPost, post);
  }
}

function* submitBunchPosts({ posts }) {
  yield call(submitAllPosts, posts);
  yield put({ type: SUBMIT_BUNCH_POSTS_SUCCESS });
}

export function* deleteCommentRequest(payload) {
  const requestUrl = `/post_api/comment/${payload.commentId}`;
  try {
    const response = yield call(deleteData, requestUrl);
    const { data } = response;
    if (data.result === 'success') {
      yield put({ type: DELETE_COMMENT, commentId: payload.commentId });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getMediaItem(action) {
  try {
    const response = yield call(getData, `/media_api/media_item/${action.mediaItemId}`);
    const { data } = response;
    if (data.result == 'result') {
      const mediaItem = [data.media_item];
      yield put({ type: GET_MEDIA_ITEM_SUCCESS, mediaItem });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createMediaItem(action) {
  const { mediaItemType, ...item } = action.mediaItem;
  yield put({ type: PROCESS_ITEM });
  let url = '';
  let data = {};
  
  if (mediaItemType === 'link') {
    url = '/media_api/link';
    data = {
      payload: item,
    };
  } else if (mediaItemType === 'file') {
    url = '/media_api/files';
    data = {
      payload: {
        media_items:[{...item.properties}],
      }
    };
  }
  
  if (url !== '') {
    const res = yield call(postData, url, data);
    if (res.data.result === 'success') {
      if (res.data.media_items[0].status === '3') {
        const id = res.data.media_items[0].media_item_id;
        yield put({ type: VIDEO_PROCESSING, id });
        const mediaItems = res.data.media_items;
        yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });
        yield put({ type: PROCESS_ITEM_SUCCESS });
      } else {
        const mediaItems = res.data.media_items;
        yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });
        yield put({ type: PROCESS_ITEM_SUCCESS });
      }
    } else {
      yield put({ type: CREATE_MEDIA_ITEM_ERROR });
    }
  }
}

export function* updateMediaItem(action) {
 const { mediaItemType, ...item } = action.mediaItem;
 const data = {
   payload: item,
 };
 
 const results = yield call(putData, `/media_api/media_item/${item.media_item_id}`, data);
 if (results.data.result === 'success') {
   const mediaItems = results.data.media_items;
   yield put({ type: UPDATE_MEDIA_ITEM_SUCCESS, mediaItems });
 }
}

export function* getCollections(action) {
  const accountId = action.accountId;

  const data = {
    payload: {
      account_id: accountId,
    } };

  const params = serialize(data);
  const collections = yield call(getData, `/media_api/collections?${params}`);

  yield put({ type: FETCH_COLLECTIONS_SUCCESS, collections });

  const activeCollection = yield select(makeSelectActiveCollection());

  const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);
  if (!mediaItems.data.error) {
    yield put({ type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems });
  } else {
    yield put({ type: FETCH_MEDIA_ITEMS_ERROR, mediaItems });
  }
}

export function* fetchWordpressGUIWorker({ payload }) {
  let data;

  try {
    const response = yield call(getData, `/connection_api/wordpress_gui/${payload.connectionId}`);
    if (response.data.status !== 'success') {
      throw Error('Status Wrong!');
    }
    data = response.data;
  } catch (error) {
    yield put(fetchWordpressGUIFailure(error));
  }

  if (data) {
    yield put(fetchWordpressGUISuccess(data));
  }
}

function* createPostWorker({ payload }) {
  let data;

  try {
    const response = yield call(postData, '/post_api/post', { payload });
    if (response.data.result !== 'success') {
      throw Error('Status Wrong!');
    }
    data = response.data;
  } catch (error) {
    yield put(createPostFailure(error));
  }

  if (data) {
    yield put(createPostSuccess(data.post));
  }
}

export function* createPostSaga() {
  const watcher = yield takeLatest(CREATE_POST_REQUEST, createPostWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchComments() {
  const watcher = yield takeLatest(FETCH_COMMENTS_REQUEST, getComments);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* postComment() {
  const watcher = yield takeLatest(POST_COMMENT_REQUEST, postCommentRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteComment() {
  const watcher = yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchAccountTags() {
  const watcher = yield takeLatest(FETCH_ACCOUNT_TAGS_REQUEST, getAccountTags);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* submitBunchPostsRequest() {
  const watcher = yield takeLatest(SUBMIT_BUNCH_POSTS_REQUEST, submitBunchPosts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* mediaItem() {
  const watcher = yield takeLatest(CREATE_MEDIA_ITEM, createMediaItem);
  
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateMedia() {
  const watcher = yield takeLatest(UPDATE_MEDIA_ITEM, updateMediaItem);
  
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* linkData() {
  const watcher = yield takeEvery(FETCH_URL_CONTENT, getLinkData);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getItem() {
  const watcher = yield takeLatest(GET_MEDIA_ITEM, getMediaItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* collectionData() {
  const watcher = yield takeLatest(FETCH_COLLECTIONS, getCollections);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchWordpressGUISaga() {
  const watcher = yield takeLatest(FETCH_WORDPRESS_GUI_REQUEST, fetchWordpressGUIWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchComments,
  postComment,
  deleteComment,
  fetchAccountTags,
  submitBunchPostsRequest,
  collectionData,
  mediaItem,
  updateMedia,
  linkData,
  getItem,
  fetchWordpressGUISaga,
  createPostSaga,
];

const serialize = (obj, prefix) => {
  const str = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const p = keys[i];
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];
    str.push((v !== null && typeof v === 'object') ?
      serialize(v, k) :
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  return str.join('&');
};
