import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'shards-react';

import { actions as shopActions } from '../../../vendor/shops';
import AlertMessages from '../../../../components/common/AlertMessages';
import PageTitle from '../../../../components/common/PageTitle';
import ActivationRequirements from '../../../../components/shops/ActivationRequirements';

const { getShopDetails, verifyRequirement } = shopActions;

class ShopDocumentsManagement extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isFetchingShops: true
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      this._getShopDetails();
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _getShopDetails = () => {
    const { getShopDetails, match } = this.props;
    getShopDetails(match.params.slug).catch(error => {
      console.log(error);
    });
  };

  _verifyRequirement = (id, type) => {
    const { verifyRequirement } = this.props;
    verifyRequirement(id, type)
      .then(() => {
        this._getShopDetails();
      })
      .catch(error => console.log(error));
  };

  render = () => {
    const { shop } = this.props;
    const { errorMessages } = this.state;
    return shop ? (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            lg="8"
            title={`Activation Requirements for ${shop.name}`}
            subtitle="Shop"
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Link
              className="btn btn-white mx-auto ml-sm-auto mr-sm-0"
              to={`/system/shops`}
            >
              &larr; Go Back
            </Link>
          </Col>
        </Row>
        <Row form>
          <Col lg="12">
            <AlertMessages errorMessages={errorMessages} />
            <ActivationRequirements
              id={shop.application.id}
              requirements={shop.application}
              verify={this._verifyRequirement}
            />
          </Col>
        </Row>
      </Container>
    ) : null;
  };
}

const mapStateToProps = state => ({
  shop: state.shopsReducer.shop
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getShopDetails, verifyRequirement }
  )(ShopDocumentsManagement)
);
