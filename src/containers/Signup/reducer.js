import { fromJS } from 'immutable';

import {
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_ERROR,
} from './constants';

const initialState = fromJS({
  plan: {
    details: {},
    error: null,
  },
});

export default function singupReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_PLAN_SUCCESS:
      return state.set('plan', {
        details: payload,
        error: null,
      });
    case FETCH_PLAN_ERROR:
      return state.set('plan', {
        details: {},
        error: payload,
      });
    default:
      return state;
  }
}
