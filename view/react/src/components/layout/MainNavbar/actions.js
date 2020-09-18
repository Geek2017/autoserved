import * as t from "./actionTypes";
import api from "../../../utils/api/api";
import headers from "../../../utils/api/api-headers";
import { userSession } from "../../../utils/helper";

export const setFirstTimeLogin = firstTimeLogin => {
  return dispatch => {
    return new Promise(() => {
      dispatch({
        type: t.SET_FIRST_TIME_LOGIN,
        data: { firstTimeLogin }
      });
    });
  };
};

export const toggleSidebar = menuVisible => {
  return dispatch => {
    return new Promise(() => {
      dispatch({
        type: t.TOGGLE_SIDEBAR_MENU,
        data: {
          menuVisible
        }
      });
    });
  };
};

export const toggleDropDownItem = visibleDropDownItem => {
  return dispatch => {
    return new Promise(() => {
      dispatch({
        type: t.TOGGLE_DROPDOWN_MENU,
        data: {
          visibleDropDownItem
        }
      });
    });
  };
};

export const getNotifications = page => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/account/notifications", {
            params: { page },
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: notifications } = data;

            if (success) {
              dispatch({
                type: t.GET_IN_APP_NOTIFICATIONS,
                data: { notifications }
              });
              resolve(notifications);
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

export const getAllNotifications = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/account/notifications/all", {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success, data: allNotifications } = data;

            if (success) {
              dispatch({
                type: t.GET_ALL_APP_NOTIFICATIONS,
                data: { allNotifications }
              });
              resolve(allNotifications);
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

export const readAllNotifications = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .get("/account/notifications/read", {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({
                type: t.READ_ALL_APP_NOTIFICATIONS
              });
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
