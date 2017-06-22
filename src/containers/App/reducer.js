/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import { find, remove } from 'lodash';
import auth from 'utils/auth';

import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_ROLES,
  SET_USER,
  // CHECK_USER_OBJECT,
  CLEAR_USER,
  CREATE_PAYMENT_SOURCE,
  CREATE_PAYMENT_SOURCE_SUCCESS,
  CREATE_PAYMENT_SOURCE_ERROR,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_ERROR,
  POST_SUBSCRIPTION,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_ERROR,
  FETCH_CURRENT_PLAN,
  FETCH_CURRENT_PLAN_SUCCESS,
  FETCH_CURRENT_PLAN_ERROR,
  FETCH_PAYMENT_SOURCES_SUCCESS,
  FETCH_PAYMENT_SOURCES_ERROR,
  FETCH_PAYMENT_HISTORY_SUCCESS,
  FETCH_PAYMENT_HISTORY_ERROR,
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_POST_SETS_BY_ST_SUCCESS,
  FETCH_POST_SETS_BY_ST_FAILURE,
  FETCH_GROUP_USERS,
  FETCH_GROUP_USERS_SUCCESS,
  FETCH_GROUP_USERS_ERROR,
  INVITE_EMAIL_TO_GROUP,
  INVITE_EMAIL_TO_GROUP_SUCCESS,
  INVITE_EMAIL_TO_GROUP_ERROR,
  ADD_USER_TO_GROUP,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
  SET_POST_SETS,
  DELETE_POST_SET_SUCCESS,
  CHANGE_POST_SET_STATUS,
  FETCH_POSTS,
  SET_POSTS,
  // UPDATE_POST_SUCCESS,
  // UPDATE_POST_SET_SUCCESS,
  SET_CONNECTIONS,
  CREATE_POST_SET_SUCCESS,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
} from './constants';

