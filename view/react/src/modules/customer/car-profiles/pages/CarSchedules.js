import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "shards-react";

import { actions as carProfilesActions } from "../index";
import { actions as servicesActions } from "../../../vendor/services";
import { actions as requestsActions } from "../../../user/requests";
import AlertMessages from "../../../../components/common/AlertMessages";
import PageTitle from "../../../../components/common/PageTitle";
import CarDetails from "../../../../components/car-profile/CarDetails";
import SchedulesList from "../../../../components/car-profile/SchedulesList";
import CreatePMSRequestModal from "../../../../components/car-profile/CreatePMSRequestModal";
import AvailableServices from "../../../../components/car-profile/AvailableServices";
import { validator } from "../../../../utils/helper";
import CreatePMSOtherRequestModal from "../../../../components/car-profile/CreatePMSOtherRequestModal";
import RepairHistory from "../../../../components/car-profile/RepairHistory";

const {
  getCarDetails,
  getCarSchedules,
  requestPms,
  requestPmsOther,
  getRepairHistory
} = carProfilesActions;
const {
  getOilTypeOptions,
  getPartTypeOptions,
  getPmsOthersItem,
  getOtherServices
} = servicesActions;
const { getScheduleTime } = requestsActions;

class CarSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      contentIndex: 0,
      content: null,
      isFetchingSchedules: true,
      isFetchingOtherServices: true,
      isFetchingRepairHistory: true,
      mdlCreation: false,
      mdlOtherCreation: false,
      menuIndex: 0,
      preferredSchedules: [{}],
      pmsOtherType: null,
      replacementTypes: {},
      selectedOilType: null,
      validatedPreferredSchedule: false,
      validatedSelectedOilType: false,
      validatedReplacementTypes: false
    };
  }

  componentDidMount = () => {
    const {
      getCarDetails,
      getOilTypeOptions,
      getPartTypeOptions,
      getScheduleTime,
      getOtherServices,
      match,
      getRepairHistory
    } = this.props;
    const { id } = match.params;
    getScheduleTime().catch(error => {
      console.log(error);
    });
    getPartTypeOptions().catch(error => {
      console.log(error);
    });
    getOilTypeOptions().catch(error => {
      console.log(error);
    });
    getCarDetails(id)
      .then(() => {
        getRepairHistory(id)
          .then(() => {
            this.setState({ isFetchingRepairHistory: false });
          })
          .catch(error => {
            console.log(error);
          });
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
    this._getCarSchedules(id);
  };

  _addSchedule = () => {
    let { preferredSchedules, validatedPreferredSchedule } = this.state;
    preferredSchedules.push({});
    validatedPreferredSchedule = validator.isValidPreferredSchedules(
      preferredSchedules
    );
    this.setState({ preferredSchedules, validatedPreferredSchedule });
  };

  _handleOilTypeSelection = event => {
    const { value: selectedOilType } = event.target;
    const validatedSelectedOilType = selectedOilType !== null;
    this.setState({
      selectedOilType,
      validatedSelectedOilType
    });
  };

  _getCarSchedules = id => {
    const { getCarSchedules } = this.props;
    getCarSchedules(id)
      .then(() => {
        this.setState({ isFetchingSchedules: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handlePreferredScheduleDate = (value, index) => {
    let { preferredSchedules, validatedPreferredSchedule } = this.state;
    preferredSchedules[index].date = new Date(value);
    validatedPreferredSchedule = validator.isValidPreferredSchedules(
      preferredSchedules
    );
    this.setState({ preferredSchedules, validatedPreferredSchedule });
  };

  _handlePreferredScheduleTime = (event, index) => {
    let { preferredSchedules, validatedPreferredSchedule } = this.state;
    preferredSchedules[index].time = event.target.value;
    validatedPreferredSchedule = validator.isValidPreferredSchedules(
      preferredSchedules
    );
    this.setState({ preferredSchedules, validatedPreferredSchedule });
  };

  _handleReplacementType = (event, item, index) => {
    let {
      contentIndex,
      replacementTypes,
      validatedReplacementTypes
    } = this.state;
    const { schedules } = this.props;
    const replacements = schedules[contentIndex].pms.change_items;
    replacementTypes[item] = {
      index,
      type: event.target.value
    };
    validatedReplacementTypes = validator.isValidReplacementTypes(
      replacements,
      replacementTypes
    );
    this.setState({ replacementTypes, validatedReplacementTypes });
  };

  _next = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex + 1 });
  };

  _previous = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex - 1 });
  };

  _removeSchedule = index => {
    let { preferredSchedules } = this.state;
    preferredSchedules.splice(index, 1);
    this.setState({ preferredSchedules });
  };

  _submitOtherRequest = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { match, t, requestPmsOther } = this.props;
    const { id: car_id } = match.params;
    const {
      preferredSchedules: preferred_schedules,
      selectedOilType: oil_type,
      content: { id: pms_others_id, type }
    } = this.state;
    requestPmsOther({
      car_id,
      type: "other services",
      preferred_schedules,
      oil_type,
      pms_others_id
    })
      .then(() => {
        successMessages.push({
          message: "Request has been created!"
        });
        this.setState({ successMessages }, () => {
          this._toggleOtherModalCreation(type);
        });
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages });
      });
  };

  _submit = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { match, requestPms, schedules, t } = this.props;
    const { id } = match.params;
    const {
      contentIndex,
      preferredSchedules: preferred_schedules,
      replacementTypes: replacements,
      selectedOilType: oil_type
    } = this.state;
    const requestPmsData = {
      preferred_schedules,
      replacements,
      oil_type,
      type: "preventive",
      car_schedule_id: schedules[contentIndex].id
    };
    requestPms(requestPmsData)
      .then(() => {
        successMessages.push({
          message: "Request has been created!"
        });
        this.setState({ successMessages }, () => {
          this._toggleModalCreation();
          this._getCarSchedules(id);
        });
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages });
      });
  };

  _toggleModalCreation = index => {
    const { mdlCreation } = this.state;
    this.setState({
      contentIndex: index,
      menuIndex: 0,
      mdlCreation: !mdlCreation,
      preferredSchedules: [{}],
      replacementTypes: {},
      selectedOilType: null
    });
  };

  _toggleOtherModalCreation = type => {
    const { getPmsOthersItem } = this.props;
    const { mdlOtherCreation } = this.state;
    getPmsOthersItem(type)
      .then(content => {
        this.setState({
          content,
          pmsOtherType: type,
          menuIndex: 0,
          preferredSchedules: [{}],
          mdlOtherCreation: !mdlOtherCreation,
          selectedOilType: null
        });
      })
      .catch(error => console.log(error));
  };

  render = () => {
    const {
      car,
      history,
      oilTypeOptions,
      partTypeOptions,
      schedules,
      t,
      otherServices,
      timeOptions
    } = this.props;
    const {
      errorMessages,
      successMessages,
      contentIndex,
      content,
      isFetchingSchedules,
      isFetchingOtherServices,
      isFetchingRepairHistory,
      mdlCreation,
      mdlOtherCreation,
      menuIndex,
      preferredSchedules,
      replacementTypes,
      selectedOilType,
      validatedPreferredSchedule,
      validatedReplacementTypes,
      validatedSelectedOilType,
      pmsOtherType
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t("translation.ttlCarSchedule")}
            subtitle={t("translation.subTtlSchedule")}
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Link
              to={"/cars"}
              className="mx-auto ml-sm-auto mr-sm-0 btn btn-white"
            >
              &larr;{t("translation.btnGoBack")}
            </Link>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <CarDetails car={car} />
          </Col>
          <Col lg="8">
            <Row>
              <Col>
                <AvailableServices
                  events={{
                    toggleModalRequest: this._toggleOtherModalCreation
                  }}
                  isFetching={isFetchingOtherServices}
                  services={otherServices}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SchedulesList
                  events={{ toggleModalRequest: this._toggleModalCreation }}
                  isFetching={isFetchingSchedules}
                  schedules={schedules}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <RepairHistory
                  isFetching={isFetchingRepairHistory}
                  history={history}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {mdlOtherCreation && (
          <CreatePMSOtherRequestModal
            current={menuIndex}
            data={{
              content,
              oilTypeOptions,
              partTypeOptions,
              preferredSchedules,
              replacementTypes,
              selectedOilType,
              timeOptions,
              pmsOtherType
            }}
            errorMessages={errorMessages}
            events={{
              addSchedule: this._addSchedule,
              handleOilTypeSelection: this._handleOilTypeSelection,
              handlePreferredScheduleDate: this._handlePreferredScheduleDate,
              handlePreferredScheduleTime: this._handlePreferredScheduleTime,
              next: this._next,
              previous: this._previous,
              removeSchedule: this._removeSchedule,
              submit: this._submitOtherRequest
            }}
            open={mdlOtherCreation}
            toggle={this._toggleOtherModalCreation}
            validated={validatedPreferredSchedule && validatedSelectedOilType}
          />
        )}
        {mdlCreation && (
          <CreatePMSRequestModal
            current={menuIndex}
            data={{
              content: schedules[contentIndex],
              oilTypeOptions,
              partTypeOptions,
              preferredSchedules,
              replacementTypes,
              selectedOilType,
              timeOptions
            }}
            errorMessages={errorMessages}
            events={{
              addSchedule: this._addSchedule,
              handleOilTypeSelection: this._handleOilTypeSelection,
              handlePreferredScheduleDate: this._handlePreferredScheduleDate,
              handlePreferredScheduleTime: this._handlePreferredScheduleTime,
              handleReplacementType: this._handleReplacementType,
              next: this._next,
              previous: this._previous,
              removeSchedule: this._removeSchedule,
              submit: this._submit
            }}
            open={mdlCreation}
            toggle={this._toggleModalCreation}
            validated={
              validatedPreferredSchedule &&
              validatedSelectedOilType &&
              validatedReplacementTypes
            }
          />
        )}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  car: state.carProfilesReducer.car,
  oilTypeOptions: state.servicesReducer.oilTypeOptions,
  partTypeOptions: state.servicesReducer.partTypeOptions,
  schedules: state.carProfilesReducer.schedules,
  timeOptions: state.requestsReducer.timeOptions,
  otherService: state.servicesReducer.otherService,
  otherServices: state.servicesReducer.otherServices,
  history: state.carProfilesReducer.history
});

export default withTranslation()(
  connect(mapStateToProps, {
    getCarDetails,
    getCarSchedules,
    getOilTypeOptions,
    getPartTypeOptions,
    getScheduleTime,
    getPmsOthersItem,
    getOtherServices,
    requestPms,
    requestPmsOther,
    getRepairHistory
  })(CarSchedules)
);
