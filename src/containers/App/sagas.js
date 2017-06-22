// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place
/* eslint-disable camelcase */

import { takeLatest, delay } from 'redux-saga';
import { take, call, put, race, select, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { toastr } from 'lib/react-redux-toastr';
import { getData, postData, putData } from 'utils/request';
import auth from 'utils/auth';
import { set } from 'utils/localStorage';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';
import { makeSelectUser } from './selectors';

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  UPDATE_REQUEST,
  SET_AUTH,
  LOGOUT,
  REQUEST_ERROR,
  SET_USER,
  GET_USER,
  // SET_ROLES,
  CHECK_USER_OBJECT,
  CLEAR_USER,
  CREATE_PAYMENT_SOURCE,
  APPLY_COUPON,
  POST_SUBSCRIPTION,
  FETCH_CURRENT_PLAN,
  FETCH_PAYMENT_SOURCES,
  FETCH_PAYMENT_HISTORY,
  FETCH_GROUP_USERS,
  INVITE_EMAIL_TO_GROUP,
  ADD_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP,
  SET_POST_SETS,
  FETCH_POST_SETS,
  DELETE_POST_SET_REQUEST,
  DELETE_POST_SET_SUCCESS,
  CHANGE_POST_SET_REQUEST,
  CHANGE_POST_SET_STATUS,
  FETCH_POST_SET_REQUEST,
  UPDATE_POST_SET_REQUEST,
  FETCH_POSTS,
  UPDATE_POST_REQUEST,
  UPDATE_BUNCH_POST_REQUEST,
  FETCH_CONNECTIONS,
  CREATE_POST_SET_REQUEST,
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_MEDIA_ITEMS_REQUEST,
} from './constants';

