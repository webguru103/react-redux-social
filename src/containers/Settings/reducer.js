import { fromJS } from 'immutable';

import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_ERROR,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
} from './constants';

const initialState = fromJS({
  subscriptions: {},
  cancellingSubscription: {},
});

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return state
        .set('subscriptions', {
          details: payload,
          error: null,
        });
    case FETCH_SUBSCRIPTIONS_ERROR:
      return state
        .set('subscriptions', {
          details: null,
          error: payload,
        });
    case CANCEL_SUBSCRIPTION_SUCCESS:
      return state
        .set('cancellingSubscription', {
          details: action.payload,
          error: null,
        })
        .set('subscriptions', {
          details: null,
          error: null,
        });
    case CANCEL_SUBSCRIPTION_ERROR:
      return state
        .set('cancellingSubscription', {
          details: null,
          error: action.payload,
        });
    default:
      return state;
  }
}
