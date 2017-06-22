import { fromJS } from 'immutable';

import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
} from './constants';

const initialState = fromJS({
  postSet: {
    isFetching: false,
    error: null,
    details: {},
  },
});

function publicPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_SET_REQUEST:
      return state
        .set('postSet', fromJS({
          isFetching: true,
          error: null,
          details: {},
        }));
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case FETCH_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: action.payload,
          details: {},
        }));
    default:
      return state;
  }
}

export default publicPageReducer;