import {
  createPaymentSourceSuccess,
  createPaymentSourceError,
  applyCouponSuccess,
  applyCouponError,
  postSubscriptionSuccess,
  postSubscriptionError,
  fetchCurrentPlanSuccess,
  fetchCurrentPlanError,
  fetchPaymentSourcesSuccess,
  fetchPaymentSourcesError,
  fetchPaymentHistorySuccess,
  fetchPaymentHistoryError,
  fetchGroupUsersSuccess,
  fetchGroupUsersError,
  inviteEmailToGroupSuccess,
  inviteEmailToGroupError,
  addUserToGroupSuccess,
  addUserToGroupError,
  removeUserFromGroupSuccess,
  removeUserFromGroupError,
  fetchPostSetRequest,
  fetchPostSetSuccess,
  fetchPostSetError,
  fetchPostSetsBySTRequest,
  fetchPostSetsBySTSuccess,
  fetchPostSetsBySTFailure,
  updatePostSetSuccess,
  updatePostSetError,
  getPostSets,
  updateBunchPostSuccess,
  setPosts,
  setConnections,
  createPostSetSuccess,
  fetchMediaItemsSuccess,
  fetchMediaItemsFailure,
} from './actions';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize({ name, email, password, properties, isRegistering, token }) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
   // let salt = genSalt(username);
   // let hash = hashSync(password, salt);
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, name, email, password, properties, token);
    } else {
      response = yield call(auth.login, email, password);
    }
    return response;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    // yield put({ type: REQUEST_ERROR, error: error.response.data.message });

    throw error.data.message;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorizeUpdate(data) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    // let salt = genSalt(username);
    // let hash = hashSync(password, salt);
    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!

    yield call(auth.updateUser, data);
    yield call(auth.updateOwnAccount, data);
    // yield call(auth.updateTags, data);

    yield put({ type: GET_USER });

    return true;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    // yield put({ type: REQUEST_ERROR, error: error.response.data.message });

    throw error.data.message;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout);
    yield put({ type: SENDING_REQUEST, sending: false });
    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
    return error.message;
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `for (;;)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  for (;;) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(LOGIN_REQUEST);
    const { email, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first

    try {
      const winner = yield race({
        auth: call(authorize, { email, password, isRegistering: false }),
        logout: take(LOGOUT),
      });

      // If `authorize` was the winner...
      if (winner.auth) {
        // ...we send Redux appropiate actions
        yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
        yield put({ type: SET_USER, user: winner.auth });
        // If `logout` won...
      } else if (winner.logout) {
        // ...we send Redux appropiate action
        yield put({ type: SET_AUTH, newAuthState: false }); // User is not logged in (not authorized)
        yield call(logout); // Call `logout` effect
        yield call(forwardTo, '/login'); // Go to root page
      } else {
        throw Error('Sign in failed. Please check your email and password and try again.');
      }
    } catch (err) {
      toastr.error(err);
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  for (;;) {
    yield take(LOGOUT);
    yield put({ type: SET_AUTH, newAuthState: false });

    yield call(logout);
    yield put({ type: CLEAR_USER });

    yield call(forwardTo, '/login');

    toastr.success('Success!', 'You are now logged out.');
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {
  for (;;) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(REGISTER_REQUEST);
    const { name, password, email, properties, token } = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not

    try {
      yield call(authorize, { name, email, password, properties, token, isRegistering: true });
      yield call(set, 'signup', { name, email });
      if (token) {
        yield forwardTo(`/signup/verification?token=${token}`);
      } else {
        yield forwardTo('/signup/verification');
      }
    } catch (error) {
      toastr.error(error);
    }
  }
}

/**
 * Update saga
 * Very similar to register saga!
 */
export function* updateFlow() {
  for (;;) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(UPDATE_REQUEST);
    const data = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not

    try {
      yield call(authorizeUpdate, data);
      toastr.success('Success!', 'User setting is updated.');
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
      forwardTo('/dashboard'); // Go to dashboard page
    } catch (error) {
      toastr.error('Failed!', error);
    }
  }
}

export function* userExistsFlow() {
  for (;;) {
    yield take(CHECK_USER_OBJECT);
    const user = yield select(makeSelectUser());
    if (!user.user_id) {
      const currentUser = yield call(auth.getCurrentUser);
      yield put({ type: SET_USER, user: currentUser });
    }
  }
}

export function* getUserFlow() {
  for (;;) {
    yield take(GET_USER);

    const currentUser = yield call(auth.getCurrentUser);
    yield put({ type: SET_USER, user: currentUser });
  }
}

export function* createPaymentSourceFlow() {
  for (;;) {
    const { payload } = yield take(CREATE_PAYMENT_SOURCE);

    try {
      const response = yield call(postData, '/payment_api/source', { payload });
      const { data } = response;
      if (data.status === 'success') {
        yield put(createPaymentSourceSuccess(data.sources));
      } else {
        throw data.error;
      }
    } catch (error) {
      yield put(createPaymentSourceError(error));
    }
  }
}

export function* applyCouponFlow() {
  for (;;) {
    const { payload } = yield take(APPLY_COUPON);
    if (!payload) {   // remove coupon
      yield put(applyCouponSuccess(null));
    } else {
      try {
        const response = yield call(getData, `/payment_api/coupon/${payload}`);
        const { data } = response;

        if (data.coupon) {
          yield put(applyCouponSuccess(data.coupon));
        } else {
          throw data.message;
        }
      } catch (error) {
        const msg = 'So sorry, the coupon code you entered is invalid.';
        yield put(applyCouponError(msg));
      }
    }
  }
}

export function* postSubscriptionFlow() {
  for (;;) {
    const { payload } = yield take(POST_SUBSCRIPTION);

    try {
      const response = yield call(postData, '/payment_api/subscription', { payload });
      const { data } = response;

      if (data.status === 'success') {
        yield put(postSubscriptionSuccess(data));
      } else {
        throw data;
      }
    } catch (error) {
      yield put(postSubscriptionError(error));
    }
  }
}

function* fetchCurrentPlanLoop(accountId, selectedPlan) {
  for (;;) {
    const response = yield call(getData, `/payment_api/plan/${accountId}`);
    const { data: { plan_id } = {} } = response;

    if (plan_id === selectedPlan) {
      return 'success';
    }
    yield call(delay, 3000);
  }
}

export function* fetchCurrentPlanFlow() {
  for (;;) {
    const { payload: { accountId, selectedPlan } } = yield take(FETCH_CURRENT_PLAN);

    try {
      const { currentPlan } = yield race({
        currentPlan: call(fetchCurrentPlanLoop, accountId, selectedPlan),
        timeout: call(delay, 30000),
      });

      if (currentPlan) {
        yield put(fetchCurrentPlanSuccess({}));
      } else {
        yield put(fetchCurrentPlanError('Timeout'));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function* fetchPaymentSourcesFlow() {
  for (;;) {
    const { payload: { accountId } } = yield take(FETCH_PAYMENT_SOURCES);

    try {
      const { data } = yield call(getData, `/payment_api/sources/${accountId}`);

      if (data.status === 'success') {
        yield put(fetchPaymentSourcesSuccess(data.sources));
      } else {
        yield put(fetchPaymentSourcesError(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function* fetchPaymentHistoryFlow() {
  for (;;) {
    const { payload: { accountId } } = yield take(FETCH_PAYMENT_HISTORY);

    try {
      const { data } = yield call(getData, `/payment_api/history/${accountId}`);

      if (data.status === 'success') {
        yield put(fetchPaymentHistorySuccess(data.charges));
      } else {
        yield put(fetchPaymentHistoryError(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function* fetchGroupUsersFlow() {
  for (;;) {
    const { payload: { accountId } } = yield take(FETCH_GROUP_USERS);

    try {
      const { data } = yield call(getData, `/account_api/account_group_users/${accountId}`);
      if (data.status === 'success') {
        yield put(fetchGroupUsersSuccess(data));
      } else {
        yield put(fetchGroupUsersError(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function* inviteEmailToGroupFlow() {
  for (;;) {
    const { payload } = yield take(INVITE_EMAIL_TO_GROUP);

    try {
      const { data } = yield call(postData, '/account_api/invite_email_to_group', { payload });

      if (data.status === 'success') {
        yield put(inviteEmailToGroupSuccess(data.payload));
        toastr.success('Success', 'An invitation to join the team has been sent to the email you provided.');
      } else {
        throw data;
      }
    } catch (error) {
      const message = error.message || 'There was an error in sending the invitation';
      yield put(inviteEmailToGroupError(message));
      toastr.error(message);
    }
  }
}

export function* addUserToGroupFlow() {
  for (;;) {
    const { payload } = yield take(ADD_USER_TO_GROUP);

    try {
      const { data } = yield call(postData, '/account_api/add_user_to_group', { payload });

      if (data.status === 'success') {
        yield put(addUserToGroupSuccess(data.payload));
        toastr.success('Success', 'The team member\'s access has been changed');
      } else {
        throw data;
      }
    } catch (error) {
      const message = error.message || 'There was an error in changing team member\'s access';
      yield put(addUserToGroupError(message));
    }
  }
}

export function* removeUserFromGroupFlow() {
  for (;;) {
    const { payload } = yield take(REMOVE_USER_FROM_GROUP);

    try {
      const { data } = yield call(postData, '/account_api/remove_user_from_group', { payload });

      if (data.status === 'success') {
        yield put(removeUserFromGroupSuccess(data.payload));
        toastr.success('Success', 'The member has been removed');
      } else {
        throw data;
      }
    } catch (error) {
      const message = error.message || 'There was an error in delete a member';
      yield put(removeUserFromGroupError(message));
    }
  }
}


const serialize = function serialize(obj, prefix) {
  const str = [];
  let p;
  for (p in obj) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p, v = obj[p]; // eslint-disable-line
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  }
  return str.join('&');
};

export function* fetchPostSetsWorker(payload) {
  const data = {
    payload: {
      sort_by: 'creation_time',
      sort_order: 'DESC',
      limit: 500,
      statuses: [1, 2, 3, 4, 5, 6],
    },
  };
  const params = serialize(data);
  const requestUrl = `/post_api/post_sets/${payload.accountId}?${params}`;
  const result = yield call(getData, requestUrl);
  if (result.data.status === 'success') {
    const postSets = result.data.post_sets;
    yield put({ type: SET_POST_SETS, postSets });
  } else {
    // console.log(result);
  }
}

function* fetchPostSetsBySTRequestWorker(payload) {
  const data = {
    payload: {
      sort_by: 'schedule_time',
      sort_order: 'DESC',
      limit: 500,
    },
  };
  const params = serialize(data);
  const currentAccount = yield select(makeSelectCurrentAccount());
  let id = currentAccount.account_id;
  if (payload.accountId) {
    id = payload.accountId;
  }
  const requestUrl = `/post_api/post_sets_by_schedule_time/${id}?${params}`;

  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    yield put(fetchPostSetsBySTSuccess(response.data));
  } else {
    yield put(fetchPostSetsBySTFailure(response.statusText));
  }
}

export function* deletePostSetRequest(payload) {
  const requestData = {
    payload: {
      status: '0',
    },
  };
  const requestUrl = `/post_api/post_set/${payload.id}?`;
  try {
    const response = yield call(putData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put({ type: DELETE_POST_SET_SUCCESS, id: payload.id });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* changePostSetRequest(payload) {
  const requestData = {
    payload: {
      status: payload.status,
    },
  };
  const requestUrl = `/post_api/post_set/${payload.id}?`;
  try {
    const response = yield call(putData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put({ type: CHANGE_POST_SET_STATUS, id: payload.id, status: payload.status });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchPostSetWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/post_api/post_set/${payload.id}`);
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

