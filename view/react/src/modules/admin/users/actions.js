import * as t from './actionTypes';
import api from '../../../utils/api/api';
import headers from '../../../utils/api/api-headers';
import { userSession } from '../../../utils/helper';

export const getUsers = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/users', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: users } = data;

            if (success) {
              dispatch({ type: t.GET_USERS, data: { users } });
              resolve(users);
            } else {
              reject(error);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
};

export const resendVerification = email => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(
            '/user/verification/resend',
            { email },
            { headers: headers(api_token) }
          )
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.RESEND_VERIFICATION });
              resolve(true);
            } else {
              reject(error);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
};
