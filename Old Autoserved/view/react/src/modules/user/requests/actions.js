import * as t from './actionTypes';
import api from '../../../utils/api/api';
import headers from '../../../utils/api/api-headers';
import { userSession } from '../../../utils/helper';

export const cancelRequest = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/request/${id}/cancel`, null, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: request } = data;

            if (success) {
              dispatch({ type: t.CANCEL_REQUEST, data: { request } });
              resolve(request);
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

export const createEstimate = estimateData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(
            '/estimate',
            { ...estimateData },
            { headers: headers(api_token) }
          )
          .then(({ data }) => {
            const { error, success, data: estimate } = data;

            if (success) {
              dispatch({ type: t.CREATE_ESTIMATE, data: { estimate } });
              resolve(estimate);
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

export const getRequests = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get('/requests', { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: requests } = data;

            if (success) {
              dispatch({ type: t.GET_REQUESTS, data: { requests } });
              resolve(requests);
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

export const getRequestDetails = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/request/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: request } = data;

            if (success) {
              dispatch({ type: t.GET_REQUEST_DETAILS, data: { request } });
              resolve(request);
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

export const getScheduleTime = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get('/list/time')
        .then(({ data }) => {
          const { error, success, data: timeOptions } = data;

          if (success) {
            dispatch({
              type: t.GET_SCHEDULE_TIME_OPTIONS,
              data: { timeOptions }
            });
            resolve(timeOptions);
          } else {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};
