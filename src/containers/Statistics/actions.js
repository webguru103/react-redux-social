import {
    SET_CHANNEL_FILTER,
    SET_CHANNEL_TYPE,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG,
    FETCH_SOCIAL_URL,
    CONNECTION_CALLBACK,
    SET_SOCIAL_URLS,
    ACCOUNT_ID,
} from './constants';

export function setChannelFilter(channelFilter) {
  return { type: SET_CHANNEL_FILTER, channelFilter };
}

export function setChannelType(channelType) {
  return { type: SET_CHANNEL_TYPE, channelType };
}

export function setConnectionsList(connections) {
  return { type: SET_CONNECTIONS_LIST, connections };
}

export function toggleDialog(shown) {
  return { type: TOGGLE_ADD_CONNECTION_DIALOG, shown };
}

export function getSocialUrl() {
  return { type: FETCH_SOCIAL_URL };
}

export function connectionCallback(channelObject) {
  return { type: CONNECTION_CALLBACK, channelObject };
}
export function setSocialUrls(urls) {
  return { type: SET_SOCIAL_URLS, urls };
}
export function getAccountId() {
  return { type: ACCOUNT_ID };
}
export function setAccountId(id) {
  return { type: ACCOUNT_ID, id };
}
