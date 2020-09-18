import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Col, Card, CardBody, CardFooter, CardHeader, Row } from 'shards-react';

const PmsDetails = ({ pms }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">PMS Service - Details</h6>
    </CardHeader>
    <CardBody className="px-4">
      <Row>
        <Col lg="6">
          <strong>Check</strong>
          <ul className="mt-3">
            {pms.check_items.map((item, index) => (
              <li key={index}>
                <small>{item}</small>
              </li>
            ))}
          </ul>
        </Col>
        <Col lg="6">
          <Row>
            <Col lg="12">
              <strong>Clean</strong>
              <ul className="mt-3">
                {pms.clean_items.map((item, index) => (
                  <li key={index}>
                    <small>{item}</small>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <strong>Change</strong>
              <ul className="mt-3">
                {pms.change_items.map((item, index) => (
                  <li key={index}>
                    <small>{item}</small>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
    <CardFooter />
  </Card>
);

PmsDetails.propTypes = {
  pms: PropTypes.object.isRequired
};

export default withTranslation()(PmsDetails);
