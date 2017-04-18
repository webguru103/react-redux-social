import axios from 'axios';
import cookie from 'react-cookie';
export const API_URL = 'https://dev2.powerpost.digital';

// Post Request
export function postData(url, data, isAuthReq=true) {
  const requestUrl = API_URL + url;
  let headers = {};
  let key = cookie.load('token');

  if(isAuthReq) {
    headers = {headers: {'X-API-KEY': key}};
  }

  return axios.post(requestUrl, data, headers);
}

// Get Request
export function getData(url, isAuthReq=true ) {
  const requestUrl = API_URL + url;
  let headers = {};
  let key = cookie.load('token');

  if(isAuthReq) {
    headers = {headers: {'X-API-KEY': key}};
  }
  
  return axios.get(requestUrl, headers);
}

// Put Request
export function putData(url, data, isAuthReq=true ) {
  const requestUrl = API_URL + url;
  let headers = {};
  let key = cookie.load('token');
  console.log(data);
  if(isAuthReq) {
    headers = {headers: {'X-API-KEY': key }};
  }

  return axios.put(requestUrl, data, headers);
}

// Delete Request
export function deleteData(url, isAuthReq) {
  const requestUrl = API_URL + url;
  let headers = {};
  let key = cookie.load('token');
  if(isAuthReq) {
    headers = {headers: {'X-API-KEY': key }};
  }

  return axios.delete(requestUrl, headers);
}