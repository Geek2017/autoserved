import * as t from './actionTypes';

let initialState = { details: null, logs: [], wallet: null, transactions: [] };

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_ACCOUNT_ACTIVITIES: {
      const { logs } = action.data;
      return { ...state, logs };
    }
    case t.GET_ACCOUNT_DETAILS: {
      const { details } = action.data;
      return { ...state, details };
    }
    case t.GET_WALLET: {
      const { wallet } = action.data;
      return { ...state, wallet };
    }
    case t.GET_TRANSACTIONS: {
      const { transactions } = action.data;
      return { ...state, transactions };
    }
    default:
      return state;
  }
};

export default profilesReducer;
