import React from "react";
import moment from "moment";
import {} from "moment-timer";
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

import { colors, numberFormatter } from "../../utils/helper";
import EmptyPendingRequestsList from "./EmptyPendingRequestsList";

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td className="text-center">
          <Badge outline theme="dark" pill>
            -
          </Badge>
        </td>
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
        <td />
      </tr>
    );
    repeat--;
  }

  return component;
};

const PendingRequests = ({ events, isFetching, requests, timers }) => {
  return isFetching || requests.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Open Requests</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th className="text-center">
                  <small>Remaining Time</small>
                </th>
                <th>
                  <small>Request Details</small>
                </th>
                <th>
                  <small>Requested Schedule</small>
                </th>
                <th className="text-center">
                  <small>Type</small>
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
                  let hours = Math.floor(timers[index] / 60 / 60) || 0;
                  let minutes = Math.floor((timers[index] / 60) % 60) || 0;
                  let seconds = Math.floor(timers[index]) % 60 || 0;
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <Badge outline theme="dark" pill>
                          {hours === 0 || `${hours} hrs`} {minutes} min{" "}
                          {hours > 0 || `${seconds} sec`}
                        </Badge>
                      </td>
                      <td>
                        {request.type === "preventive" ? (
                          <h6>
                            PMS Service:{" "}
                            <Link
                              className="font-weight-bold text-primary"
                              to={`/services/preventive/mileage-${request.pms_request.pms.mileage}`}
                            >
                              {numberFormatter.format(
                                request.pms_request.pms.mileage
                              )}{" "}
                              km
                            </Link>
                          </h6>
                        ) : request.type === "other services" ? (
                          <h6>
                            Other Services:{" "}
                            <span className="font-weight-bold text-primary text-capitalize">
                              {request.pms_others_request.pms_others.name}
                            </span>
                          </h6>
                        ) : null}
                        <p className="text-primary mb-0">
                          {request.car.car_year
                            ? `${request.car.car_year} - `
                            : null}
                          {request.car.car_make.name || ""}{" "}
                          {request.car.car_model.name || ""}{" "}
                          {request.car.car_trim
                            ? request.car.car_trim.name
                            : ""}
                        </p>
                        <p className="mb-0">
                          <small>
                            Requested by:{" "}
                            <strong>
                              {request.car.user.fname}{" "}
                              {request.car.user.lname.charAt(0)}.
                            </strong>{" "}
                            {moment(request.created_at).fromNow()}
                          </small>
                        </p>
                      </td>
                      <td className="text-capitalize">
                        {request.preferred_schedule.map((schedule, index) => (
                          <p key={index} className="mb-0">
                            {moment(schedule.date).format(
                              "(dddd) MMM. Do, YYYY"
                            )}{" "}
                            - {schedule.time}
                          </p>
                        ))}
                      </td>
                      <td className="text-center text-capitalize text-primary">
                        {request.type || "-"}
                      </td>
                      <td className="text-center text-capitalize">
                        <Button
                          theme="success"
                          size="sm"
                          className="mx-2"
                          disabled={request.disabled}
                          onClick={() =>
                            events.toggleModalCreation(request.id, index)
                          }
                        >
                          <i className="material-icons">check</i> Create
                          Estimate
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
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyPendingRequestsList />
  );
};

PendingRequests.defaultProps = {
  events: {},
  requests: [],
  timers: []
};

PendingRequests.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool,
  requests: PropTypes.array,
  timers: PropTypes.array
};

export default withTranslation()(PendingRequests);
