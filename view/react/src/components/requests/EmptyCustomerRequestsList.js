import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, CardBody } from 'shards-react';

import { ICONS_REQUEST } from '../../utils/constants';

const EmptyCustomerRequestsList = ({ t }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICONS_REQUEST}
        alt="Garage Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>
          This page displays all requested services for your cars.
        </strong>
      </h4>
      <h6>
        You have no requests. Go to 'Car Profiles' to create your first request.
      </h6>
    </CardBody>
  </Card>
);

export default withTranslation()(EmptyCustomerRequestsList);
