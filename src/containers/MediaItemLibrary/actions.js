import { FETCH_COLLECTIONS } from './constants';

export function fetchCollections(accountId) {
  return {
    type: FETCH_COLLECTIONS,
    accountId,
  };
}
