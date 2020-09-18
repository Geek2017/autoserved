import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const createCarProfile = carData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post("/car", carData, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: car } = data;

            if (success) {
              dispatch({
                type: t.CREATE_CAR,
                data: { car }
              });
              resolve(car);
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

export const createCarSchedules = carId => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(`/car/${carId}/schedule`, {}, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({
                type: t.CREATE_CAR_SCHEDULES
              });
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

export const deleteCarProfile = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .delete(`/car/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: car } = data;

            if (success) {
              dispatch({
                type: t.DELETE_CAR_PROFILE,
                data: { car }
              });
              resolve(car);
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

export const editCarProfile = (id, carData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/car/${id}`, carData, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.EDIT_CAR_PROFILE });
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

export const getCarDetails = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/car/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: car } = data;

            if (success) {
              dispatch({
                type: t.GET_CAR_DETAILS,
                data: { car }
              });
              resolve(car);
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

export const getRepairHistory = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/repair-history/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: history } = data;

            if (success) {
              dispatch({
                type: t.GET_REPAIR_HISTORY,
                data: { history }
              });
              resolve(history);
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

export const getCarSchedules = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/car/${id}/schedules`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: schedules } = data;

            if (success) {
              dispatch({ type: t.GET_CAR_SCHEDULES, data: { schedules } });
              resolve(schedules);
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

export const getCarSchedule = (carId, pmsId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/car/${carId}/schedule/${pmsId}`, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: schedule } = data;

            if (success) {
              dispatch({ type: t.GET_CAR_SCHEDULE, data: { schedule } });
              resolve(schedule);
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

export const getCars = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/cars", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: cars } = data;

            if (success) {
              dispatch({ type: t.GET_CARS, data: { cars } });
              resolve(cars);
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

export const getEngineTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/engine-types")
        .then(({ data }) => {
          const { error, success, data: engineTypes } = data;

          if (success) {
            dispatch({ type: t.GET_ENGINE_TYPES, data: { engineTypes } });
            resolve(engineTypes);
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

export const getTransmissionTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/transmission-types")
        .then(({ data }) => {
          const { error, success, data: transmissionTypes } = data;

          if (success) {
            dispatch({
              type: t.GET_TRANSMISSION_TYPES,
              data: { transmissionTypes }
            });
            resolve(transmissionTypes);
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

export const getVehicleTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/vehicle-types")
        .then(({ data }) => {
          const { error, success, data: vehicleTypes } = data;

          if (success) {
            dispatch({
              type: t.GET_VEHICLE_TYPES,
              data: { vehicleTypes }
            });
            resolve(vehicleTypes);
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

export const requestPms = requestPmsData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post("/preventive/request", requestPmsData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: request } = data;

            if (success) {
              dispatch({ type: t.REQUEST_PMS, data: { request } });
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

export const requestPmsOther = requestData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post("/preventive-others/request", requestData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: request } = data;

            if (success) {
              dispatch({ type: t.REQUEST_PMS_OTHER, data: { request } });
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
