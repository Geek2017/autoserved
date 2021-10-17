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
  ButtonGroup
} from 'shards-react';

// import { months } from '../../utils/helper';

const PendingRequestEstimates = ({ dashboard, title }) => {
  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <CardBody className="p-0">
        {dashboard.requests.map((request, index) => {
          return (
            <div key={index} className="blog-comments__item d-flex p-3">
              <div className="blog-comments__avatar mr-3">
                <img src={request.avatar} alt={request.customer} />
              </div>
              <div className="blog-comments__content">
                <div className="blog-comments__meta text-muted">
                  <span className="text-secondary">{request.customer}</span>{' '}
                  requesting for{' '}
                  <span className="text-secondary">{request.requirements}</span>{' '}
                  for{' '}
                  <a className="text-secondary font-weight-bold" href="#!">
                    {request.car}
                  </a>{' '}
                  for{' '}
                  <span className="text-muted">
                    {request.schedules.map(sched => {
                      return sched;
                    })}
                  </span>{' '}
                  at {request.distance} KM
                </div>
                <div className="blog-comments__actions mt-3">
                  <ButtonGroup size="sm">
                    <Button theme="info">
                      <span className="text-white">
                        <i className="material-icons">check</i>
                      </span>{' '}
                      View Details
                    </Button>
                    <Button theme="success">
                      <span className="text-white">
                        <i className="material-icons">edit</i>
                      </span>{' '}
                      Customize Estimates
                    </Button>
                    <Button theme="white">
                      <span className="text-dark">
                        <i className="material-icons">timer</i>
                      </span>{' '}
                      Time Remaining: 00:15:00
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="border-top bg-light">
        <Row>
          <Col className="text-center view-report">
            {dashboard.requests.length ? (
              <Button theme="primary" type="submit">
                View More Requests
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

PendingRequestEstimates.propTypes = {
  dashboard: PropTypes.object.isRequired,
  title: PropTypes.string
};

PendingRequestEstimates.defaultProps = {
  title: 'Pending Request Estimates'
};

export default PendingRequestEstimates;
