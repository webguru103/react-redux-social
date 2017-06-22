import {
  REDEEM_TOKEN,
  REDEEM_TOKEN_SUCCESS,
  REDEEM_TOKEN_ERROR,
} from './constants';

export function redeemToken(token, apiKeyRequired = true) {
  return {
    type: REDEEM_TOKEN,
    payload: {
      token,
      apiKeyRequired,
    },
  };
}

export function redeemTokenSuccess(payload) {
  return {
    type: REDEEM_TOKEN_SUCCESS,
    payload,
  };
}

export function redeemTokenError(payload) {
  return {
    type: REDEEM_TOKEN_ERROR,
    payload,
  };
}
