import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, CardBody } from 'shards-react';

import { ICONS_ESTIMATE } from '../../utils/constants';

const EmptyEstimateQuotes = ({ t, toggleModal }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICONS_ESTIMATE}
        alt="Garage Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>This page displays all submitted estimates by the shops</strong>
      </h4>
      <h6>
        No estimations as of the moment. Come back after a few hours to start
        receiving estimates from shops.
      </h6>
    </CardBody>
  </Card>
);

export default withTranslation()(EmptyEstimateQuotes);
