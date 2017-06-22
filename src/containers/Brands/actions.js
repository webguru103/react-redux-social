import {
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
} from './constants';

export function createBrandRequest(brandObject) {
  return { type: CREATE_BRAND_REQUEST, brandObject };
}

export function createBrandSuccess(payload) {
  return { type: CREATE_BRAND_SUCCESS, payload };
}

export function createBrandFailure(error) {
  return { type: CREATE_BRAND_FAILURE, error };
}

export function deleteBrandRequest(brandObject) {
  return { type: DELETE_BRAND_REQUEST, brandObject };
}

export function deleteBrandSuccess(payload) {
  return { type: DELETE_BRAND_SUCCESS, payload };
}

export function deleteBrandFailure(error) {
  return { type: DELETE_BRAND_FAILURE, error };
}
