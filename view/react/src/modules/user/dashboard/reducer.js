import * as t from './actionTypes';

let initialState = {};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_PROFILE_DETAILS: {
      const { profile } = action.data;
      return { ...state, profile };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
