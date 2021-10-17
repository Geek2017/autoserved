import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'shards-react';

import { formatter } from '../../utils/helper';

const DashboardStats = ({ dashboard }) => {
  return (
    <Card small className="user-stats mb-4">
      <CardBody>
        <Row>
          <Col lg="4" className="text-center">
            <h4 className="m-0">{formatter.format(dashboard.credits)}</h4>
            <span className="text-light text-uppercase">Wallet Value</span>
          </Col>
          <Col lg="4" className="text-center">
            <h4 className="m-0">{dashboard.appointment_count}</h4>
            <span className="text-light text-uppercase">Appointments Made</span>
          </Col>
          <Col lg="4" className="text-center">
            <h4 className="m-0">{dashboard.request_count}</h4>
            <span className="text-light text-uppercase">Estimate Requests</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

DashboardStats.propTypes = {
  dashboard: PropTypes.object.isRequired
};

export default DashboardStats;
