import * as t from "./actionTypes";

let initialState = {
  menuVisible: false,
  visibleDropDownItem: null,
  notifications: [],
  allNotifications: [],
  firstTimeLogin: true
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.TOGGLE_SIDEBAR_MENU: {
      const { menuVisible } = action.data;
      return { ...state, menuVisible };
    }
    case t.TOGGLE_DROPDOWN_MENU: {
      const { visibleDropDownItem } = action.data;
      return { ...state, visibleDropDownItem };
    }
    case t.GET_IN_APP_NOTIFICATIONS: {
      const { notifications } = action.data;
      return { ...state, notifications };
    }
    case t.GET_ALL_APP_NOTIFICATIONS: {
      const { allNotifications } = action.data;
      return { ...state, allNotifications };
    }
    case t.SET_FIRST_TIME_LOGIN: {
      const { firstTimeLogin } = action.data;
      return { ...state, firstTimeLogin };
    }
    default:
      return state;
  }
};

export default menuReducer;
