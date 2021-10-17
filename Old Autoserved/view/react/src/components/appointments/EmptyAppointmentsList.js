import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, CardBody } from 'shards-react';

import { ICON_APPOINTMENTS } from '../../utils/constants';

const EmptyAppointmentsList = ({ t }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICON_APPOINTMENTS}
        alt="Garage Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>This page displays all appointments scheduled</strong>
      </h4>
      <h6>
        No appointments made yet. Start creating service requests for your car
        profiles now.
      </h6>
    </CardBody>
  </Card>
);

export default withTranslation()(EmptyAppointmentsList);
