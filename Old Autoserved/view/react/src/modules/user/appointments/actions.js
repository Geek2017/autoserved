import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const rateShop = (id, ratingData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(`/rate/${id}/shop`, ratingData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.CANCEL_APPOINTMENT });
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

export const rateCustomer = (id, ratingData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(`/rate/${id}/customer`, ratingData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.CANCEL_APPOINTMENT });
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

export const getAppointments = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/appointments", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: appointments } = data;

            if (success) {
              dispatch({ type: t.GET_APPOINTMENTS, data: { appointments } });
              resolve(appointments);
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

export const cancelAppointment = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/appointment/${id}/cancel`, null, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.CANCEL_APPOINTMENT });
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

export const completeAppointment = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/appointment/${id}/complete`, null, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.COMPLETE_APPOINTMENT });
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

export const startAppointment = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/appointment/${id}/start`, null, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.START_APPOINTMENT });
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

export const getAppointment = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/appointment/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: appointment } = data;

            if (success) {
              dispatch({ type: t.GET_APPOINTMENT, data: { appointment } });
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

export const approveAppointment = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/appointment/${id}/approve`, null, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.APPROVE_APPOINTMENT });
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
