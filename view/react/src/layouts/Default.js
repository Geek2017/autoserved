import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Alert, Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { actions as authActions } from "../modules/authentication";
import { APP_VERSION } from "../utils/constants";
import cn from "classnames";

const { checkLoginStatus, getAppData } = authActions;

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      const { getAppData } = this.props;
      getAppData().catch(error => console.log(error));
    }
  };

  componentDidUpdate = () => {
    const { checkLoginStatus } = this.props;
    checkLoginStatus().catch(error => console.log(error));
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render = () => {
    const BCP = "autoserved-dashboard";
    const { app, children, noSidebar, noLogo, noNavbar, noFooter } = this.props;
    const pagekey = this.props.location.pathname
      .replace(":", "")
      .replace("/", "-");
    const pageClass = `${BCP}-page-${pagekey}`;
    return (
      <Container
        fluid
        className={cn(`${BCP} ${pageClass} ${BCP}--default`, {
          [`${BCP}--no-logo `]: noLogo,
          [`${BCP}--no-navbar `]: noNavbar,
          [`${BCP}--no-footer `]: noFooter
        })}
      >
        {app && app.version !== APP_VERSION && (
          <Alert
            style={{
              left: 0,
              right: 0,
              zIndex: 2000,
              cursor: "pointer"
            }}
            fade
            theme="warning"
            className="position-absolute rounded m-5 text-center"
            onClick={() => window.location.reload(true)}
          >
            Hey! You are not using the latest version of the AutoServed
            Platform. Click here to refresh.
          </Alert>
        )}
        <Row>
          {!noSidebar && <MainSidebar />}
          <Col
            className="main-content autoserved-dashboard__main-content"
            lg={noSidebar ? { size: 12 } : { size: 10, offset: 2 }}
            md={noSidebar ? { size: 12 } : { size: 9, offset: 3 }}
            sm="12"
            tag="main"
          >
            {!noNavbar && <MainNavbar noLogo={noLogo} />}
            <div className="autoserved-dashboard__main-content__children">
              {children}
            </div>
            {!noFooter && <MainFooter />}
          </Col>
        </Row>
      </Container>
    );
  };
}

DefaultLayout.defaultProps = {
  noFooter: false,
  noLogo: true,
  noNavbar: false,
  noSidebar: false
};

DefaultLayout.propTypes = {
  noFooter: PropTypes.bool,
  noLogo: PropTypes.bool,
  noNavbar: PropTypes.bool,
  noSidebar: PropTypes.bool
};

const mapStateToProps = state => ({
  app: state.authenticationReducer.app,
  authenticated: state.sessionReducer.authenticated,
  user: state.sessionReducer.user
});

export default withRouter(
  connect(mapStateToProps, { checkLoginStatus, getAppData })(DefaultLayout)
);
