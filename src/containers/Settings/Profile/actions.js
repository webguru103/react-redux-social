import {
  UPDATE_ACCOUNT_PROFILE,
} from './constants';

export function updateAccount(data) {
  return { type: UPDATE_ACCOUNT_PROFILE, data };
}
