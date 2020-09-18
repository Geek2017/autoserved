import { createStore, applyMiddleware, compose } from 'redux';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './rootReducer';

const enhancer = compose(applyMiddleware(thunk, logger));
const store = createStore(reducers, enhancer);
sessionService.initSessionService(store, {
  redirectPath: '/',
  // Change this to COOKIES
  driver: 'COOKIES'
});

export default store;
