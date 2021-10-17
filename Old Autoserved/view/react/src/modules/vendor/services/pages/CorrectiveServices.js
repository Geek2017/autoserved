import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Container, Col, Row } from 'shards-react';

import { actions as serviceActions } from '../index';
import PageTitle from '../../../../components/common/PageTitle';
import AlertMessages from '../../../../components/common/AlertMessages';
import ServicesList from '../../../../components/services/ServicesList';

const { getCorrectiveServices } = serviceActions;

class CorrectiveServices extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isFetchingServices: true,
      errorMessages: [],
      successMessages: []
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      this._getCorrectiveServices();
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  _getCorrectiveServices = () => {
    const { getCorrectiveServices } = this.props;
    getCorrectiveServices()
      .then(() => {
        this.setState({ isFetchingServices: false });
      })
      .catch(error => console.log(error));
  };

  render = () => {
    const { services, t } = this.props;
    const { successMessages, isFetchingServices } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t('translation.ttlServices')}
            subtitle={t('translation.subTtlCorrectiveServices')}
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Button
              onClick={() => this.setState({ mdlCreation: true })}
              className="mx-auto ml-sm-auto mr-sm-0"
            >
              <i className="material-icons">add</i>
              {t('translation.btnCreateNewService')}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
            <ServicesList isFetching={isFetchingServices} services={services} />
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  services: state.servicesReducer.services
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getCorrectiveServices }
  )(CorrectiveServices)
);
