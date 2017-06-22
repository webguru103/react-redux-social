import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export function resetPassword(payload) {
  return {
    type: RESET_PASSWORD,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
}

export function resetPasswordError(payload) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload,
  };
}
