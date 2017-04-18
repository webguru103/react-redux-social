import { fromJS } from 'immutable';

import {
  FETCH_PLAN,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_ERROR,
} from './constants';

const initialState = fromJS({
  plan: {
    detail: {},
    error: null,
  },
});

export default function singupReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_PLAN:
      return state.set('plan', {
        detail: {},
        error: null,
      });
    case FETCH_PLAN_SUCCESS:
      return state.set('plan', {
        detail: payload,
        error: null,
      });
    case FETCH_PLAN_ERROR:
      return state.set('plan', {
        detail: {},
        error: payload,
      });
    default:
      return state;
  }
}
