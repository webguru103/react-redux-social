import axios from 'axios';
export const API_URL = 'https://dev.powerpost.digital';

export function errorHandler(dispatch, error, type) {
  let errorMessage = (error.data.error) ? error.data.error : error.data;
  // console.log(errorMessage);
   // NOT AUTHENTICATED ERROR
  if (error.status === 401) {
    errorMessage = 'You are not authorized to do this.';
  }

  dispatch({
    type,
    payload: errorMessage,
  });
}

// Post Request
export function postData(action, errorType, isAuthReq, url, key, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  axios.post(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, key, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};
  // console.log('data: ' + data);
  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  axios.get(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error, errorType);
  });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, key, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  axios.put(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, key, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}
