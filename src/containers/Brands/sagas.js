
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { toastr } from 'lib/react-redux-toastr';

import {
    postData, putData,
} from 'utils/request';

import {
  createBrandSuccess,
  createBrandFailure,
  deleteBrandSuccess,
  deleteBrandFailure,
} from './actions';

import {
  CREATE_BRAND_REQUEST,
  DELETE_BRAND_REQUEST,
} from './constants';

// create Brand (subaccount)
export function* createBrand(action) {
  const { account_id, display_name, thumbnail_image_key, color } = action.brandObject;

  const data = {
    payload: {
      account_id,
      display_name,
      properties: {
        thumbnail_image_key,
        color,
      },
    },
  };

    // const params = serialize(data);
  const requestUrl = '/account_api/subaccount';

  try {
    const response = yield call(postData, requestUrl, data);
    const { data: payload } = response;

    if (response.data.status === 'success') {
      toastr.success('Success!', 'A new brand has been added');
      yield put(createBrandSuccess(payload));
    } else {
      toastr.error(response.message);
    }
  } catch (error) {
    toastr.error(error.message);
    yield put(createBrandFailure(error));
  }
}

// delete brand (subaccount)

export function* deleteBrand(action) {
  const { account_id } = action.brandObject;

  const data = {
    payload: {
      account_id,
      status: 0,
    } };

  const requestUrl = '/account_api/account';

  try {
    const response = yield call(putData, requestUrl, data, true);

    if (response.data.status === 'success') {
      toastr.success('Success!', 'Deleted Brand');

      yield put(deleteBrandSuccess({ deleteBrandID: account_id }));
    } else {
      toastr.error('Error!', response.data.message);
    }
  } catch (error) {
    yield put(deleteBrandFailure(error));
  }
}

export function* createBrandWatcher() {
  const watcher = yield takeLatest(CREATE_BRAND_REQUEST, createBrand);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteBrandWatcher() {
  const watcher = yield takeLatest(DELETE_BRAND_REQUEST, deleteBrand);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  createBrandWatcher,
  deleteBrandWatcher,
];
