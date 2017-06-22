/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import {
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    TOGGLE_MENU,
    IS_LOADING_ACCOUNT,
    SET_CONNECTIONS_LIST,
} from './constants';

import {
  VALIDATE_CONNECTIONS_SUCCESS,
} from '../Settings/Connections/constants';

// The initial application state
const initialState = fromJS({
  menuCollapsed: false,
  activeBrand: {
    account_id: false,
    user_id: false,
    title: false,
    creation_time: false,
    status: 0,
    account_type_id: 0,
    properties: {},
    subscriptions: [{}],
    account_access: {
      permissions: [],
    },
    user_access: {
      permissions: [],
    },
    user_access_level: false,
    subAccounts: [],
    connections: [{}],
    color: false,
  },
  isFetchingAccount: true,
  fetchingError: false,
  parentAccount: {},
});

// Takes care of changing the application state
function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING_ACCOUNT:
      return state
            .set('isFetchingAccount', true)
            .set('fetchingError', false);
    case FETCH_ACCOUNT_SUCCESS:
      return state
            .set('isFetchingAccount', false)
            .set('fetchingError', false)
            .setIn(['activeBrand', 'user_access', 'permissions'], Object.values(action.account.data.account.user_access.permissions))
            .setIn(['activeBrand', 'num_users'], action.account.data.account.account_access.num_users)
            .setIn(['activeBrand', 'account_id'], action.account.data.account.account_id)
            .setIn(['activeBrand', 'user_id'], action.account.data.account.user_id)
            .setIn(['activeBrand', 'title'], action.account.data.account.title)
            .setIn(['activeBrand', 'creation_time'], action.account.data.account.creation_time)
            .setIn(['activeBrand', 'status'], action.account.data.account.status)
            .setIn(['activeBrand', 'account_type_id'], action.account.data.account.account_type_id)
            .setIn(['activeBrand', 'properties'], action.account.data.account.properties)
            .setIn(['activeBrand', 'subscriptions'], action.account.data.account.subscriptions)
            .setIn(['activeBrand', 'account_access', 'permissions'], action.account.data.account.account_access.permissions)
            .setIn(['activeBrand', 'user_access_level'], action.account.data.account.user_access_level)
            .setIn(['activeBrand', 'subAccounts'], action.account.data.account.subaccounts)
            .setIn(['activeBrand', 'connections'], action.account.data.account.connections)
            .setIn(['activeBrand', 'parentAccount'], action.account.data.account.parent_account);
    case FETCH_ACCOUNT_ERROR:
      return state
            .set('isFetchingAccount', false)
            .set('fetchingError', action.account.data.error);
    case TOGGLE_MENU:
      return state
            .set('menuCollapsed', action.collapsed);
    case SET_CONNECTIONS_LIST:
      return state
            .setIn(['activeBrand', 'connections'], action.connections);
    case VALIDATE_CONNECTIONS_SUCCESS:
      return state
        .setIn(['activeBrand', 'connections'], action.connections);
    default:
      return state;
  }
}

export default dashboardReducer;
