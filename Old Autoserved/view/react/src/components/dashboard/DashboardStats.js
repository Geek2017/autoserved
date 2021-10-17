import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'shards-react';

import { formatter } from '../../utils/helper';
import {
  USER_TYPE_VENDOR,
  USER_TYPE_CUSTOMER,
  USER_TYPE_FLEET_ADMIN
} from '../../utils/constants';

const DashboardStats = ({ statOne, statTwo, t, userType, wallet }) => {
  return (
    <Card small className="mb-4">
      <CardBody>
        <Row>
          <Col lg="4" className="text-center">
            <h4 className="m-2 text-success font-weight-bold">
              {formatter.format(wallet ? wallet.balance : 0)}
            </h4>
            <span className="text-light text-uppercase">
              {t('translation.txtWalletValue')}
            </span>
          </Col>
          <Col lg="4" className="text-center">
            <h4 className="m-2 text-primary font-weight-bold">{statOne}</h4>
            <span className="text-light text-uppercase">
              {userType === USER_TYPE_VENDOR
                ? 'Upcoming Appointments'
                : userType === USER_TYPE_CUSTOMER
                ? 'Appointments Made'
                : userType === USER_TYPE_FLEET_ADMIN
                ? 'Members'
                : 'Users'}
            </span>
          </Col>
          <Col lg="4" className="text-center">
            <h4 className="m-2 text-primary font-weight-bold">{statTwo}</h4>
            <span className="text-light text-uppercase">
              {userType === USER_TYPE_VENDOR
                ? 'Pending Request Estimates'
                : userType === USER_TYPE_CUSTOMER
                ? 'Requests Sent'
                : userType === USER_TYPE_FLEET_ADMIN
                ? 'Car Profiles'
                : 'Vendors'}
            </span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

DashboardStats.propTypes = {
  statOne: PropTypes.number,
  statTwo: PropTypes.number,
  userType: PropTypes.string,
  wallet: PropTypes.object
};

export default withTranslation()(DashboardStats);
