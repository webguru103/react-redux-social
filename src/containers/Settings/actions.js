import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_ERROR,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
} from './constants';

export function fetchSubscriptions(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS,
    payload,
  };
}

export function fetchSubscriptionsSuccess(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS_SUCCESS,
    payload,
  };
}

export function fetchSubscriptionsError(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS_ERROR,
    payload,
  };
}

export function cancelSubscription(payload) {
  return {
    type: CANCEL_SUBSCRIPTION,
    payload,
  };
}

export function cancelSubscriptionSuccess(payload) {
  return {
    type: CANCEL_SUBSCRIPTION_SUCCESS,
    payload,
  };
}
export function cancelSubscriptionError(payload) {
  return {
    type: CANCEL_SUBSCRIPTION_ERROR,
    payload,
  };
}
