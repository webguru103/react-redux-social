import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    payload: {
      email,
    },
  };
}

export function forgotPasswordSuccess(payload) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  };
}

export function forgotPasswordError(payload) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload,
  };
}
