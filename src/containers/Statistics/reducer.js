import { fromJS } from 'immutable';

import {
  SET_CHANNEL_FILTER,
  SET_CHANNEL_TYPE,
  SET_CONNECTIONS_LIST,
  TOGGLE_ADD_CONNECTION_DIALOG,
  SET_SOCIAL_URLS,
  ACCOUNT_ID,
} from './constants';

const initialState = fromJS({
  channelFilter: '',
  channelType: '',
  dialogShown: false,
  connections: [],
  socialUrls: {},
  accountId: '',
});

function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNEL_FILTER:
      return state
        .set('channelFilter', action.channelFilter);
    case SET_CHANNEL_TYPE:
      return state
        .set('channelType', action.channelType);
    case SET_CONNECTIONS_LIST:
      console.log(action.connections);
      return state
        .set('connections', action.connections);
    case SET_SOCIAL_URLS:
      return state
        .set('socialUrls', action.urls);
    case TOGGLE_ADD_CONNECTION_DIALOG:
      return state
        .set('dialogShown', action.shown);
    case ACCOUNT_ID:
      return state
        .set('accountId', action.id);
    default: return state;
  }
}

export default connectionsReducer;
