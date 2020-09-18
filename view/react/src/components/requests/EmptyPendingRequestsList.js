import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, CardBody } from 'shards-react';

import { ICONS_REQUEST } from '../../utils/constants';

const EmptyPendingRequestsList = ({ t }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICONS_REQUEST}
        alt="Garage Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>This page displays all open requests by customers.</strong>
      </h4>
      <h6>
        No requests as of the moment. Come back after a few hours to start
        receiving requests from customers.
      </h6>
    </CardBody>
  </Card>
);

export default withTranslation()(EmptyPendingRequestsList);
