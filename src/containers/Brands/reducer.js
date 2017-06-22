import { fromJS } from 'immutable';

import {
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
} from './constants';

const initialState = fromJS({
  isBrandCreated: false,
  isBrandDeleted: false,
});

function brandsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return state
        .set('isBrandCreated', false);
    case CREATE_BRAND_SUCCESS:
      return state
        .set('isBrandCreated', true);
    case CREATE_BRAND_FAILURE:
      return state
        .set('isBrandCreated', false);
    case DELETE_BRAND_REQUEST:
      return state
        .set('isBrandDeleted', false);
    case DELETE_BRAND_SUCCESS:
      return state
        .set('isBrandDeleted', true);
    case DELETE_BRAND_FAILURE:
      return state
        .set('isBrandDeleted', false);
    default: return state;
  }
}

export default brandsReducer;
