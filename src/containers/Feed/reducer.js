import { fromJS } from 'immutable';

import {
  FETCH_SOCIAL_FEED,
  SET_SOCIAL_FEED,
  SET_CONNECTION,
} from './constants';

const initialState = fromJS({
  connectionId: '',
  feed: [],
  connection: {},
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOCIAL_FEED:
      return state.set('feed', null);
    case SET_SOCIAL_FEED:
      return state.set('feed', action.feed);
    case SET_CONNECTION:
      return state.set('connection', action.connection);
    default: return state;
  }
}

export default feedReducer;
