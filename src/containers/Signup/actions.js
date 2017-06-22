import {
  FETCH_PLAN,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_ERROR,
  RESEND_ACTIVATION_EMAIL,
  RESEND_ACTIVATION_EMAIL_SUCCESS,
} from './constants';

export function fetchPlan(planId) {
  return {
    type: FETCH_PLAN,
    payload: {
      planId,
    },
  };
}

export function fetchPlanSuccess(payload) {
  return {
    type: FETCH_PLAN_SUCCESS,
    payload,
  };
}

export function fetchPlanError(payload) {
  return {
    type: FETCH_PLAN_ERROR,
    payload,
  };
}

export function resendActivationEmail(payload) {
  return {
    type: RESEND_ACTIVATION_EMAIL,
    payload,
  };
}

export function resendActivationEmailSuccess(payload) {
  return {
    type: RESEND_ACTIVATION_EMAIL_SUCCESS,
    payload,
  };
}
