import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const createShop = shopData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { shopName: name, mobileNumber: contact } = shopData;
        const { api_token } = user;
        api
          .post("/shop", { name, contact }, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: shop } = data;

            if (success) {
              dispatch({ type: t.CREATE_SHOP, data: { shop } });
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

export const getShopDetails = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get(`/shop/${id}`, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: shop } = data;

            if (success) {
              dispatch({ type: t.GET_SHOP_DETAILS, data: { shop } });
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

export const getShops = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/shops", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: shops } = data;

            if (success) {
              dispatch({ type: t.GET_SHOPS, data: { shops } });
              resolve(shops);
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

export const getPmsEnabledShops = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/shops/pms", { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: pmsShops } = data;

            if (success) {
              dispatch({ type: t.GET_PMS_ENABLED_SHOPS, data: { pmsShops } });
              resolve(pmsShops);
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

export const updateApplication = (id, applicationData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/application/${id}`, applicationData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: application } = data;

            if (success) {
              dispatch({
                type: t.UPDATE_APPLICATION,
                data: { application }
              });
              resolve(application);
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

export const updateShop = (slug, shopData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/shop/${slug}`, shopData, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: shop } = data;

            if (success) {
              dispatch({ type: t.UPDATE_SHOP, data: { shop } });
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

export const verifyRequirement = (id, type) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .put(`/application/${id}/verify`, null, {
            headers: headers(api_token),
            params: { type }
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({ type: t.VERIFY });
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

export const uploadFile = (path, id, file) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);
        api
          .post(`/shop/${path}`, formData, { headers: headers(api_token) })
          .then(({ data }) => {
            const { error, success, data: file } = data;

            if (success) {
              dispatch({ type: t.UPLOAD, data: { file } });
              resolve(file);
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
