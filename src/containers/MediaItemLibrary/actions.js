import {
  FETCH_COLLECTIONS,
  FETCH_URL_CONTENT,
  CLEAR_URL_CONTENT,
  CREATE_MEDIA_ITEM,
  SEARCH_BING,
  FETCH_RSS_ITEMS,
  FETCH_RSS_FEEDS,
  CREATE_RSS_FEED,
  SET_VISIBILITY_FILTER,
  SET_SEARCH_FILTER,
  DELETE_MEDIA_ITEM,
  SET_PROCESSING_ITEM,
  UPDATE_MEDIA_ITEM,
  SET_SORT_ORDER,
  SET_ACTIVE_MEDIA_ITEM_ID,
  FETCH_STREAM_POST_SETS_REQUEST,
  FETCH_STREAM_POST_SETS_SUCCESS,
  FETCH_STREAM_POST_SETS_FAILURE,
  INVITE_EMAIL_TO_STREAM_REQUEST,
  INVITE_EMAIL_TO_STREAM_SUCCESS,
  INVITE_EMAIL_TO_STREAM_FAILURE,
  REPLICATE_POST_SET_REQUEST,
  REPLICATE_POST_SET_SUCCESS,
  REPLICATE_POST_SET_FAILURE,
} from './constants';

export function fetchCollections(accountId) {
  return {
    type: FETCH_COLLECTIONS,
    accountId,
  };
}

export function fetchUrlData(url) {
  return {
    type: FETCH_URL_CONTENT,
    url,
  };
}

export function clearUrlContent() {
  return {
    type: CLEAR_URL_CONTENT,
  };
}

export function createMediaItem(mediaItem) {
  return {
    type: CREATE_MEDIA_ITEM,
    mediaItem,
  };
}

export function searchWeb(query) {
  return {
    type: SEARCH_BING,
    query,
  };
}

export function createFeed(data) {
  return {
    type: CREATE_RSS_FEED,
    data,
  };
}
export function getRSSItems(feedId) {
  return {
    type: FETCH_RSS_ITEMS,
    feedId,
  };
}

export function getFeeds(accountId) {
  return {
    type: FETCH_RSS_FEEDS,
    accountId,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}

export function setSearchFilter(searchFilter) {
  return {
    type: SET_SEARCH_FILTER,
    searchFilter,
  };
}

export function setSortOrder(sortOrder) {
  return {
    type: SET_SORT_ORDER,
    sortOrder,
  };
}

export function deleteMediaItem(id) {
  return {
    type: DELETE_MEDIA_ITEM,
    id,
  };
}

export function toggleProccessingItem(processingItem) {
  return {
    type: SET_PROCESSING_ITEM,
    processingItem,
  };
}

export function updateMediaItem(mediaItem) {
  return {
    type: UPDATE_MEDIA_ITEM,
    mediaItem,
  };
}

export function setActiveMediaItemId(id) {
  return {
    type: SET_ACTIVE_MEDIA_ITEM_ID,
    id,
  };
}

export function fetchStreamPostSetsRequest(id, payload) {
  return {
    type: FETCH_STREAM_POST_SETS_REQUEST,
    id,
    payload,
  };
}

export function fetchStreamPostSetsSuccess(payload) {
  return {
    type: FETCH_STREAM_POST_SETS_SUCCESS,
    payload,
  };
}

export function fetchStreamPostSetsFailure(payload) {
  return {
    type: FETCH_STREAM_POST_SETS_FAILURE,
    payload,
  };
}

export function inviteEmailToStreamRequest(payload) {
  return {
    type: INVITE_EMAIL_TO_STREAM_REQUEST,
    payload,
  };
}

export function inviteEmailToStreamSuccess(payload) {
  return {
    type: INVITE_EMAIL_TO_STREAM_SUCCESS,
    payload,
  };
}

export function inviteEmailToStreamFailure(payload) {
  return {
    type: INVITE_EMAIL_TO_STREAM_FAILURE,
    payload,
  };
}

export function replicatePostSetRequest(prevUrl, payload) {
  return {
    type: REPLICATE_POST_SET_REQUEST,
    prevUrl,
    payload,
  };
}

export function replicatePostSetSuccess(payload) {
  return {
    type: REPLICATE_POST_SET_SUCCESS,
    payload,
  };
}

export function replicatePostSetFailure(payload) {
  return {
    type: REPLICATE_POST_SET_FAILURE,
    payload,
  };
}
