import { fromJS } from 'immutable';

import {
  SET_CHANNEL_FILTER,
  SET_CHANNEL_TYPE,
  SET_CONNECTIONS_LIST,
  TOGGLE_ADD_CONNECTION_DIALOG,
  SET_SOCIAL_URLS,
  SET_SUB_CALLBACK,
  SET_SUB_CHANNEL,
  SET_SUB_CHANNELS,
  CLEAR_SUB_DATA,
} from './constants';

const initialState = fromJS({
  channelFilter: '',
  channelType: '',
  dialogShown: false,
  connections: [],
  socialUrls: {},
  subCallback: false,
  subChannel: {},
  subChannels: [],
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
      return state
        .set('connections', action.connections);
    case SET_SOCIAL_URLS:
      return state
        .set('socialUrls', action.urls);
    case TOGGLE_ADD_CONNECTION_DIALOG:
      return state
        .set('dialogShown', action.shown);
    case SET_SUB_CALLBACK:
      return state
        .set('subCallback', action.sub);
    case SET_SUB_CHANNEL:
      return state
        .set('subChannel', action.subChannel);
    case SET_SUB_CHANNELS:
      return state
        .set('subChannels', action.subChannels);
    case CLEAR_SUB_DATA:
      return state
        .set('subChannels', [])
        .set('subChannel', {})
        .set('subCallback', false);
    default: return state;
  }
}

export default connectionsReducer;
