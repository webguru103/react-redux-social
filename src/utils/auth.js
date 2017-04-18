import axios from 'axios';
export const API_URL = 'https://dev2.powerpost.digital';
import cookie from 'react-cookie';

let auth = {
    /**
     * Logs a user in returning a promise with 'true' when done
     */
     login(email, password) {
        // if already logged in return promise
        if(auth.loggedIn()) {
            return Promise.resolve(true);
        }
        console.log('in login');
        const data = {
            payload: {
                email: email,
                password: password
            }
        };
        const url = API_URL + '/user_api/login'; 
        // post request
        return axios.post(url, data)
            .then(response => {
                cookie.save('token', response.data.api_key, { path: '/' });
                
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
         
     },
     /**
      * Get User
      */
     getCurrentUser() {
         const headers = { headers: {'X-API-KEY': cookie.load('token') }};
         return axios.get(API_URL + '/user_api/roles', headers)
            .then(response => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
     },
     /**
      * Logs the user out
      */
     logout() {

          const headers = { headers:{'X-API-KEY': cookie.load('token') }};
          
          return axios.get(API_URL + '/user_api/logout', headers)
            .then(response => {
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
     register(name, email, password, properties) {
        const data = {
            payload: {
                display_name: name,
                password: password,
                email: email,
                properties,
            },
        };
        
        const url = API_URL + '/account_api/create';
        return axios.post(url, data)
            .then(response => {
                console.log('response:' + response);
                auth.login(email, password);
            })
            .catch((error) => {
                console.log(error.response);
            });
     },
     
     /**
      * Update a account object
      * 
      */
     updateAccount(data) {
        const account_data = {
            payload:{
              title: data.title,
              properties:{
                 thumbnail_image_key: data.avatarKey,
                 phone_number: data.phoneNumber
              }
            }
        };
        
        const headers = { headers:{'X-API-KEY': cookie.load('token') }};
        const url = API_URL + `/account_api/account/${data.accountID}`;
        return axios.put(url, account_data, headers)
            .then(response => {
                console.log('response:' + response);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
     },
     
     /**
      * Update a user object
      * 
      */
     updateUser(data) {
        const user_data = {
            payload:{
                display_name: data.name,
                password: data.newPW || "*****",
                email: data.email,
                properties:{
                    thumbnail_image_key: data.avatarKey,
                    timezone_id: data.timeZone,
                    receive_notifications: data.emailNotifications
                }
            }
        };
        
        const headers = { headers:{'X-API-KEY': cookie.load('token') }};
        const url = API_URL + '/user_api/user';
        return axios.put(url, user_data, headers)
            .then(response => {
                console.log('response:' + response);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
     }
};

export default auth;