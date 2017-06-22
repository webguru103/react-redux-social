import { fromJS } from 'immutable';

import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  details: {},
  error: null,
});

export default function resetPasswordReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case RESET_PASSWORD:
      return state.set('fetching', true);
    case RESET_PASSWORD_SUCCESS:
      return state.set('fetching', false)
        .set('details', payload)
        .set('error', null);
    case RESET_PASSWORD_ERROR:
      return state.set('fetching', false)
        .set('details', null)
        .set('error', payload);
    default:
      return state;
  }
}
