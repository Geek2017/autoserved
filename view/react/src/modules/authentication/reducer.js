import * as t from "./actionTypes";

let initialState = {
  customer: null,
  email: null,
  fleet: null,
  shop: null,
  user: null,
  app: null
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_APP_DATA: {
      const { app } = action.data;
      return { ...state, app };
    }
    case t.CHECK_LOGIN_STATUS:
    case t.LOGIN:
    case t.LOGOUT: {
      const { user } = action.data;
      return { ...state, user };
    }
    case t.FORGOT_PASSWORD:
    case t.RESET_PASSWORD: {
      const { email } = action.data;
      return { ...state, email };
    }
    case t.REGISTER_SHOP: {
      const { shop } = action.data;
      return { ...state, shop };
    }
    case t.VALIDATE_FLEET: {
      const { fleet } = action.data;
      return { ...state, fleet };
    }
    case t.REGISTER_CUSTOMER: {
      const { customer } = action.data;
      return { ...state, customer };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
