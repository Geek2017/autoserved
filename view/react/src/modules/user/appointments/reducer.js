import * as t from "./actionTypes";

let initialState = { appointment: null, appointments: [] };

const estimatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_APPOINTMENTS: {
      const { appointments } = action.data;
      return { ...state, appointments };
    }
    case t.GET_APPOINTMENT: {
      const { appointment } = action.data;
      return { ...state, appointment };
    }
    default:
      return state;
  }
};

export default estimatesReducer;
