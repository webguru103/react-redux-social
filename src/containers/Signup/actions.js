import {
  FETCH_PLAN,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_ERROR,
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
