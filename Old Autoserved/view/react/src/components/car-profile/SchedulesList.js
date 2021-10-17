import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { TextRow } from "react-placeholder/lib/placeholders";
import { Button, Card, CardBody, CardHeader, Container } from "shards-react";

import { colors, numberFormatter } from "../../utils/helper";

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

const SchedulesList = ({ events, isFetching, schedules }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">List of Schedules</h6>
      <small>
        You can only make requests if the expected schedule is less than a year.
      </small>
    </CardHeader>
    <CardBody className="p-0">
      <Container fluid className="px-0 pb-4">
        <table className="table lo-stats mb-0">
          <thead className="py-1 bg-light text-semibold border-bottom">
            <tr>
              <th className="text-center">
                <small>Mileage</small>
              </th>
              <th className="text-center">
                <small>Date</small>
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
              {schedules[0] && schedules[0].pms.mileage === 5000 ? (
                <tr>
                  <td className="font-weight-bold text-primary text-center">
                    &lt; 5,000 km
                  </td>
                  <td className="text-center">-</td>
                  <td className="text-center">
                    <Button
                      className="mx-2"
                      disabled
                      size="sm"
                      theme="primary"
                      title="Request PMS"
                    >
                      <i className="material-icons">thumb_up</i> We highly
                      recommend visiting your authorized dealership
                    </Button>
                  </td>
                </tr>
              ) : null}
              {schedules.map((schedule, index) => {
                return moment(schedule.schedule) <= moment().add(1, "y") ? (
                  <tr key={index}>
                    <td className="font-weight-bold text-primary text-center">
                      {numberFormatter.format(schedule.pms.mileage)} km
                    </td>
                    <td className="text-center">
                      <span className="font-weight-bold">
                        {moment(schedule.schedule).format("MMM. Do, YYYY")}
                      </span>
                      <p className="mb-0 text-muted">
                        Approximately{" "}
                        {moment(schedule.schedule)
                          .endOf()
                          .fromNow()}
                      </p>
                    </td>
                    <td className="text-center">
                      <Button
                        className="mx-2"
                        disabled={
                          schedule.is_requested ||
                          moment(schedule.schedule) > moment().add(1, "y")
                        }
                        size="sm"
                        theme={schedule.is_requested ? "secondary" : "success"}
                        title="Request PMS"
                        onClick={() => events.toggleModalRequest(index)}
                      >
                        <i className="material-icons">
                          {schedule.is_requested ? "done" : "build"}
                        </i>{" "}
                        {schedule.is_requested ? "Requested" : "Request PMS"}
                      </Button>
                    </td>
                  </tr>
                ) : null;
              })}
            </ReactPlaceholder>
          </tbody>
        </table>
      </Container>
    </CardBody>
  </Card>
);

SchedulesList.defaultProps = {
  events: {},
  schedules: []
};

SchedulesList.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool,
  schedules: PropTypes.array
};

export default SchedulesList;
