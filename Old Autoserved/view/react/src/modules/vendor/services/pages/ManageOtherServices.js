import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "shards-react";

import { actions as serviceActions } from "../index";
import PageTitle from "../../../../components/common/PageTitle";
import AlertMessages from "../../../../components/common/AlertMessages";
import PmsOthersServiceItems from "../../../../components/services/PmsOthersServiceItems";

const {
  getOilTypes,
  getPmsOthersItem,
  getPmsOtherPrices,
  getPmsOthersLaborPrices,
  savePmsOthersData,
  getVehicleTypes
} = serviceActions;

class ManageOtherServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      values: {},
      vehicleTypePrices: {}
    };
  }

  componentDidMount = () => {
    const {
      getOilTypes,
      getPmsOthersItem,
      getPmsOtherPrices,
      getVehicleTypes
    } = this.props;
    const type = this._getType();
    getOilTypes().catch(error => console.log(error));
    getVehicleTypes().catch(error => console.log(error));
    getPmsOthersItem(type)
      .then(item => {
        getPmsOtherPrices(item.id)
          .then(result => {
            this.setState({
              values: !result.oil_prices ? {} : result.oil_prices.values
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  _getType = () => {
    const { match } = this.props;
    const { type } = match.params;
    return type;
  };

  _handlePrice = (event, item) => {
    let { values } = this.state;
    values[item] = event.target.value;
    this.setState({ values });
  };

  _handleVehicleTypePrice = (event, item) => {
    let { vehicleTypePrices } = this.state;
    vehicleTypePrices[item] = event.target.value;
    this.setState({ vehicleTypePrices });
  };

  _submit = event => {
    event.preventDefault();
    const { otherService, savePmsOthersData, t } = this.props;
    const { values, vehicleTypePrices } = this.state;
    let errorMessages = [];
    let successMessages = [];
    savePmsOthersData({
      pms_others_id: otherService.id,
      values,
      labor_prices: vehicleTypePrices
    })
      .then(result => {
        if (result) {
          successMessages.push({
            message: "This service has been successfully updated."
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
    const { oilTypes, otherService, otherPrices, vehicleTypes } = this.props;
    const { errorMessages, successMessages } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            lg="8"
            title={
              otherService
                ? `Manage ${otherService.name}`
                : "Manage Other Services"
            }
            subtitle="Other Services"
            className="text-sm-left"
          />
          <Col lg="4" className="d-flex ml-auto my-auto">
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
        {oilTypes && otherService ? (
          <Row>
            <Col lg="12">
              <AlertMessages
                errorMessages={errorMessages}
                successMessages={successMessages}
              />
              <PmsOthersServiceItems
                events={{
                  handlePrice: this._handlePrice,
                  handleVehicleTypePrice: this._handleVehicleTypePrice
                }}
                data={{
                  oilTypes,
                  otherService,
                  otherPrices,
                  vehicleTypes
                }}
              />
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  oilTypes: state.servicesReducer.oilTypes,
  otherService: state.servicesReducer.otherService,
  otherPrices: state.servicesReducer.otherPrices,
  pmsOthersLaborPrices: state.servicesReducer.pmsOthersLaborPrices,
  vehicleTypes: state.servicesReducer.vehicleTypes
});

export default withTranslation()(
  connect(mapStateToProps, {
    getOilTypes,
    getPmsOthersItem,
    getPmsOtherPrices,
    getPmsOthersLaborPrices,
    savePmsOthersData,
    getVehicleTypes
  })(ManageOtherServices)
);
