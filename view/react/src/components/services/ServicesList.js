import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock } from 'react-placeholder/lib/placeholders';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Tooltip
} from 'shards-react';

import EmptyServicesList from './EmptyServicesList';
import { colors, formatter } from '../../utils/helper';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td className="text-left">
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 200 }}
            className="mb-2"
          />
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 100 }}
          />
        </td>
        <td className="text-center">
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 300 }}
          />
        </td>
        <td className="lo-stats__total text-center text-capitalize">
          <div className="d-table mx-auto">
            <Badge className="text-capitalize" outline pill theme="secondary">
              -
            </Badge>
          </div>
        </td>
        <td />
      </tr>
    );
    repeat--;
  }

  return component;
};

const ServicesList = ({ isFetching, services, t, toggleModal }) => {
  const [toolTips, setToolTip] = useState([]);
  return isFetching || services.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Corrective Services</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th className="text-left">
                  <small>Service Name</small>
                </th>
                <th className="text-center">
                  <small>Pricing</small>
                </th>
                <th className="text-center">
                  <small>Shops</small>
                </th>
                <th className="text-center">
                  <small>{t('common.tblColActions')}</small>
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
                  toolTips[index] = {
                    manage: toolTips[index] ? toolTips[index].manage : false,
                    edit: toolTips[index] ? toolTips[index].edit : false,
                    delete: toolTips[index] ? toolTips[index].delete : false
                  };
                  return (
                    <tr key={index}>
                      <td className="text-left">
                        <p className="mb-0 text-primary">
                          {service.corrective_service.name}
                        </p>
                        <small className="mb-0 text-muted">
                          {service.corrective_service.type}
                        </small>
                      </td>
                      <td className="text-center text-success">
                        <p className="mb-0">
                          {formatter.format(service.min_price)} -{' '}
                          {formatter.format(service.max_price)}
                        </p>
                      </td>
                      <td className="text-center">
                        <Badge
                          className="text-capitalize"
                          outline
                          pill
                          theme="secondary"
                        >
                          -
                        </Badge>
                      </td>
                      <td className="lo-stats__total text-center text-capitalize">
                        <Button
                          id={`btnManageService-${index}`}
                          className="btn btn-success btn-sm text-white mx-2"
                        >
                          <i className="material-icons">add</i>
                        </Button>
                        <Tooltip
                          target={`#btnManageService-${index}`}
                          open={toolTips[index].manage}
                          toggle={() => {
                            const newToolTips = [...toolTips];
                            newToolTips[index].manage = !newToolTips[index]
                              .manage;
                            setToolTip(newToolTips);
                          }}
                        >
                          Assign Shops
                        </Tooltip>
                        <Button
                          id={`btnEditService-${index}`}
                          className="btn btn-warning btn-sm text-white mx-2"
                        >
                          <i className="material-icons">edit</i>
                        </Button>
                        <Tooltip
                          target={`#btnEditService-${index}`}
                          open={toolTips[index].edit}
                          toggle={() => {
                            const newToolTips = [...toolTips];
                            newToolTips[index].edit = !newToolTips[index].edit;
                            setToolTip(newToolTips);
                          }}
                        >
                          Edit Service Details
                        </Tooltip>
                        <Button
                          id={`btnDeleteService-${index}`}
                          className="btn btn-danger btn-sm text-white mx-2"
                        >
                          <i className="material-icons">delete</i>
                        </Button>
                        <Tooltip
                          target={`#btnDeleteService-${index}`}
                          open={toolTips[index].delete}
                          toggle={() => {
                            const newToolTips = [...toolTips];
                            newToolTips[index].delete = !newToolTips[index]
                              .delete;
                            setToolTip(newToolTips);
                          }}
                        >
                          Delete Service
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </ReactPlaceholder>
            </tbody>
          </table>
        </Container>
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyServicesList toggleModal={toggleModal} />
  );
};
ServicesList.defaultProps = {
  services: []
};

ServicesList.propTypes = {
  isFetching: PropTypes.bool,
  services: PropTypes.array,
  toggleModal: PropTypes.func
};

export default withTranslation()(ServicesList);
