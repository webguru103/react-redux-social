import {
  FETCH_SOCIAL_FEED,
  SET_SOCIAL_FEED,
  SET_CONNECTION,
} from './constants';

export function fetchSocialFeed(connectionId) {
  return { type: FETCH_SOCIAL_FEED, connectionId };
}

export function setSocialFeed(feed) {
  return { type: SET_SOCIAL_FEED, feed };
}

export function setConnection(connection) {
  return { type: SET_CONNECTION, connection };
}
