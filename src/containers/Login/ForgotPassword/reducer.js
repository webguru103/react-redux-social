import { fromJS } from 'immutable';

import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  details: {},
  error: null,
});

export default function forgotPasswordReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FORGOT_PASSWORD:
      return state.set('fetching', true);
    case FORGOT_PASSWORD_SUCCESS:
      return state.set('fetching', false)
        .set('details', payload)
        .set('error', null);
    case FORGOT_PASSWORD_ERROR:
      return state.set('fetching', false)
        .set('details', null)
        .set('error', payload);
    default:
      return state;
  }
}
