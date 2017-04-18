import { fromJS } from 'immutable';

import {
  REDEEM_TOKEN,
  REDEEM_TOKEN_SUCCESS,
  REDEEM_TOKEN_ERROR,
} from './constants';

const initialState = fromJS({
  detail: {},
  error: null,
});

export default function (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case REDEEM_TOKEN:
      return state
        .set('detail', {})
        .set('error', null);
    case REDEEM_TOKEN_SUCCESS:
      return state
        .set('detail', payload)
        .set('error', null);
    case REDEEM_TOKEN_ERROR:
      return state
        .set('detail', {})
        .set('error', payload);
    default:
      return state;
  }
}
