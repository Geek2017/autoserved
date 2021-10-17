import moment from "moment";
import { sessionService } from "redux-react-session";

import * as t from "./actionTypes";
import api from "../../utils/api/api";
import headers from "../../utils/api/api-headers";
import { REMEMBER_ME_TOKEN_DAYS_VALIDITY } from "../../utils/constants";
import { userSession } from "../../utils/helper";

export const getAppData = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .get("/app/version", { headers: headers() })
        .then(({ data }) => {
          const { error, success, data: app } = data;

          if (success) {
            dispatch({
              type: t.GET_APP_DATA,
              data: { app }
            });
            resolve(app);
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

export const checkLoginStatus = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        dispatch({
          type: t.CHECK_LOGIN_STATUS,
          data: { user }
        });
        resolve(user);
      })
        .then(session => {
          if (session) {
            const { rememberMe, dateLastLoggedIn } = session;

            if (!rememberMe) {
              const lastLoggedIn = moment(dateLastLoggedIn);

              if (
                lastLoggedIn.diff(new Date(), "days") >=
                REMEMBER_ME_TOKEN_DAYS_VALIDITY
              ) {
                reject(true);
              }
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const forgotPassword = email => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/password/forgot", { email })
        .then(({ data }) => {
          const { error, success, data: email } = data;

          if (success) {
            dispatch({ type: t.FORGOT_PASSWORD, data: { email } });
            resolve(email);
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

export const login = credentials => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const { email, password, rememberMe, token } = credentials;
      api
        .post(
          "/login",
          { email, password, rememberMe, token },
          { headers: headers() }
        )
        .then(({ data }) => {
          const { error, success, data: user } = data;

          if (success) {
            // Save session data into storage driver
            sessionService
              .saveSession({ rememberMe, dateLastLoggedIn: new Date() })
              .then(() => {
                // Save user data into storage driver
                sessionService
                  .saveUser(user)
                  .then(() => {
                    // Save user data into state
                    dispatch({
                      type: t.LOGIN,
                      data: { user }
                    });
                    resolve(user);
                  })
                  .catch(error => {
                    reject(error);
                  });
              })
              .catch(error => {
                reject(error);
              });
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

export const logout = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // Remove session data from local storage
      sessionService
        .deleteSession()
        .then(() => {
          // Remove user data from local storage
          sessionService
            .deleteUser()
            .then(() => {
              // Clear user state
              dispatch({
                type: t.LOGOUT,
                data: { user: null }
              });
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const validateFleet = fleetCredentials => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/validate-fleet", fleetCredentials, { headers: headers() })
        .then(({ data }) => {
          const { error, success, data: fleet } = data;

          if (success) {
            dispatch({
              type: t.VALIDATE_FLEET,
              data: { fleet }
            });
            resolve(fleet);
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

export const registerCustomer = customerData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/register/user", customerData, { headers: headers() })
        .then(({ data }) => {
          const { error, success, data: customer } = data;

          if (success) {
            dispatch({
              type: t.REGISTER_CUSTOMER,
              data: { customer }
            });
            resolve(customer);
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

export const registerFleet = fleetData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/register/fleet", fleetData, { headers: headers() })
        .then(({ data }) => {
          const { error, success, data: fleet } = data;

          if (success) {
            dispatch({
              type: t.REGISTER_FLEET,
            });
            resolve(fleet);
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

export const registerFleetMember = memberData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userSession(user => {
        const { api_token } = user;
        api
          .post("/register/fleet-member", memberData, {
            headers: headers(api_token)
          })
          .then(({ data }) => {
            const { error, success } = data;

            if (success) {
              dispatch({
                type: t.REGISTER_FLEET_MEMBER
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

export const registerShop = shopData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/register/shop", shopData, { headers: headers() })
        .then(({ data }) => {
          const { error, success, data: shop } = data;

          if (success) {
            dispatch({
              type: t.REGISTER_SHOP,
              data: { shop }
            });
            resolve(shop);
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

export const resetPassword = resetData => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api
        .post("/password/reset", resetData)
        .then(({ data }) => {
          const { error, success, data: email } = data;

          if (success) {
            dispatch({ type: t.RESET_PASSWORD, data: { email } });
            resolve(email);
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
