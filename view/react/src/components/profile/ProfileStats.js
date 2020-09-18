import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "shards-react";

import { formatter } from "../../utils/helper";

const ProfileStats = ({ carsCount, shopsCount, t, wallet }) => {
  return (
    <Card small className="mb-4">
      <CardBody>
        <Row>
          <Col lg="6" className="text-center">
            <h4 className="m-2 text-success font-weight-bold">
              {formatter.format(wallet ? wallet.balance : 0)}
            </h4>
            <span className="text-light text-uppercase">
              {t("translation.txtWalletValue")}
            </span>
            {shopsCount !== null && (
              <p className="mb-0">
                <Link to="/top-up">
                  <small>Top Up Wallet</small>
                </Link>
              </p>
            )}
          </Col>
          {shopsCount !== null ? (
            <Col lg="6" className="text-center">
              <h4 className="m-2 text-primary font-weight-bold">
                {shopsCount}
              </h4>
              <span className="text-light text-uppercase">
                {t("translation.txtShopsOwned")}
              </span>
            </Col>
          ) : null}
          {carsCount !== null ? (
            <Col lg="6" className="text-center">
              <h4 className="m-2 text-primary font-weight-bold">{carsCount}</h4>
              <span className="text-light text-uppercase">
                {t("translation.txtCarsOwned")}
              </span>
            </Col>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  );
};

ProfileStats.defaultProps = {
  carsCount: null,
  shopsCount: null
};

ProfileStats.propTypes = {
  carsCount: PropTypes.number,
  shopsCount: PropTypes.number,
  wallet: PropTypes.object
};

export default withTranslation()(ProfileStats);