// The initial application state
const initialState = fromJS({
  error: '',
  currentlySending: false,
  user: {},
  sharedAccounts: [],
  userAccount: null,
  subAccounts: [],
  loggedIn: auth.loggedIn(),
  filePickerKey: 'A6Upb4pDFTFu9uXIjmV8Oz',
  creatingPaymentSource: {},
  coupon: {},
  subscription: {},
  currentPlan: {},
  paymentSources: {},
  paymentHistory: {},
  groupUsers: {},
  inviteEmailToGroup: {},
  postSets: [],
  postSetsByST: {
    requesting: true, // As soon as calendar view mounts, it starts loading. Maybe change later..
    error: null,
    data: null,
  },
  mediaItmes: [],
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
    case CREATE_PAYMENT_SOURCE:
      return state
        .set('creatingPaymentSource', {
          fetching: true,
        });
    case CREATE_PAYMENT_SOURCE_SUCCESS:
      return state
        .set('creatingPaymentSource', {
          fetching: false,
          details: action.payload,
          error: null,
        })
        .set('paymentSources', {
          details: action.payload,
        });
    case CREATE_PAYMENT_SOURCE_ERROR:
      return state
        .set('creatingPaymentSource', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    case APPLY_COUPON_SUCCESS:
      return state
        .set('coupon', {
          details: action.payload,
          error: null,
        });
    case APPLY_COUPON_ERROR:
      return state
        .set('coupon', {
          details: null,
          error: action.payload,
        });
    case POST_SUBSCRIPTION:
      return state
        .set('subscription', {
          fetching: true,
        });
    case POST_SUBSCRIPTION_SUCCESS:
      return state
        .set('subscription', {
          fetching: false,
          details: action.payload,
          error: null,
        });
    case POST_SUBSCRIPTION_ERROR:
      return state
        .set('subscription', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    case FETCH_CURRENT_PLAN:
      return state
        .set('currentPlan', {
          fetching: true,
        });
    case FETCH_CURRENT_PLAN_SUCCESS:
      return state
        .set('currentPlan', {
          fetching: false,
          details: action.payload,
          error: null,
        });
    case FETCH_CURRENT_PLAN_ERROR:
      return state
        .set('currentPlan', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    case FETCH_PAYMENT_SOURCES_SUCCESS:
      return state
        .set('paymentSources', {
          details: action.payload,
          error: null,
        });
    case FETCH_PAYMENT_SOURCES_ERROR:
      return state
        .set('paymentSources', {
          details: null,
          error: action.payload,
        });
    case FETCH_PAYMENT_HISTORY_SUCCESS:
      return state
        .set('paymentHistory', {
          details: action.payload,
          error: null,
        });
    case FETCH_PAYMENT_HISTORY_ERROR:
      return state
        .set('paymentHistory', {
          details: null,
          error: action.payload,
        });
    case FETCH_POST_SETS_BY_ST_REQUEST:
      return state.setIn(['postSetsByST', 'requesting'], true);
    case FETCH_POST_SETS_BY_ST_SUCCESS:
      return state.set('postSetsByST', fromJS({
        requesting: false,
        error: null,
        data: action.postSets,
      }));
    case FETCH_POST_SETS_BY_ST_FAILURE:
      return state.set('postSetsByST', fromJS({
        requesting: false,
        error: action.error,
        data: null,
      }));
    case FETCH_GROUP_USERS:
      return state
        .set('groupUsers', {
          isFetching: true,
          details: null,
          error: null,
        });
    case FETCH_GROUP_USERS_SUCCESS:
      return state
        .set('groupUsers', {
          isFetching: false,
          details: action.payload,
          error: null,
        });
    case FETCH_GROUP_USERS_ERROR:
      return state
        .set('groupUsers', {
          isFetching: false,
          details: null,
          error: action.payload,
        });
    case INVITE_EMAIL_TO_GROUP:
      return state
        .set('inviteEmailToGroup', {
          isFetching: true,
        });
    case INVITE_EMAIL_TO_GROUP_SUCCESS:
      return state
        .set('inviteEmailToGroup', {
          isFetching: false,
          details: action.payload,
          error: null,
        });
    case INVITE_EMAIL_TO_GROUP_ERROR:
      return state
        .set('inviteEmailToGroup', {
          isFetching: false,
          details: null,
          error: action.payload,
        });
    case ADD_USER_TO_GROUP:
    case REMOVE_USER_FROM_GROUP: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = true;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case ADD_USER_TO_GROUP_SUCCESS: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      user.group_id = action.payload.group_id;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case ADD_USER_TO_GROUP_ERROR: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case REMOVE_USER_FROM_GROUP_SUCCESS: {
      const groupUsers = state.get('groupUsers');
      remove(groupUsers.details.groups_users, (groupUser) => groupUser.user_id === action.payload.user_id);
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case REMOVE_USER_FROM_GROUP_ERROR: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case SET_POST_SETS:
      return state
        .set('postSets', fromJS(action.postSets));
    case DELETE_POST_SET_SUCCESS: {
      return state
        .updateIn(
          ['postSetsByST', 'data', 'unscheduled_post_sets'],
          (postSets) => postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['postSetsByST', 'data', 'scheduled_post_sets'],
          (postSets) => postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['postSetsByST', 'data', 'post_when_ready_post_sets'],
          (postSets) => postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(['postSets'], (postSets) => postSets.filter((postSet) => postSet.get('post_set_id') !== action.id));
    }
    case CHANGE_POST_SET_STATUS:
      return state
        .updateIn(['postSets'], (postSets) => postSets.map((postSet) =>
          postSet.get('post_set_id') !== action.id ? postSet : postSet.set('status', action.status)
        ));
    case FETCH_POSTS:
      return state.set('posts', []);
    case SET_POSTS:
      return state.set('posts', action.posts);
    // case UPDATE_POST_SUCCESS: {
    //   const index = state.get('posts').findIndex((post) => post.post.post_id === action.post.post_id);
    //   return (index > -1) ?
    //     state.update('posts', (posts) => {
    //       const reducedPosts = [...posts];
    //       reducedPosts[index].post = action.post;
    //       return reducedPosts;
    //     })
    //   :
    //     state;
    // }
    // case UPDATE_POST_SET_SUCCESS: {
    //   // TODO: Do this for unscheduled_post_sets, post_when_ready_post_sets and state.get('postSets')
    //   const scheduledPostSets = state.getIn(['postSetsByST', 'data', 'scheduled_post_sets']);
    //   const index = scheduledPostSets.findIndex((postSet) => postSet.get('post_set_id') === action.payload.post_set_id);
    //   return (index > -1) ?
    //     state.updateIn(['postSetsByST', 'data', 'scheduled_post_sets', index], (postSet) => (fromJS({
    //       ...action.payload,
    //       schedule_time: postSet.get('schedule_time'),
    //     })))
    //     : state;
    // }
    case SET_CONNECTIONS:
      return state.set('connections', action.connections);
    case CREATE_POST_SET_SUCCESS:
      return state.set('post_set', {
        ...action.postSet,
        createSuccess: true,
      }).set('post_edit', action.edit);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state.set('mediaItems', fromJS(action.mediaItems.data.collection.media_items.filter((t) => t.status !== '0')));
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
        .set('error', action.mediaItems.data.message);
    default:
      return state;
  }
}

export default globalReducer;
