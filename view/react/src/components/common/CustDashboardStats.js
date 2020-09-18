import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'shards-react';

import { formatter } from '../../utils/helper';

const CustDashboardStats = ({ dashboard, smallStats }) => {

  return (
    <Card small className="user-stats mb-4">
      <CardBody>
        <Row>
          <Col lg="4" md="4" sm="4" className="text-center">
            <h4 className="m-0">{ formatter.format(dashboard.credits) }</h4>
            <span className="text-light text-uppercase">Wallet Value</span>
          </Col>
          <Col lg="4" md="4" sm="4" className="text-center">
            <h4 className="m-0">{ dashboard.appointment_count }</h4>
            <span className="text-light text-uppercase">Appointments Made</span>
          </Col>
          <Col lg="4" md="4" sm="4" className="text-center">
            <h4 className="m-0">{ dashboard.estimate_count }</h4>
            <span className="text-light text-uppercase">Estimates for Approval</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

CustDashboardStats.propTypes = {
  dashboard: PropTypes.object.isRequired,
  smallStats: PropTypes.array
};

export default CustDashboardStats;
