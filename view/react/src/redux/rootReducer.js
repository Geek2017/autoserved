import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import * as t from '../modules/authentication/actionTypes';

// Public
import { reducer as authenticationReducer } from '../modules/authentication';
import { reducer as menuReducer } from '../components/layout/MainNavbar';

// Global
import { reducer as profilesReducer } from '../modules/user/profile';
import { reducer as requestsReducer } from '../modules/user/requests';
import { reducer as estimatesReducer } from '../modules/user/estimates';
import { reducer as appointmentsReducer } from '../modules/user/appointments';

// Vendors
import { reducer as servicesReducer } from '../modules/vendor/services';
import { reducer as shopsReducer } from '../modules/vendor/shops';
import { reducer as usersReducer } from '../modules/admin/users';

// Customers
import { reducer as carProfilesReducer } from '../modules/customer/car-profiles';
import { reducer as estimateWizardReducer } from '../modules/customer/estimate-wizard';

const appReducer = combineReducers({
  sessionReducer,
  authenticationReducer,
  estimatesReducer,
  servicesReducer,
  shopsReducer,
  profilesReducer,
  carProfilesReducer,
  requestsReducer,
  estimateWizardReducer,
  appointmentsReducer,
  menuReducer,
  usersReducer
});

const rootReducer = (state, action) => {
  if (action.type === t.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
