import * as t from "./actionTypes";
import api from "../../../utils/api/api";

export const getCarMakes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/car-makes")
        .then(({ data }) => {
          const { error, success, data: makes } = data;

          if (success) {
            dispatch({ type: t.GET_CAR_MAKES, data: { makes } });
            resolve(makes);
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

export const getCarModels = make_id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/car-models", { params: { make_id } })
        .then(({ data }) => {
          const { error, success, data: models } = data;

          if (success) {
            dispatch({ type: t.GET_CAR_MODELS, data: { models } });
            resolve(models);
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

export const getCarTrims = (model_id, year) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/car-trims", { params: { model_id, year } })
        .then(({ data }) => {
          const { error, success, data: trims } = data;

          if (success) {
            dispatch({ type: t.GET_CAR_TRIMS, data: { trims } });
            resolve(trims);
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

export const getCarYears = model_id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/car-years", { params: { model_id } })
        .then(({ data }) => {
          const { error, success, data: years } = data;

          if (success) {
            dispatch({ type: t.GET_CAR_YEARS, data: { years } });
            resolve(years);
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