export function* updatePostSetWorker(action) {
  const { payload, section } = action;

  try {
    const response = yield call(putData, `/post_api/post_set/${payload.id}`, { payload });
    const { data } = response;
    if (data.status === 'success') {
      yield put(updatePostSetSuccess(data.post_set, section));
      yield put(getPostSets(data.post_set.account_id));
      yield put(fetchPostSetsBySTRequest());
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(updatePostSetError(error, section));
  }
}

export function* fetchPostSets() {
  yield takeLatest(FETCH_POST_SETS, fetchPostSetsWorker);
}

export function* fetchPostSetsBySTRequestSaga() {
  yield takeLatest(FETCH_POST_SETS_BY_ST_REQUEST, fetchPostSetsBySTRequestWorker);
}

export function* deletePostSet() {
  yield takeLatest(DELETE_POST_SET_REQUEST, deletePostSetRequest);
}

export function* changePostSetStatus() {
  yield takeLatest(CHANGE_POST_SET_REQUEST, changePostSetRequest);
}

export function* fetchPostSetSaga() {
  yield takeLatest(FETCH_POST_SET_REQUEST, fetchPostSetWorker);
}

export function* updatePostSetSaga() {
  yield takeLatest(UPDATE_POST_SET_REQUEST, updatePostSetWorker);
}

function* fetchPostsWorker({ accountId }) {
  const data = {
    payload: {
      sort_by: 'creation_time',
      limit: 500,
    },
  };
  const params = serialize(data);

  const requestUrl = `/post_api/posts/${accountId}?${params}`;

  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    const posts = response.data.posts;
    yield put(setPosts(posts));
  } else {
    console.log(response);
  }
}

