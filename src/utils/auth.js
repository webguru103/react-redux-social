import axios from 'axios';
import cookie from 'react-cookie';
export const API_URL = 'https://dev2.powerpost.digital';

const auth = {
  /**
   * Logs a user in returning a promise with 'true' when done
   */
  login(email, password) {
    // if already logged in return promise
    if (auth.loggedIn()) {
      return Promise.resolve(true);
    }
    console.log('in login');
    const data = {
      payload: { email, password },
    };
    const url = `${API_URL}/user_api/login`;
    // post request
    return axios.post(url, data)
      .then((response) => {
        cookie.save('token', response.data.api_key, { path: '/' });
        return response.data;
      })
      .catch((error) => Promise.reject(error.response));
  },
  /**
   * Get User
   */
  getCurrentUser() {
    const headers = { headers: { 'X-API-KEY': cookie.load('token') } };
    return axios.get(`${API_URL}/user_api/roles`, headers)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  },
  /**
   * Logs the user out
   */
  logout() {
    const headers = { headers: { 'X-API-KEY': cookie.load('token') } };
    return axios.get(`${API_URL}/user_api/logout`, headers)
      .then(() => {
        cookie.remove('token', { path: '/' });
        return Promise.resolve(true);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   *
   * Checks if user is logged in
   */
  loggedIn() {
    return !!cookie.load('token');
  },

  /**
   * Registers a user then logs them in
   *
   */
  register(name, email, password, properties, token) {
    const data = {
      payload: {
        display_name: name,
        password,
        email,
        properties,
        token,
      },
    };

    const url = `${API_URL}/account_api/create`;
    return axios.post(url, data)
      .then((response) => {
        console.log(`response:${response}`);
        // auth.login(email, password);
        return response.data;
      })
      .catch((error) => Promise.reject(error.response));
  },

  /**
   * Update a account object
   *
   */
  updateOwnAccount(data) {
    const accountData = {
      payload: {
        title: data.title,
        properties: {
          phone_number: data.phoneNumber,
        },
      },
    };

    const headers = { headers: { 'X-API-KEY': cookie.load('token') } };
    const url = `${API_URL}/account_api/account/${data.accountID}`;
    return axios.put(url, accountData, headers)
      .then((response) => {
        console.log(`response:${response}`);
        return response.data;
      })
      .catch((error) => Promise.reject(error.response));
  },

  /**
   * Update a user object
   *
   */
  updateUser(data) {
    const userData = {
      payload: {
        display_name: data.name,
        password: data.newPW || '*****',
        email: data.email,
        properties: {
          thumbnail_image_key: data.avatarKey,
          color: data.color,
          timezone_id: data.timeZone,
          receive_notifications: data.emailNotifications,
        },
      },
    };

    const headers = { headers: { 'X-API-KEY': cookie.load('token') } };
    const url = `${API_URL}/user_api/user`;
    return axios.put(url, userData, headers)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => Promise.reject(error.response));
  },
};

export default auth;
