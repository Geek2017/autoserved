import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Button, Card, CardBody } from 'shards-react';

import { ICONS_SHOP } from '../../utils/constants';

const EmptyShopsList = ({ hideModal, t, toggleModal }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICONS_SHOP}
        alt="Shop Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>This page displays all the stores under your account.</strong>
      </h4>
      <h6>
        You haven't created a shop yet. Add a new shop and reap the benefits of
        being an AutoServed partner.
      </h6>
      {!hideModal ? (
        <Button className="mt-3 mb-2" pill onClick={toggleModal}>
          Create New Shop
        </Button>
      ) : null}
    </CardBody>
  </Card>
);

EmptyShopsList.defaultProps = {
  hideModal: false
};

EmptyShopsList.propTypes = {
  hideModal: PropTypes.bool,
  toggleModal: PropTypes.func
};

export default withTranslation()(EmptyShopsList);
