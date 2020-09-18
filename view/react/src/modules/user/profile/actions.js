import * as t from './actionTypes';
import api from '../../../utils/api/api';
import headers from '../../../utils/api/api-headers';
import { userSession } from '../../../utils/helper';

export const changePassword = passwordData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post('/password/change', passwordData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: result } = data;

            if (success) {
              dispatch({ type: t.CHANGE_PASSWORD });
              resolve(result);
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

export const getAccountActivities = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/account/activities', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: logs } = data;

            if (success) {
              dispatch({ type: t.GET_ACCOUNT_ACTIVITIES, data: { logs } });
              resolve(logs);
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

export const getAccountDetails = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/account', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: details } = data;

            if (success) {
              dispatch({ type: t.GET_ACCOUNT_DETAILS, data: { details } });
              resolve(details);
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

export const getWallet = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/account/wallet', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: wallet } = data;

            if (success) {
              dispatch({ type: t.GET_WALLET, data: { wallet } });
              resolve(wallet);
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

export const getTransactions = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/account/transactions', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: transactions } = data;

            if (success) {
              dispatch({ type: t.GET_TRANSACTIONS, data: { transactions } });
              resolve(transactions);
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

export const topUp = amount => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post('/wallet/top-up', { amount }, { headers: headers(api_token) })
          .then(({ data }) => {
            const {
              error,
              success,
              data: { url }
            } = data;

            if (success) {
              dispatch({ type: t.TOP_UP });
              resolve(url);
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

export const validateTopUp = params => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/wallet/payment/status', {
            params,
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.VALIDATE_TOP_UP });
              resolve(success);
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
