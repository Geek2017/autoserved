import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Col, Container, Row } from 'shards-react';

import { actions as shopActions } from '../index';
import PageTitle from '../../../../components/common/PageTitle';
import AlertMessages from '../../../../components/common/AlertMessages';
import ShopsList from '../../../../components/shops/ShopsList';
import ShopsModal from '../../../../components/shops/ShopsModal';

const { createShop, getShops } = shopActions;

class Shops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      mdlErrorMessages: [],
      successMessages: [],
      isFetchingShops: true,
      mdlCreation: false,
      txtMobileNumber: null,
      txtShopName: null
    };
  }

  componentDidMount = () => {
    const { getShops } = this.props;
    getShops()
      .then(() => {
        this.setState({ isFetchingShops: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleMobileNumber = event => {
    const { value } = event.target;
    this.setState({ txtMobileNumber: value });
  };

  _handleShopName = event => {
    const { value } = event.target;
    this.setState({ txtShopName: value });
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptSubmit: true }, () => {
      let mdlErrorMessages = [];
      let successMessages = [];
      const { createShop, t } = this.props;
      const { txtMobileNumber, txtShopName } = this.state;
      const shopData = {
        mobileNumber: txtMobileNumber,
        shopName: txtShopName
      };
      createShop(shopData)
        .then(shop => {
          if (shop) {
            successMessages.push({
              message: t('translation.successCreateShop', shop)
            });
            this.setState({
              attemptSubmit: false,
              mdlCreation: false,
              successMessages
            });
          }
        })
        .catch(error => {
          if (Array.isArray(error)) {
            mdlErrorMessages = mdlErrorMessages.concat(error);
          } else {
            mdlErrorMessages.push({ message: t('translation.generalError') });
          }

          this.setState({ mdlErrorMessages, attemptSubmit: false });
        });
    });
  };

  _toggle = () => {
    const { mdlCreation } = this.state;
    this.setState({
      mdlCreation: !mdlCreation,
      txtMobileNumber: null,
      txtShopName: null
    });
  };

  render = () => {
    const { shops, t } = this.props;
    const {
      attemptSubmit,
      errorMessages,
      mdlErrorMessages,
      successMessages,
      isFetchingShops,
      mdlCreation,
      txtMobileNumber,
      txtShopName
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t('translation.ttlShops')}
            subtitle={t('translation.subTtlShops')}
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Button
              onClick={this._toggle}
              className="mx-auto ml-sm-auto mr-sm-0"
            >
              <i className="material-icons">add</i>
              {t('translation.btnCreateNewShop')}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages
              errorMessages={errorMessages}
              successMessages={successMessages}
            />
            <ShopsList
              isFetching={isFetchingShops}
              shops={shops}
              toggleModal={this._toggle}
            />
          </Col>
        </Row>
        <ShopsModal
          attemptSubmit={attemptSubmit}
          data={{ txtMobileNumber, txtShopName }}
          errors={mdlErrorMessages}
          open={mdlCreation}
          toggle={this._toggle}
          events={{
            handleMobileNumber: this._handleMobileNumber,
            handleShopName: this._handleShopName,
            submit: this._submit
          }}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  shops: state.shopsReducer.shops
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { createShop, getShops }
  )(Shops)
);
