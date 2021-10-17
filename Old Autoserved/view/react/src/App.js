import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import routes from "./routes";
import store from "./redux/store";
import i18n from "./utils/localization/i18n";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    component={withTracker(props => {
      return store.getState().sessionReducer.authenticated === true ? (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    })}
  />
);

export default () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          {routes.map((route, index) => {
            return route.protected === true ? (
              <ProtectedRoute
                key={index}
                path={route.path}
                exact={true}
                layout={route.layout}
                component={route.component}
              />
            ) : (
              <Route
                key={index}
                path={route.path}
                exact={true}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  </I18nextProvider>
);
