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
import { formatter } from '../../utils/helper';

const UpcomingAppointments = ({ dashboard, title }) => {
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
                  <small>Status</small>
                </th>
                <th className="text-center">
                  <small>Service</small>
                </th>
                <th className="text-right">
                  <small>Actions</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboard.appointments.map((appointment, index) => {
                return (
                  <tr key={index}>
                    <td className="lo-stats__image">
                      <img
                        alt={appointment.client.name}
                        className="border rounded"
                        src={appointment.client.avatar}
                      />
                    </td>
                    <td className="lo-stats__order-details">
                      <span>{appointment.client.name}</span>
                      <span>{appointment.schedule_date}</span>
                    </td>
                    <td className="lo-stats__status">
                      <div className="d-table mx-auto">
                        {appointment.status}
                      </div>
                    </td>
                    <td className="lo-stats__total text-center text-success">
                      {formatter.format(appointment.receivable)}
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

UpcomingAppointments.propTypes = {
  dashboard: PropTypes.object.isRequired,
  title: PropTypes.string
};

UpcomingAppointments.defaultProps = {
  title: 'Upcoming Service Appointments'
};

export default UpcomingAppointments;