function* updatePostRequestWorker({ post }) {
  const requestUrl = `/post_api/post/${post.post_id}`;
  const requestData = {
    payload: {
      ...post,
    },
  };

  const response = yield call(putData, requestUrl, requestData);
  if (response.data.result === 'success') {
    yield put({ type: 'UPDATE_POST_SUCCESS', post: response.data.post });
    yield put(fetchPostSetRequest({ id: response.data.post.post_set_id }));
    yield put(fetchPostSetsBySTRequest());
  } else {
    console.log(response);
    yield put({ type: 'UPDATE_POST_FAILURE', payload: response.data });
  }
}

/* Independent update post function to update a single post (for Bunch post updating) */
function* updatePost(post) {
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

function* updateBunchPosts(posts) {
  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    yield fork(updatePost, post);
  }
}

function* updateBunchPostRequestWorker({ posts }) {
  yield call(updateBunchPosts, posts);
  yield put(fetchPostSetsBySTRequest());
  yield put(updateBunchPostSuccess());
}

export function* fetchPostsSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsWorker);
}

export function* updatePostSaga() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePostRequestWorker);
}

export function* updateBunchPostSaga() {
  yield takeLatest(UPDATE_BUNCH_POST_REQUEST, updateBunchPostRequestWorker);
}

function* fetchConnectionsWorker({ accountId }) {
  const data = {
    payload: {
      account_id: accountId,
    },
  };
  const params = serialize(data);

  const response = yield call(getData, `/connection_api/connections?${params}`);
  if (response.data.status === 'success') {
    yield put(setConnections(response.data.connections));
  } else {
    console.log(response);
  }
}

export function* fetchConnectionsSaga() {
  yield takeLatest(FETCH_CONNECTIONS, fetchConnectionsWorker);
}

function* createPostSetWorker({ postSet, edit }) {
  const requestUrl = '/post_api/post_set';
  const requestData = {
    payload: {
      ...postSet,
    },
  };

  const response = yield call(postData, requestUrl, requestData);
  if (response.data.status === 'success') {
    yield put(createPostSetSuccess(response.data.post_set, edit));
  } else {
    console.log(response);
  }
}

export function* createPostSetSaga() {
  yield takeLatest(CREATE_POST_SET_REQUEST, createPostSetWorker);
}

export function* fetchMediaItemsWorker(action) {
  const accountId = action.accountId;

  const data = {
    payload: {
      account_id: accountId,
    } };

  const params = serialize(data);
  const collections = yield call(getData, `/media_api/collections?${params}`);
  const activeCollection = collections.data.collections[0];

  const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);
  if (!mediaItems.data.error) {
    yield put(fetchMediaItemsSuccess(mediaItems));
  } else {
    yield put(fetchMediaItemsFailure(mediaItems.data.error));
  }
}

export function* fetchMediaItemsSaga() {
  yield takeLatest(FETCH_MEDIA_ITEMS_REQUEST, fetchMediaItemsWorker);
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
  loginFlow,
  logoutFlow,
  registerFlow,
  updateFlow,
  getUserFlow,
  userExistsFlow,
  createPaymentSourceFlow,
  applyCouponFlow,
  postSubscriptionFlow,
  fetchCurrentPlanFlow,
  fetchPaymentSourcesFlow,
  fetchPaymentHistoryFlow,
  fetchGroupUsersFlow,
  inviteEmailToGroupFlow,
  addUserToGroupFlow,
  removeUserFromGroupFlow,
  fetchPostSets,
  deletePostSet,
  changePostSetStatus,
  fetchPostSetSaga,
  updatePostSetSaga,
  fetchPostsSaga,
  fetchPostSetsBySTRequestSaga,
  updatePostSaga,
  updateBunchPostSaga,
  fetchConnectionsSaga,
  createPostSetSaga,
  fetchMediaItemsSaga,
];

// Little helper function to abstract going to different pages
export function* forwardTo(location) {
  yield call(browserHistory.push, location);
}
