import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Alert, Col, Container, Row } from 'shards-react';

import { actions as profileActions } from '../../profile';
import PageTitle from '../../../../components/common/PageTitle';
import DashboardStats from '../../../../components/dashboard/DashboardStats';

const { getWallet } = profileActions;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { getWallet } = this.props;
    getWallet().catch(error => {
      console.log(error);
    });
  };

  render = () => {
    const { user, wallet } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="page-header py-4">
          <PageTitle
            title="Dashboard"
            subtitle="Overview"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="12">
            {user && !user.email_verified ? (
              <Alert fade theme="warning" className="rounded">
                <p className="mb-0">
                  <i className="material-icons">warning</i> Please check your
                  email to verify your account.
                </p>
              </Alert>
            ) : null}
            <DashboardStats
              statOne={0}
              statTwo={0}
              userType={user ? user.user_type : null}
              wallet={wallet}
            />
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  // appointmentsCount: state.appointmentsReducer.appointmentsCount,
  // requestsCount: state.requestsReducer.requestsCount,
  user: state.sessionReducer.user,
  wallet: state.profilesReducer.wallet
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getWallet }
  )(Dashboard)
);
