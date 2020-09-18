import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
// import status from '../utils/status';
import { formatter, months } from '../utils/helper';

class Estimates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      estimates: [
        {
          id: 1,
          estimateNumber: 100123,
          date: new Date(),
          status: 'Requested',
          amount: 12500,
          type: 'Repair',
          client: {
            avatar: require('../images/avatars/1.jpg'),
            name: 'Galvin M',
            carDetails: '2016, Toyota Camry 2.0'
          }
        },
        {
          id: 2,
          estimateNumber: 100123,
          date: new Date(),
          status: 'Requested',
          amount: 9500,
          type: 'Regular Maintenance',
          client: {
            avatar: require('../images/avatars/3.jpg'),
            name: 'Mark S',
            carDetails: '2016, Suzuki Celerio 1.0'
          }
        }
      ]
    };
  }

  render() {
    const { title } = this.props;
    const { estimates } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Estimates"
            subtitle="Requests"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col sm="12" md="12" lg="12" className="mb-4">
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
                          <small>Client</small>
                        </th>
                        <th />
                        <th className="text-center">
                          <small>Status</small>
                        </th>
                        <th className="text-center">
                          <small>Amount</small>
                        </th>
                        <th className="text-center">
                          <small>Type</small>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {estimates.map((estimate, index) => {
                        return (
                          <tr key={index}>
                            <td className="lo-stats__image">
                              <img
                                alt={estimate.client.name}
                                className="border rounded"
                                src={estimate.client.avatar}
                              />
                            </td>
                            <td className="lo-stats__order-details">
                              <a href="#!">{estimate.estimateNumber}</a>
                              <span>
                                {estimate.client.name} -{' '}
                                {estimate.client.carDetails}
                              </span>
                              <span>{`${months(
                                estimate.date.getMonth()
                              )} ${estimate.date.getDate()}, ${estimate.date.getFullYear()}`}</span>
                            </td>
                            <td className="lo-stats__status">
                              <div className="d-table mx-auto">
                                {/* <Badge pill theme={status[estimate.status]}>
                                  {estimate.status}
                                </Badge> */}
                              </div>
                            </td>
                            <td className="lo-stats__total text-center text-success">
                              {formatter.format(estimate.amount.toFixed(2))}
                            </td>
                            <td className="lo-stats__total text-center">
                              {estimate.type}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Container>
              </CardBody>
              <CardFooter className="border-top" />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Estimates.propTypes = {
  title: PropTypes.string
};

Estimates.defaultProps = {
  title: 'List of Estimates'
};

export default Estimates;
