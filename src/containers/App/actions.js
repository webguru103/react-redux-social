import {
  SET_AUTH,
  SET_USER,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  UPDATE_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  CREATE_PAYMENT_SOURCE,
  CREATE_PAYMENT_SOURCE_SUCCESS,
  CREATE_PAYMENT_SOURCE_ERROR,
  APPLY_COUPON,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_ERROR,
  POST_SUBSCRIPTION,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_ERROR,
  FETCH_CURRENT_PLAN,
  FETCH_CURRENT_PLAN_SUCCESS,
  FETCH_CURRENT_PLAN_ERROR,
  FETCH_PAYMENT_SOURCES,
  FETCH_PAYMENT_SOURCES_SUCCESS,
  FETCH_PAYMENT_SOURCES_ERROR,
  FETCH_PAYMENT_HISTORY,
  FETCH_PAYMENT_HISTORY_SUCCESS,
  FETCH_PAYMENT_HISTORY_ERROR,
  FETCH_GROUP_USERS,
  FETCH_GROUP_USERS_SUCCESS,
  FETCH_GROUP_USERS_ERROR,
  INVITE_EMAIL_TO_GROUP,
  INVITE_EMAIL_TO_GROUP_SUCCESS,
  INVITE_EMAIL_TO_GROUP_ERROR,
  ADD_USER_TO_GROUP,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
  FETCH_POST_SETS,
  SET_POST_SETS,
  DELETE_POST_SET_REQUEST,
  CHANGE_POST_SET_REQUEST,
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_POST_SETS_BY_ST_SUCCESS,
  FETCH_POST_SETS_BY_ST_FAILURE,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_ERROR,
  FETCH_POSTS,
  SET_POSTS,
  UPDATE_POST_REQUEST,
  UPDATE_BUNCH_POST_REQUEST,
  UPDATE_BUNCH_POST_SUCCESS,
  FETCH_CONNECTIONS,
  SET_CONNECTIONS,
  CREATE_POST_SET_REQUEST,
  CREATE_POST_SET_SUCCESS,
  // CHECK_USER_OBJECT,
  FETCH_MEDIA_ITEMS_REQUEST,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
} from './constants';

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return { type: SET_AUTH, newAuthState };
}

export function setUser(user) {
  return { type: SET_USER, user };
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest(data) {
  return { type: LOGIN_REQUEST, data };
}

/**
 * Tells the app we want to log out a user
 */
export function logout() {
  return { type: LOGOUT };
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

/**
 * Tells the app we want to update a user
 * @param  {object} data          The data we're sending for user setting
 * @param  {string} name          The fullname of the user to update
 * @param  {string} company_name  The company name of the user to update
 * @param  {string} title         The title of the user to update
 * @param  {string} email         The email of the user to update
 * @param  {string} phone_number  The phone number of the user to update
 * @param  {string} time_zone     The time zone of the user to update
 */
export function updateRequest(data) {
  return { type: UPDATE_REQUEST, data };
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError(error) {
  return { type: REQUEST_ERROR, error };
}

/**
 * Sets the `error` state as empty
 */
export function clearError() {
  return { type: CLEAR_ERROR };
}

export function createPaymentSource(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE,
    payload,
  };
}

export function createPaymentSourceSuccess(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE_SUCCESS,
    payload,
  };
}

export function createPaymentSourceError(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE_ERROR,
    payload,
  };
}

export function applyCoupon(payload) {
  return {
    type: APPLY_COUPON,
    payload,
  };
}

export function applyCouponSuccess(payload) {
  return {
    type: APPLY_COUPON_SUCCESS,
    payload,
  };
}

export function applyCouponError(payload) {
  return {
    type: APPLY_COUPON_ERROR,
    payload,
  };
}

export function postSubscription(payload) {
  return {
    type: POST_SUBSCRIPTION,
    payload,
  };
}

export function postSubscriptionSuccess(payload) {
  return {
    type: POST_SUBSCRIPTION_SUCCESS,
    payload,
  };
}

export function postSubscriptionError(payload) {
  return {
    type: POST_SUBSCRIPTION_ERROR,
    payload,
  };
}

export function fetchCurrentPlan(payload) {
  return {
    type: FETCH_CURRENT_PLAN,
    payload,
  };
}

export function fetchCurrentPlanSuccess(payload) {
  return {
    type: FETCH_CURRENT_PLAN_SUCCESS,
    payload,
  };
}

export function fetchCurrentPlanError(payload) {
  return {
    type: FETCH_CURRENT_PLAN_ERROR,
    payload,
  };
}

export function fetchPaymentSources(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES,
    payload,
  };
}

export function fetchPaymentSourcesSuccess(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchPaymentSourcesError(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES_ERROR,
    payload,
  };
}

export function fetchPaymentHistory(payload) {
  return {
    type: FETCH_PAYMENT_HISTORY,
    payload,
  };
}

export function fetchPaymentHistorySuccess(payload) {
  return {
    type: FETCH_PAYMENT_HISTORY_SUCCESS,
    payload,
  };
}

