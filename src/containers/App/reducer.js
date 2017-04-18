/*
 * The reducer takes care of state changes in our app through actions
 */
 import { fromJS } from 'immutable';
 import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_ROLES,
  SET_USER,
  // CHECK_USER_OBJECT,
  CLEAR_USER,

} from './constants';

 import auth from 'utils/auth';

// The initial application state
 const initialState = fromJS({
   error: '',
   currentlySending: false,
   user: {},
   sharedAccounts: [],
   userAccount: {},
   subAccounts: [],
   loggedIn: auth.loggedIn(),
   filePickerKey: 'A6Upb4pDFTFu9uXIjmV8Oz',
 });

// Takes care of changing the application state
 function globalReducer(state = initialState, action) {
   switch (action.type) {
     case SET_AUTH:
       return state.set('loggedIn', action.newAuthState);
     case SET_USER:
       return state
        .set('user', action.user.user)
        .set('sharedAccounts', action.user.shared_accounts)
        .set('userAccount', action.user.user_own_account)
        .set('subAccounts', action.user.subaccounts);
     case SET_ROLES:
       return state.set('roles', action.roles);
     case SENDING_REQUEST:
       return state.set('currentlySending', action.sending);
     case REQUEST_ERROR:
       return state.set('error', action.error);
     case CLEAR_ERROR:
       return state.set('error', '');
     case CLEAR_USER:
       return state
        .set('user', {})
        .set('sharedAccounts', [])
        .set('userAccount', {})
        .set('subAccounts', []);
     default:
       return state;
   }
 }

 export default globalReducer;
