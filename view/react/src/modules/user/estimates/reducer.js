import * as t from './actionTypes';

let initialState = { appointment: null, estimates: [] };

const estimatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_APPOINTMENT: {
      const { appointment } = action.data;
      return { ...state, appointment };
    }
    case t.GET_ESTIMATE_DETAILS: {
      const { estimate } = action.data;
      return { ...state, estimate };
    }
    case t.GET_ESTIMATES: {
      const { estimates } = action.data;
      return { ...state, estimates };
    }
    default:
      return state;
  }
};

export default estimatesReducer;
