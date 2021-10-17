import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const clearPmsData = () => {
  return dispatch => {
    return new Promise(resolve => {
      dispatch({ type: t.CLEAR_PMS_DATA, data: { pmsPrices: null } });
      resolve(true);
    });
  };
};

export const getCorrectiveServices = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/services/corrective", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: services } = data;

            if (success) {
              dispatch({ type: t.GET_SERVICES, data: { services } });
              resolve(services);
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

export const getMileages = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/pms")
        .then(({ data }) => {
          const { error, success, data: mileages } = data;

          if (success) {
            dispatch({ type: t.GET_MILEAGES, data: { mileages } });
            resolve(mileages);
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

export const getOtherServices = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/pms-others")
        .then(({ data }) => {
          const { error, success, data: otherServices } = data;

          if (success) {
            dispatch({ type: t.GET_OTHER_SERVICES, data: { otherServices } });
            resolve(otherServices);
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

export const getOilTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/oil-types")
        .then(({ data }) => {
          const { error, success, data: oilTypes } = data;

          if (success) {
            dispatch({ type: t.GET_OIL_TYPES, data: { oilTypes } });
            resolve(oilTypes);
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

export const getOilTypeOptions = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/oil-types")
        .then(({ data }) => {
          const { error, success, data: oilTypeOptions } = data;

          if (success) {
            dispatch({
              type: t.GET_OIL_TYPE_OPTIONS,
              data: { oilTypeOptions }
            });
            resolve(oilTypeOptions);
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

export const getPartTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/part-types")
        .then(({ data }) => {
          const { error, success, data: partTypes } = data;

          if (success) {
            dispatch({ type: t.GET_PART_TYPES, data: { partTypes } });
            resolve(partTypes);
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

export const getPartTypeOptions = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/part-types")
        .then(({ data }) => {
          const { error, success, data: partTypeOptions } = data;

          if (success) {
            dispatch({
              type: t.GET_PART_TYPE_OPTIONS,
              data: { partTypeOptions }
            });
            resolve(partTypeOptions);
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

export const getPmsItem = mileage => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/pms", { params: { mileage } })
        .then(({ data }) => {
          const { error, success, data: pms } = data;

          if (success) {
            dispatch({ type: t.GET_PMS_ITEM, data: { pms } });
            resolve(pms);
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

export const getPmsOthersItem = type => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/pms-others", { params: { type } })
        .then(({ data }) => {
          const { error, success, data: otherService } = data;

          if (success) {
            dispatch({ type: t.GET_PMS_OTHERS_ITEM, data: { otherService } });
            resolve(otherService);
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

export const getPmsOtherPrices = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/preventive/price/others", {
            params: { id },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: otherPrices } = data;

            if (success) {
              dispatch({
                type: t.GET_SHOP_PMS_OTHER_PRICES,
                data: { otherPrices }
              });
              resolve(otherPrices);
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

export const getPmsOthersLaborPrices = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/preventive/price/labor/others", {
            params: { id },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: otherPrices } = data;

            if (success) {
              dispatch({
                type: t.GET_SHOP_PMS_OTHER_PRICES,
                data: { otherPrices }
              });
              resolve(otherPrices);
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

export const getPricedPmsData = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/services/pms/all", {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: pricedPms } = data;

            if (success) {
              dispatch({
                type: t.GET_PRICED_SHOP_PMS_DATA,
                data: { pricedPms }
              });
              resolve(pricedPms);
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

export const getPricedPmsOthersData = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/services/pms/others/all", {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: pricedPmsOthers } = data;

            if (success) {
              dispatch({
                type: t.GET_PRICED_SHOP_PMS_OTHERS_DATA,
                data: { pricedPmsOthers }
              });
              resolve(pricedPmsOthers);
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

export const getShopPmsData = mileage => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/services/pms", {
            params: { mileage },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: pmsPrices } = data;

            if (success) {
              dispatch({ type: t.GET_SHOP_PMS_DATA, data: { pmsPrices } });
              resolve(pmsPrices);
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

export const getShopPmsLaborPrice = (mileage, car_type) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/preventive/price/labor", {
            params: { mileage, car_type },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: laborPrice } = data;

            if (success) {
              dispatch({
                type: t.GET_SHOP_PMS_LABOR_PRICE,
                data: { laborPrice }
              });
              resolve(laborPrice);
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

export const getShopPmsOilPrice = (mileage, oil_type) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/preventive/price/oil", {
            params: { mileage, oil_type },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: oilPrice } = data;

            if (success) {
              dispatch({ type: t.GET_SHOP_PMS_OIL_PRICE, data: { oilPrice } });
              resolve(oilPrice);
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

export const getVehicleTypes = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/list/vehicle-types")
        .then(({ data }) => {
          const { error, success, data: vehicleTypes } = data;

          if (success) {
            dispatch({ type: t.GET_VEHICLE_TYPES, data: { vehicleTypes } });
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

export const savePmsData = (mileage, pmsData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(`/services/pms/${mileage}`, pmsData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: pmsValue } = data;

            if (success) {
              dispatch({ type: t.SAVE_PMS_DATA, data: { pmsValue } });
              resolve(pmsValue);
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

export const savePmsOthersData = pmsOthersData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post(`preventive/price/others`, pmsOthersData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({
                type: t.SAVE_PMS_OTHERS_DATA
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

export const toggleShopPms = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/shop/${id}/toggle-pms`, null, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: shop } = data;

            if (success) {
              dispatch({ type: t.TOGGLE_SHOP_PMS, data: { shop } });
              resolve(shop);
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
