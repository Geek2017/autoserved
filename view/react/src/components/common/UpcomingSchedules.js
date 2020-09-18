import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  CardFooter,
  Container,
  ButtonGroup
  // Badge
} from 'shards-react';

// import status from '../../utils/status/status';
// import { formatter, months } from '../../utils/helper';

const UpcomingSchedules = ({ dashboard, title }) => {
  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th>
                  <small>Schedule</small>
                </th>
                <th />
                <th className="text-center">
                  <small>Service</small>
                </th>
                <th className="text-center">
                  <small>Status</small>
                </th>
                <th className="text-right">
                  <small>Actions</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboard.schedules.map((schedule, index) => {
                return (
                  <tr key={index}>
                    <td className="lo-stats__order-details">
                      <span>{schedule.schedule}</span>
                    </td>
                    <td className="lo-stats__status">
                      <div className="d-table mx-auto">
                        {/* <Badge pill theme={status[appointment.status]}>
                            {appointment.status}
                          </Badge> */}
                      </div>
                    </td>
                    <td className="lo-stats__total text-center text-success">
                      {schedule.mileage}
                    </td>
                    <td className="lo-stats__actions">
                      <ButtonGroup className="d-table ml-auto">
                        <Button size="sm" theme="primary">
                          View
                        </Button>
                        <Button size="sm" theme="danger">
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </CardBody>
      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            {dashboard.appointments.length ? (
              <Button theme="primary" type="submit">
                View More Appointments
              </Button>
            ) : (
              <Button theme="white">No Data Found</Button>
            )}
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

UpcomingSchedules.propTypes = {
  dashboard: PropTypes.object.isRequired,
  title: PropTypes.string
};

UpcomingSchedules.defaultProps = {
  title: 'Upcoming Service Appointments'
};

export default UpcomingSchedules;
