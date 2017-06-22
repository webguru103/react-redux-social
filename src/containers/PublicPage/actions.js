import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
} from './constants';

export function fetchPostSetRequest(payload) {
  return {
    type: FETCH_POST_SET_REQUEST,
    payload,
  };
}

export function fetchPostSetSuccess(payload) {
  return {
    type: FETCH_POST_SET_SUCCESS,
    payload,
  };
}

export function fetchPostSetError(payload) {
  return {
    type: FETCH_POST_SET_ERROR,
    payload,
  };
}
