// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { take, call, put, race, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import auth from 'utils/auth';
import { set } from 'utils/localStorage';
import { makeSelectUser } from './selectors';
import { toastr } from 'lib/react-redux-toastr';

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  UPDATE_REQUEST,
  SET_AUTH,
  LOGOUT,
  REQUEST_ERROR,
  SET_USER,
  // SET_ROLES,
  CHECK_USER_OBJECT,
  CLEAR_USER,
} from './constants';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize({ name, email, password, properties, isRegistering }) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
   // let salt = genSalt(username);
   // let hash = hashSync(password, salt);
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, name, email, password, properties);
    } else {
      response = yield call(auth.login, email, password);
    }
    return response;
  } catch (error) {
    console.log('hi');
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorizeUpdate(data) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    // let salt = genSalt(username);
    // let hash = hashSync(password, salt);
    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!

    const responseUser = yield call(auth.updateUser, data);
    const responseAccount = yield call(auth.updateAccount, data);
    if (responseUser && responseAccount) {
      return true;
    }
    return responseUser || responseAccount;
  } catch (error) {
    console.log('hi');
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout);
    yield put({ type: SENDING_REQUEST, sending: false });
    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
    return error.message;
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(LOGIN_REQUEST);
    const { email, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, { email, password, isRegistering: false }),
      logout: take(LOGOUT),
    });
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
      yield put({ type: SET_USER, user: winner.auth });
      yield call(forwardTo, '/'); // Go to dashboard page
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put({ type: SET_AUTH, newAuthState: false }); // User is not logged in (not authorized)
      yield call(logout); // Call `logout` effect
      yield call(forwardTo, '/login'); // Go to root page
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT);
    yield put({ type: SET_AUTH, newAuthState: false });

    yield call(logout);
    yield put({ type: CLEAR_USER });

    yield call(forwardTo, '/login');

    toastr.success('Success!', 'You are now logged out.');
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {
  while (true) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(REGISTER_REQUEST);
    const { name, password, email, properties } = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not

    try {
      yield call(authorize, { name, email, password, properties, isRegistering: true });
      yield call(set, 'signup', { name, email });
      yield forwardTo('/signup/verification');
    } catch (error) {
      console.err(error);
    }
  }
}

/**
 * Update saga
 * Very similar to register saga!
 */
export function* updateFlow() {
  while (true) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(UPDATE_REQUEST);
    const data = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorizeUpdate, data);

    // If we could register a user, we send the appropiate actions
    if (wasSuccessful) {
      toastr.success('Success!', 'User setting is updated.');
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
      forwardTo('/dashboard'); // Go to dashboard page
    }
  }
}

export function* userExistsFlow() {
  while (true) {
    yield take(CHECK_USER_OBJECT);
    const user = yield select(makeSelectUser());
    if (!user.user_id) {
      const currentUser = yield call(auth.getCurrentUser);
      yield put({ type: SET_USER, user: currentUser });
    }
  }
}
// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default [
  loginFlow,
  logoutFlow,
  registerFlow,
  updateFlow,
  userExistsFlow,
];

// Little helper function to abstract going to different pages
export function* forwardTo(location) {
  yield call(browserHistory.push, location);
}

