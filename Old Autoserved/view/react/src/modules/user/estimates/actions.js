import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const createAppointment = (car_id, estimate_id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(
            "/appointment",
            { car_id, estimate_id },
            { headers: headers(api_token) }
          )
          .then(({ data }) => {
            const { error, success, data: appointment } = data;

            if (success) {
              dispatch({ type: t.CREATE_APPOINTMENT, data: { appointment } });
              resolve(appointment);
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

export const cancelEstimates = estimate_id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/estimate/${estimate_id}/cancel`, null, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.CANCEL_ESTIMATE });
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

export const getEstimates = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/estimates", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: estimates } = data;

            if (success) {
              dispatch({ type: t.GET_ESTIMATES, data: { estimates } });
              resolve(estimates);
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

export const getEstimateDetails = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/estimate/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: estimate } = data;

            if (success) {
              dispatch({
                type: t.GET_ESTIMATE_DETAILS,
                data: { estimate }
              });
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
