import * as t from './actionTypes';

let initialState = { users: [] };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_USERS: {
      const { users } = action.data;
      return { ...state, users };
    }
    default:
      return state;
  }
};

export default usersReducer;
