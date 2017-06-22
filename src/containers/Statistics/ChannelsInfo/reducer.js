import { fromJS } from 'immutable';

import {
    IS_LOADING_CHANNEL,
    FETCH_CHANNEL,
    FETCH_CHANNEL_SUCCESS,
    FETCH_CHANNEL_ERR,
    IS_WEEKLY_ANALYTICS,
    IS_MONTHLY_ANALYTICS,
} from './constants';

const initialState = fromJS({
  channelId: '',
  activeChannel: {},
  isFetchingChannel: true,
  isFetchingErr: false,
  isWeeklyInfo: true,
});

function channelsReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING_CHANNEL:
      return state
            .set('isFetchingChannel', true)
            .set('isFetchingErr', false);
    case FETCH_CHANNEL:
      return state
            .set('channelId', action.channelId);
    case FETCH_CHANNEL_SUCCESS:
      return state
            .set('isFetchingChannel', false)
            .set('isFetchingErr', false)
            .set('activeChannel', fromJS(action.channelInfo));
    case FETCH_CHANNEL_ERR:
      return state
            .set('isFetchingChannel', false)
            .set('isFetchingErr', action.error);
    case IS_WEEKLY_ANALYTICS:
      return state
            .set('isWeeklyInfo', true);
    case IS_MONTHLY_ANALYTICS:
      return state
            .set('isWeeklyInfo', false);
    default:
      return state;
  }
}

export default channelsReducer;
