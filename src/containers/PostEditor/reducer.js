import { fromJS } from 'immutable';

import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_ERROR,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
} from 'containers/App/constants';

import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
  FETCH_MEDIA_ITEMS_SUCCESS,
  ADD_POST_TO_POSTSET,
  SUBMIT_BUNCH_POSTS_REQUEST,
  SUBMIT_BUNCH_POSTS_SUCCESS,
  CREATE_MEDIA_ITEM_SUCCESS,
  CREATE_MEDIA_ITEM_ERROR,
  UPDATE_MEDIA_ITEM_SUCCESS,
  REMOVE_MEDIA_ITEM,
  SET_MEDIA_ITEM,
  FETCH_URL_CONTENT_SUCCESS,
  PROCESS_ITEM,
  PROCESS_ITEM_SUCCESS,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_LINKS,
  SHOW_IMAGES,
  SHOW_VIDEOS,
  SHOW_FILES,
  FETCH_WORDPRESS_GUI_REQUEST,
  FETCH_WORDPRESS_GUI_SUCCESS,
  FETCH_WORDPRESS_GUI_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CLEAR_MEDIA_ITEM,
} from './constants';

const initialState = fromJS({
  comments: [],
  collections: [{}],
  activeCollection: {
    collection_id: false,
    user_id: false,
    account_id: false,
    type: false,
    status: false,
    creation_time: false,
    properties: [],
    name: false,
    title: false,
    parent_collection_id: false,
  },
  mediaItems: [],
  urlContent: {},
  isProcessing: false,
  postSet: {
    isFetching: false,
    error: null,
    details: {},
  },
  accountTags: {
    isFetching: false,
    error: null,
    data: [],
  },
  pending: false,
  filter: SHOW_ALL,
  wordpressGUI: {
    isFetching: false,
    error: null,
    data: {},
  },
  post: {
    processing: false,
    error: null,
    data: {},
  },
  newMediaItem: {},
});

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return state
        .set('pending', true);
    case ADD_COMMENT:
      return state
        .set('pending', false)
        .updateIn(['comments'], (comments) => comments.push(fromJS(action.comment)));
    case FETCH_COMMENTS_REQUEST:
      return state
        .set('pending', true)
        .set('comments', fromJS([]));
    case SET_VISIBILITY_FILTER:
      return state
        .set('filter', action.filter);
    case SET_COMMENTS:
      return state
        .set('pending', false)
        .set('comments', fromJS(action.comments));
    case DELETE_COMMENT_REQUEST:
      return state
        .set('pending', true);
    case DELETE_COMMENT:
      return state
        .set('pending', false)
        .updateIn(['comments'], (comments) => comments.filter((comment) => comment.get('comment_id') !== action.commentId));
    case FETCH_POST_SET_REQUEST:
      return state
        .set('postSet', fromJS({
          isFetching: true,
          error: null,
          details: {},
        }));
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case FETCH_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: action.payload,
          details: {},
        }));
    case UPDATE_POST_SET_REQUEST:
      return state
        .setIn(['postSet', `${action.section}-fetching`], true)
        .setIn(['postSet', `${action.section}-error`], null)
        .setIn(['postSet', 'isFetching'], true)
        .setIn(['postSet', 'error'], null);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .setIn(['postSet', `${action.section}-fetching`], false)
        .setIn(['postSet', 'isFetching'], false)
        .setIn(['postSet', 'details'], fromJS(action.payload));
    case UPDATE_POST_SET_ERROR:
      return state
        .setIn(['postSet', `${action.section}-fetching`], false)
        .setIn(['postSet', `${action.section}-error`], fromJS(action.payload))
        .setIn(['postSet', 'error'], fromJS(action.payload));
    case FETCH_ACCOUNT_TAGS_REQUEST:
      return state
        .set('accountTags', fromJS({
          isFetching: true,
          error: null,
          data: [],
        }));
    case SET_ACCOUNT_TAGS:
      return state
        .set('accountTags', fromJS({
          isFetching: false,
          error: null,
          data: action.accountTags,
        }));
    case SUBMIT_BUNCH_POSTS_REQUEST:
      return state
        .setIn(['postSet', 'bunch_post_fetching'], true);
    case SUBMIT_BUNCH_POSTS_SUCCESS:
      return state
        .setIn(['postSet', 'bunch_post_fetching'], false);
    case ADD_POST_TO_POSTSET:
      return state
        .updateIn(['postSet', 'details', 'posts'], (posts) => posts.push(fromJS(action.post)));
    case UPDATE_MEDIA_ITEM_SUCCESS:
      return state
        .updateIn(['postSet', 'details'], (postSetDetails) => postSetDetails.set('post_type', action.mediaItems[0].type))
        .updateIn(['postSet', 'details', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItems[0])));
    case CREATE_MEDIA_ITEM_SUCCESS:
      return state
        .updateIn(['postSet', 'details'], (postSetDetails) => postSetDetails.set('post_type', action.mediaItems[0].type))
        .updateIn(['postSet', 'details', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItems[0])))
        .updateIn(['postSet', 'details', 'media_item_ids'], (mediaItemIds) => mediaItemIds.set(0, action.mediaItems[0].media_item_id))
        .set('newMediaItem', fromJS(action.mediaItems[0]));
    case CREATE_MEDIA_ITEM_ERROR:
    case CLEAR_MEDIA_ITEM:
      return state
        .set('newMediaItem', fromJS({}));
    case REMOVE_MEDIA_ITEM:
      return state
        .updateIn(['postSet', 'details'], (postSetDetails) => postSetDetails.set('post_type', 'text'))
        .updateIn(['postSet', 'details', 'media_items'], () => fromJS([]))
        .updateIn(['postSet', 'details', 'media_item_ids'], () => fromJS([]));
    case SET_MEDIA_ITEM:
      return state
        .updateIn(['postSet', 'details'], (postSetDetails) => postSetDetails.set('post_type', action.mediaItem.type))
        .updateIn(['postSet', 'details', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItem)))
        .updateIn(['postSet', 'details', 'media_item_ids'], (mediaItemIds) => mediaItemIds.set(0, action.mediaItem.media_item_id));
    case FETCH_URL_CONTENT_SUCCESS:
      return state
        .set('urlContent', action.urlData);
    case FETCH_COLLECTIONS_SUCCESS:
      return state
        .set('collections', action.collections.data.collections)
        .set('activeCollection', action.collections.data.collections.map((coll) => (coll.parent_collection_id == null) && coll)[0]);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state
        .set('mediaItems', action.mediaItems.data.collection.media_items.filter((t) => t.status !== '0'));
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
        .set('error', action.mediaItems.data.message);
    case PROCESS_ITEM:
      return state
        .set('isProcessing', true);
    case PROCESS_ITEM_SUCCESS:
      return state
        .set('isProcessing', false);
    case FETCH_WORDPRESS_GUI_REQUEST:
      return state
        .setIn(['wordpressGUI', 'isFetching'], true);
    case FETCH_WORDPRESS_GUI_SUCCESS:
      return state
        .setIn(['wordpressGUI', 'isFetching'], false)
        .setIn(['wordpressGUI', 'data'], fromJS(action.payload))
        .setIn(['wordpressGUI', 'error'], null);
    case FETCH_WORDPRESS_GUI_FAILURE:
      return state
        .setIn(['wordpressGUI', 'isFetching'], false)
        .setIn(['wordpressGUI', 'error'], fromJS(action.payload));
    case CREATE_POST_REQUEST:
      return state
        .setIn(['post', 'processing'], true);
    case CREATE_POST_SUCCESS:
      return state
        .setIn(['post', 'processing'], false)
        .setIn(['post', 'data'], fromJS(action.payload))
        .setIn(['post', 'error'], null);
    case CREATE_POST_FAILURE:
      return state
        .setIn(['post', 'processing'], false)
        .setIn(['post', 'error'], fromJS(action.payload));
    case UPDATE_POST_REQUEST:
      return state
        .setIn(['post', 'processing'], true);
    case UPDATE_POST_SUCCESS:
      return state
        .setIn(['post', 'processing'], false)
        .setIn(['post', 'data'], fromJS(action.post));
    case UPDATE_POST_FAILURE:
      return state
        .setIn(['post', 'processing'], false)
        .setIn(['post', 'error'], fromJS(action.payload));
    default: return state;
  }
}

export default boardReducer;
