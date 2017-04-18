/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import {
   FETCH_COLLECTIONS_SUCCESS,
   FETCH_MEDIA_ITEMS_SUCCESS,
   FETCH_MEDIA_ITEMS_ERROR,
} from './constants';

// The initial application state
const initialState = fromJS({
  activeMediaItem: {},
  detailView: false,
  addView: false,
  isFetching: true,
  error: false,
  searchResults: [],
  urlContent: { images: [] },
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
  mediaItems: [{}],
});

// Takes care of changing the application state
function mediaLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS_SUCCESS:
      return state
            .set('collections', action.collections.data.collections)
            .set('activeCollection', action.collections.data.collections.map((coll) => (coll.parent_collection_id == null) && coll)[0]);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state
            .set('mediaItems', action.mediaItems.data.collection.media_items);
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
            .set('error', action.mediaItems.data.message);
    default:
      return state;
  }
}

export default mediaLibraryReducer;
