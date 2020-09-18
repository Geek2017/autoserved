import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";

import dashboardFooter from "../../utils/menu/dashboard-footer";
import { APP_VERSION } from "../../utils/constants";

const MainFooter = ({ contained, t }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {dashboardFooter(t).map((item, idx) => (
            <NavItem key={idx}>
              <NavLink target="__blank" href={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">
          {t("txtCopyright")} - <small>Platform v{APP_VERSION}</small>
        </span>
      </Row>
    </Container>
  </footer>
);

MainFooter.defaultProps = {
  contained: false
};

MainFooter.propTypes = {
  contained: PropTypes.bool
};

export default withTranslation()(MainFooter);
