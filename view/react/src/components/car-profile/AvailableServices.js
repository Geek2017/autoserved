import React from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import { TextRow } from 'react-placeholder/lib/placeholders';
import { Button, Card, CardBody, CardHeader, Container } from 'shards-react';

import { colors } from '../../utils/helper';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td colSpan={3}>
          <TextRow color={colors.PLACEHOLDER_COLOR} />
        </td>
      </tr>
    );
    repeat--;
  }

  return component;
};

const AvailableServices = ({ events, isFetching, services }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">Available Services</h6>
      <small>You can request these services anytime.</small>
    </CardHeader>
    <CardBody className="p-0">
      <Container fluid className="px-0 pb-4">
        <table className="table lo-stats mb-0">
          <thead className="py-1 bg-light text-semibold border-bottom">
            <tr>
              <th className="text-center">
                <small>Service Name</small>
              </th>
              <th className="text-center">
                <small>Actions</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <ReactPlaceholder
              ready={!isFetching}
              showLoadingAnimation={true}
              customPlaceholder={<Placeholder repeat={3} />}
            >
              {services.map((service, index) => {
                return (
                  <tr key={index}>
                    <td className="font-weight-bold text-primary text-center text-capitalize">
                      {service.name}
                    </td>
                    <td className="text-center">
                      <Button
                        className="mx-2"
                        size="sm"
                        theme="success"
                        title="Request Service"
                        onClick={() => events.toggleModalRequest(service.type)}
                      >
                        <i className="material-icons">build</i> Request Service
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </ReactPlaceholder>
          </tbody>
        </table>
      </Container>
    </CardBody>
  </Card>
);

AvailableServices.defaultProps = {
  events: {}
};

AvailableServices.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool
};

export default AvailableServices;