export function fetchPaymentHistoryError(payload) {
  return {
    type: FETCH_PAYMENT_HISTORY_ERROR,
    payload,
  };
}

export function fetchGroupUsers(payload) {
  return {
    type: FETCH_GROUP_USERS,
    payload,
  };
}

export function fetchGroupUsersSuccess(payload) {
  return {
    type: FETCH_GROUP_USERS_SUCCESS,
    payload,
  };
}

export function fetchGroupUsersError(payload) {
  return {
    type: FETCH_GROUP_USERS_ERROR,
    payload,
  };
}

export function inviteEmailToGroup(payload) {
  return {
    type: INVITE_EMAIL_TO_GROUP,
    payload,
  };
}

export function inviteEmailToGroupSuccess(payload) {
  return {
    type: INVITE_EMAIL_TO_GROUP_SUCCESS,
    payload,
  };
}

export function inviteEmailToGroupError(payload) {
  return {
    type: INVITE_EMAIL_TO_GROUP_ERROR,
    payload,
  };
}

export function addUserToGroup(payload) {
  return {
    type: ADD_USER_TO_GROUP,
    payload,
  };
}

export function addUserToGroupSuccess(payload) {
  return {
    type: ADD_USER_TO_GROUP_SUCCESS,
    payload,
  };
}

export function addUserToGroupError(payload) {
  return {
    type: ADD_USER_TO_GROUP_ERROR,
    payload,
  };
}

export function removeUserFromGroup(payload) {
  return {
    type: REMOVE_USER_FROM_GROUP,
    payload,
  };
}

export function removeUserFromGroupSuccess(payload) {
  return {
    type: REMOVE_USER_FROM_GROUP_SUCCESS,
    payload,
  };
}

export function removeUserFromGroupError(payload) {
  return {
    type: REMOVE_USER_FROM_GROUP_ERROR,
    payload,
  };
}

export function getPostSets(accountId) {
  return { type: FETCH_POST_SETS, accountId };
}

export function setPostSets(postSets) {
  return { type: SET_POST_SETS, postSets };
}

export function deletePostSetRequest(id) {
  return { type: DELETE_POST_SET_REQUEST, id };
}

export function changePostSetStatusRequest(id, status) {
  return { type: CHANGE_POST_SET_REQUEST, id, status };
}

export function fetchPostSetRequest(payload) {
  return {
    type: FETCH_POST_SET_REQUEST,
    payload,
  };
}

export function fetchPostSetSuccess(payload) {
  return {
    type: FETCH_POST_SET_SUCCESS,
    payload,
  };
}

export function fetchPostSetError(payload) {
  return {
    type: FETCH_POST_SET_ERROR,
    payload,
  };
}

export function updatePostSetRequest(payload, section) {
  return {
    type: UPDATE_POST_SET_REQUEST,
    payload,
    section,
  };
}

export function updatePostSetSuccess(payload, section) {
  return {
    type: UPDATE_POST_SET_SUCCESS,
    payload,
    section,
  };
}

export function updatePostSetError(payload, section) {
  return {
    type: UPDATE_POST_SET_ERROR,
    payload,
    section,
  };
}

export function fetchPosts(accountId) {
  return { type: FETCH_POSTS, accountId };
}

export function setPosts(posts) {
  return { type: SET_POSTS, posts };
}

export function updatePostRequest(post) {
  return { type: UPDATE_POST_REQUEST, post };
}

export function updateBunchPostRequest(posts) {
  return { type: UPDATE_BUNCH_POST_REQUEST, posts };
}

export function updateBunchPostSuccess() {
  return { type: UPDATE_BUNCH_POST_SUCCESS };
}

export function fetchConnections(accountId) {
  return { type: FETCH_CONNECTIONS, accountId };
}

export function setConnections(connections) {
  return { type: SET_CONNECTIONS, connections };
}

export function createPostSetRequest(postSet, edit = true) {
  return { type: CREATE_POST_SET_REQUEST, postSet, edit };
}

export function createPostSetSuccess(postSet, edit) {
  return { type: CREATE_POST_SET_SUCCESS, postSet, edit };
}

export function fetchPostSetsBySTRequest(accountId) {
  return { type: FETCH_POST_SETS_BY_ST_REQUEST, accountId };
}

export function fetchPostSetsBySTSuccess(postSets) {
  return { type: FETCH_POST_SETS_BY_ST_SUCCESS, postSets };
}

export function fetchPostSetsBySTFailure(error) {
  return { type: FETCH_POST_SETS_BY_ST_FAILURE, error };
}

export function fetchMediaItems(accountId) {
  return { type: FETCH_MEDIA_ITEMS_REQUEST, accountId };
}

export function fetchMediaItemsSuccess(mediaItems) {
  return { type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems };
}

export function fetchMediaItemsFailure(error) {
  return { type: FETCH_MEDIA_ITEMS_ERROR, error };
}
