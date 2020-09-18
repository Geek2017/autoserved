import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Button, Card, CardBody } from 'shards-react';

import { ICON_SERVICES } from '../../utils/constants';

const EmptyServicesList = ({ hideModal, t, toggleModal }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICON_SERVICES}
        alt="Shop Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>
          This page displays all available services for your different shops.
        </strong>
      </h4>
      <h6>
        You haven't created a service yet. Add a new service and start receiving
        requests from various customers.
      </h6>
      {!hideModal ? (
        <Button className="mt-3 mb-2" pill onClick={toggleModal}>
          Create New Service
        </Button>
      ) : null}
    </CardBody>
  </Card>
);

EmptyServicesList.defaultProps = {
  hideModal: false
};

EmptyServicesList.propTypes = {
  hideModal: PropTypes.bool,
  toggleModal: PropTypes.func
};

export default withTranslation()(EmptyServicesList);
