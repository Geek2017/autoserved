import * as t from './actionTypes';

let initialState = { estimate: null, requests: [], timeOptions: [] };

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_ESTIMATE: {
      const { estimate } = action.data;
      return { ...state, estimate };
    }
    case t.GET_REQUEST_DETAILS: {
      const { request } = action.data;
      return { ...state, request };
    }
    case t.GET_REQUESTS: {
      const { requests } = action.data;
      return { ...state, requests };
    }
    case t.GET_SCHEDULE_TIME_OPTIONS: {
      const { timeOptions } = action.data;
      return { ...state, timeOptions };
    }
    default:
      return state;
  }
};

export default requestsReducer;
