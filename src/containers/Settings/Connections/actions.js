import {
    SET_CHANNEL_FILTER,
    SET_CHANNEL_TYPE,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG,
    FETCH_SOCIAL_URL,
    CONNECTION_CALLBACK,
    SET_SOCIAL_URLS,
    REMOVE_CONNECTION,
    SET_SUB_CALLBACK,
    SET_SUB_CHANNEL,
    CREATE_SUB_CHANNELS,
    CLEAR_SUB_DATA,
    GET_WORDPRESS_BLOGS,
    VALIDATE_CONNECTIONS,
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

export function removeConnection(connectionId) {
  return { type: REMOVE_CONNECTION, connectionId };
}

export function connectionCallback(channelObject) {
  return { type: CONNECTION_CALLBACK, channelObject };
}

export function setSocialUrls(urls) {
  return { type: SET_SOCIAL_URLS, urls };
}

export function setSubCallback(sub) {
  return { type: SET_SUB_CALLBACK, sub };
}

export function setSubChannel(subChannel) {
  return { type: SET_SUB_CHANNEL, subChannel };
}

export function createSubChannels(data) {
  return { type: CREATE_SUB_CHANNELS, data };
}

export function clearSubData() {
  return { type: CLEAR_SUB_DATA };
}

export function validateConnections(id) {
  return { type: VALIDATE_CONNECTIONS, id };
}

export function getWordpressBlogs(data) {
  return { type: GET_WORDPRESS_BLOGS, data };
}
