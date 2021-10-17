import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "shards-react";

import { actions as serviceActions } from "../index";
import AlertMessages from "../../../../components/common/AlertMessages";
import PageTitle from "../../../../components/common/PageTitle";
import PmsDetails from "../../../../components/services/PmsDetails";
import PmsServiceItems from "../../../../components/services/PmsServiceItems";
import { numberFormatter } from "../../../../utils/helper";

const {
  clearPmsData,
  getOilTypes,
  getPmsItem,
  getShopPmsData,
  getVehicleTypes,
  savePmsData
} = serviceActions;

class ManagePreventiveServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      oilTypePrices: {},
      vehicleTypePrices: {}
    };
  }

  componentWillUnmount = () => {
    const { clearPmsData } = this.props;
    clearPmsData();
  };

  componentDidMount = () => {
    const mileage = this._getMileage();
    const {
      getOilTypes,
      getPmsItem,
      getShopPmsData,
      getVehicleTypes
    } = this.props;
    getPmsItem(mileage).catch(error => {
      console.log(error);
    });
    getVehicleTypes().catch(error => {
      console.log(error);
    });
    getOilTypes().catch(error => {
      console.log(error);
    });
    getShopPmsData(mileage).catch(error => {
      console.log(error);
    });
  };

  _getMileage = () => {
    const { match } = this.props;
    const { mileage } = match.params;
    return mileage;
  };

  _handleOilTypePrice = (event, item) => {
    let { oilTypePrices } = this.state;
    oilTypePrices[item] = event.target.value;
    this.setState({ oilTypePrices });
  };

  _handleVehicleTypePrice = (event, item) => {
    let { vehicleTypePrices } = this.state;
    vehicleTypePrices[item] = event.target.value;
    this.setState({ vehicleTypePrices });
  };

  _submit = event => {
    event.preventDefault();
    const { savePmsData, t } = this.props;
    const {
      oilTypePrices: oil_type_prices,
      vehicleTypePrices: labor_prices
    } = this.state;
    const mileage = this._getMileage();
    const pmsData = {
      labor_prices,
      oil_type_prices
    };
    let errorMessages = [];
    let successMessages = [];
    savePmsData(mileage, pmsData)
      .then(pmsValue => {
        if (pmsValue) {
          successMessages.push({
            message: t("translation.successUpdatePmsService", { mileage })
          });
          this.setState({
            successMessages
          });
        }
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages, attemptSubmit: false });
      });
  };

  render = () => {
    const { oilTypes, pms, pmsPrices, t, vehicleTypes } = this.props;
    const { errorMessages, successMessages } = this.state;
    const mileage = this._getMileage();
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={`${numberFormatter.format(mileage)} km`}
            subtitle={t("translation.subTtlPreventiveServices")}
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Link
              to={`/services/preventive`}
              className="btn btn-white mx-auto mr-lg-3"
            >
              &larr; Go Back
            </Link>
            <Button theme="success" className="mr-sm-0" onClick={this._submit}>
              <i className="material-icons">edit</i> Save Changes
            </Button>
          </Col>
        </Row>
        {pms ? (
          <Row>
            <Col lg="12">
              <AlertMessages
                errorMessages={errorMessages}
                successMessages={successMessages}
              />
              <PmsServiceItems
                events={{
                  handleOilTypePrice: this._handleOilTypePrice,
                  handleVehicleTypePrice: this._handleVehicleTypePrice
                }}
                oilTypes={oilTypes}
                pmsPrices={pmsPrices}
                vehicleTypes={vehicleTypes}
              />
              <PmsDetails pms={pms} />
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  oilTypes: state.servicesReducer.oilTypes,
  pms: state.servicesReducer.pms,
  pmsPrices: state.servicesReducer.pmsPrices,
  vehicleTypes: state.servicesReducer.vehicleTypes
});

export default withTranslation()(
  connect(mapStateToProps, {
    clearPmsData,
    getOilTypes,
    getPmsItem,
    getShopPmsData,
    getVehicleTypes,
    savePmsData
  })(ManagePreventiveServices)
);
