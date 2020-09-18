import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ReactPlaceholder from "react-placeholder/lib";
import { TextBlock } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container
} from "shards-react";

import { requestStatus } from "../../utils/status";
import { colors, numberFormatter } from "../../utils/helper";
import EmptyCustomerRequestsList from "./EmptyCustomerRequestsList";

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td>
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={3}
            style={{ width: 300 }}
          />
        </td>
        <td>
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 200 }}
          />
        </td>
        <td>
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={1} />
        </td>
        <td>
          <div className="d-table mx-auto">
            <Badge className="text-capitalize" pill theme="secondary">
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

const CustomerRequests = ({ events, isFetching, requests }) => {
  return isFetching || requests.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Requests Sent</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <div className="datatable datatable--plain">
            <table className="table lo-stats mb-0">
              <thead className="py-1 bg-light text-semibold border-bottom">
                <tr>
                  <th>
                    <small>Request Details</small>
                  </th>
                  <th>
                    <small>Requested Schedule(s)</small>
                  </th>
                  <th className="text-center">
                    <small>Type</small>
                  </th>
                  <th className="text-center">
                    <small>Status</small>
                  </th>
                  <th className="text-center">
                    <small>Action</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ReactPlaceholder
                  ready={!isFetching}
                  showLoadingAnimation={true}
                  customPlaceholder={<Placeholder repeat={3} />}
                >
                  {requests.map((request, index) => {
                    return (
                      <tr key={index}>
                        <td data-table-label="Request Details">
                          <Link to={`/car/${request.car.id}/schedule`}>
                            {request.car.car_year
                              ? `${request.car.car_year} - `
                              : null}
                            {request.car.car_make.name || ""}{" "}
                            {request.car.car_model.name || ""}{" "}
                            {request.car.car_trim
                              ? request.car.car_trim.name
                              : ""}
                          </Link>
                          <p className="mb-0">
                            <small>
                              Requested: {moment(request.created_at).fromNow()}
                            </small>
                          </p>
                        </td>
                        <td
                          className="text-capitalize"
                          data-table-label="Request Schedule(s)"
                        >
                          {request.preferred_schedule.map((schedule, index) => (
                            <p key={index} className="mb-0">
                              {moment(schedule.date).format(
                                "(dddd) MMM. Do, YYYY"
                              )}{" "}
                              - {schedule.time}
                            </p>
                          ))}
                        </td>
                        <td
                          className="text-center text-capitalize text-primary"
                          data-table-label="Type"
                        >
                          {request.type || "-"}
                          {request.type === "preventive"
                            ? ` - ${numberFormatter.format(
                                request.pms_request.pms.mileage
                              )}`
                            : null}
                        </td>
                        <td
                          className="text-center text-uppercase"
                          data-table-label="Status"
                        >
                          <Badge
                            theme={requestStatus[request.status]}
                            className="text-uppercase"
                          >
                            {request.status || "-"}
                          </Badge>
                        </td>
                        <td
                          className="text-center text-capitalize"
                          data-table-label="Actions"
                        >
                          {/* <Button
                            disabled
                            theme="info"
                            size="sm"
                            className="mx-2 mb-2"
                            onClick={() => {
                              events.toggleModalReopen(request.id, index);
                            }}
                          >
                            <i className="material-icons">visibility</i> View
                            Details
                          </Button> */}
                          {request.status === "open" ? (
                            <Button
                              theme="danger"
                              size="sm"
                              className="mx-2 mb-2"
                              onClick={() =>
                                events.handleCancellation(request.id, index)
                              }
                            >
                              <i className="material-icons">close</i> Cancel
                            </Button>
                          ) : (request.status === "expired" ||
                              request.status === "cancelled") &&
                            request.type === "preventive" ? (
                            <Button
                              theme="success"
                              size="sm"
                              className="mx-2 mb-2"
                              onClick={() => {
                                events.toggleModalReopen(request.id, index);
                              }}
                            >
                              <i className="material-icons">repeat</i> Request
                              Again
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </ReactPlaceholder>
              </tbody>
            </table>
          </div>
        </Container>
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyCustomerRequestsList />
  );
};

CustomerRequests.defaultProps = {
  events: {},
  requests: []
};

CustomerRequests.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool,
  requests: PropTypes.array
};

export default withTranslation()(CustomerRequests);
