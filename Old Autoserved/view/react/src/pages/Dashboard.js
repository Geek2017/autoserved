import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import ListCompletion from '../components/common/ListCompletion';
import UpcomingAppointments from '../components/common/UpcomingAppointments';
import PendingRequestEstimates from '../components/common/PendingRequestEstimates';
import SendMessage from '../components/common/SendMessage';
import DashboardStats from '../components/common/DashboardStats';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionalAlert: true
    };
  }

  render = () => {
    const { promotionalAlert } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        {promotionalAlert ? (
          <Row className="mt-3">
            <Col lg="12" md="12" sm="12">
              <Alert
                dismissible={() => this.setState({ promotionalAlert: false })}
                fade
                theme="info"
                className="mb-0 rounded"
              >
                <strong>Give P500, Get P500</strong>
                <p className="mb-0">
                  For every friend you refer who books an appointment, both of
                  you and your friend will get P500.
                </p>
              </Alert>
            </Col>
          </Row>
        ) : null}
        <Row className="page-header py-4">
          <PageTitle
            title="Dashboard"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="9" md="12" sm="12" className="mb-4">
            <DashboardStats />
            <UpcomingAppointments />
            <PendingRequestEstimates />
          </Col>
          <Col lg="3" md="12" sm="12" className="mb-4">
            <ListCompletion />
            <SendMessage />
          </Col>
        </Row>
      </Container>
    );
  };
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

const mapStateToProps = state => ({});

export default withTranslation()(
  connect(
    mapStateToProps,
    {}
  )(Dashboard)
);
