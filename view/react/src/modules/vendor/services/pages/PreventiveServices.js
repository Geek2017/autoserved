import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Col, Container, Row } from "shards-react";

import { actions as serviceActions } from "../index";
import { actions as shopsActions } from "../../shops";
import PageTitle from "../../../../components/common/PageTitle";
import MileagesList from "../../../../components/services/MileagesList";
import ShopsList from "../../../../components/services/ShopsList";
import OtherServices from "../../../../components/services/OtherServices";
import AlertMessages from "../../../../components/common/AlertMessages";

const {
  getMileages,
  getOtherServices,
  getPricedPmsData,
  toggleShopPms,
  getPricedPmsOthersData
} = serviceActions;
const { getShops } = shopsActions;

class PreventiveServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
      isFetchingMileages: true,
      isFetchingOtherServices: true,
      isFetchingShops: true,
      togglingShopPms: false
    };
  }

  componentDidMount = () => {
    const {
      getMileages,
      getOtherServices,
      getPricedPmsData,
      getPricedPmsOthersData
    } = this.props;
    this._getShops();
    getMileages()
      .then(() => {
        this.setState({ isFetchingMileages: false });
      })
      .catch(error => {
        console.log(error);
      });
    getOtherServices()
      .then(() => {
        this.setState({ isFetchingOtherServices: false });
      })
      .catch(error => {
        console.log(error);
      });
    getPricedPmsData().catch(error => {
      console.log(error);
    });
    getPricedPmsOthersData().catch(error => {
      console.log(error);
    });
  };

  _getShops = () => {
    const { getShops } = this.props;
    getShops()
      .then(() => {
        this.setState({ isFetchingShops: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _toggleCheckbox = shop => {
    let { toggleShopPms, t } = this.props;
    let successMessages = [];
    let errorMessages = [];
    this.setState({ togglingShopPms: true }, () => {
      toggleShopPms(shop.id)
        .then(() => {
          this._getShops();

          if (!shop.pms_enabled) {
            successMessages = [{ message: `${shop.name} PMS is enabled.` }];
          } else {
            errorMessages = [{ message: `${shop.name} PMS is disabled.` }];
          }

          this.setState({
            togglingShopPms: false,
            successMessages,
            errorMessages
          });
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages, attemptSubmit: false });
        });
    });
  };

  render = () => {
    const {
      mileages,
      otherServices,
      shops,
      t,
      pricedPms,
      pricedPmsOthers
    } = this.props;
    const {
      errorMessages,
      successMessages,
      isFetchingMileages,
      isFetchingOtherServices,
      isFetchingShops,
      toggleShopPms
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t("translation.ttlServices")}
            subtitle={t("translation.subTtlPreventiveServices")}
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="4" className="mb-4">
            <AlertMessages
              infoMessages={errorMessages}
              successMessages={successMessages}
            />
            <ShopsList
              disabled={toggleShopPms}
              isFetching={isFetchingShops}
              onChange={this._toggleCheckbox}
              shops={shops}
            />
          </Col>
          <Col lg="8" className="mb-4">
            <Row>
              <Col className="mb-4">
                <OtherServices
                  data={{ pricedPmsOthers }}
                  isFetching={isFetchingOtherServices}
                  otherServices={otherServices}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <MileagesList
                  data={{ pricedPms }}
                  isFetching={isFetchingMileages}
                  mileages={mileages}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  mileages: state.servicesReducer.mileages,
  otherServices: state.servicesReducer.otherServices,
  shops: state.shopsReducer.shops,
  pricedPms: state.servicesReducer.pricedPms,
  pricedPmsOthers: state.servicesReducer.pricedPmsOthers
});

export default withTranslation()(
  connect(mapStateToProps, {
    getMileages,
    getOtherServices,
    getShops,
    getPricedPmsData,
    getPricedPmsOthersData,
    toggleShopPms
  })(PreventiveServices)
);
