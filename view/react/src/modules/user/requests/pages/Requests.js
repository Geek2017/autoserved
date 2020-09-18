import React, { Component } from "react";
import moment from "moment";
import {} from "moment-timer";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Container, Col, Row } from "shards-react";

import { actions as requestsActions } from "../index";
import { actions as servicesActions } from "../../../vendor/services";
import { actions as shopsActions } from "../../../vendor/shops";
import { actions as carProfileActions } from "../../../customer/car-profiles";
import CustomerRequests from "../../../../components/requests/CustomerRequests";
import PageTitle from "../../../../components/common/PageTitle";
import AlertMessages from "../../../../components/common/AlertMessages";
import { USER_TYPE_CUSTOMER } from "../../../../utils/constants";
import PendingRequests from "../../../../components/requests/PendingRequests";
import CreateEstimateModal from "../../../../components/requests/CreateEstimateModal";
import CreateOtherEstimateModal from "../../../../components/requests/CreateOtherEstimateModal";
import CreatePMSRequestModal from "../../../../components/car-profile/CreatePMSRequestModal";
import { validator } from "../../../../utils/helper";

const { requestPms, getCarSchedule } = carProfileActions;
const { getPmsEnabledShops } = shopsActions;
const {
  cancelRequest,
  createEstimate,
  getRequests,
  getScheduleTime
} = requestsActions;
const {
  getShopPmsLaborPrice,
  getShopPmsOilPrice,
  getPmsOtherPrices,
  getOilTypeOptions,
  getPartTypeOptions
} = servicesActions;

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      contentIndex: null,
      freebies: [],
      isFetchingRequests: true,
      mdlCreation: false,
      mdlCreationOther: false,
      mdlReopen: false,
      menuIndex: 0,
      notes: null,
      replacements: {},
      requestId: null,
      requests: [],
      reviewed: false,
      selectedSchedule: null,
      selectedShop: null,
      schedule: null,
      shop: null,
      totalPrice: 0,
      oilPrice: 0,
      totalReplacementsPrice: 0,
      validatedPrice: false,
      validatedSchedule: false,
      validatedShop: false,
      timers: [],
      preferredSchedules: [{}],
      replacementTypes: {},
      selectedOilType: null,
      validatedPreferredSchedule: false,
      validatedSelectedOilType: false,
      validatedReplacementTypes: false,
      scheduleIndex: 0,
      otherLiters: 0,
      otherLaborPrice: null,
      otherItems: [],
      otherReplacementItems: {}
    };
  }

  componentDidMount = () => {
    const {
      getOilTypeOptions,
      getPartTypeOptions,
      getScheduleTime,
      getPmsEnabledShops
    } = this.props;
    this._getRequests();
    getPmsEnabledShops().catch(error => {
      if (error) console.log(error);
    });
    getScheduleTime().catch(error => {
      console.log(error);
    });
    getPartTypeOptions().catch(error => {
      console.log(error);
    });
    getOilTypeOptions().catch(error => {
      console.log(error);
    });
  };

  _getRequests = () => {
    const { getRequests } = this.props;
    getRequests()
      .then(requests => {
        let elapsedTime = 0;
        new moment.duration(1000).timer({ loop: true }, () => {
          elapsedTime++;
        });
        requests.forEach((request, index) => {
          request.disabled = false;
          const start = moment(new Date());
          const expiry = moment(request.expiry);
          const time = new moment.duration(expiry.diff(start));
          const timer = new moment.duration(1000).timer({ loop: true }, () => {
            const remainingTime = Math.floor(time.asSeconds()) - elapsedTime;
            this._runTimer(remainingTime, index);
            const { user } = this.props;

            if (user.user_type === USER_TYPE_CUSTOMER) {
              timer.stop();
            } else {
              if (remainingTime === 0) {
                timer.stop();
                request.disabled = true;
                this.setState({ requests });
              }
            }
          });
        });
        this.setState({ isFetchingRequests: false, requests });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _runTimer = (time, index) => {
    const { timers } = this.state;
    timers[index] = time;
    this.setState(timers);
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

  _handleCancellation = (id, index) => {
    const { cancelRequest, t } = this.props;
    let errorMessages = [];
    let successMessages = [];
    const confirmation = window.confirm(
      "You are about to cancel this request. Confirm if you are sure."
    );

    if (confirmation) {
      cancelRequest(id)
        .then(() => {
          successMessages.push({
            message: "Request has been cancelled."
          });
          this.setState({ successMessages }, this._getRequests);
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages });
        });
    }
  };

  _handleChkReviewed = () => {
    const { reviewed } = this.state;
    this.setState({ reviewed: !reviewed });
  };

  _handleFreebies = text => {
    this.setState({ freebies: text });
  };

  _handleNotes = event => {
    const { value: notes } = event.target;
    this.setState({ notes });
  };

  _handlePriceInput = (event, item) => {
    let { requests } = this.props;
    let {
      contentIndex,
      replacements,
      totalReplacementsPrice,
      oilPrice
    } = this.state;
    totalReplacementsPrice = 0;
    const request = requests[contentIndex];
    const { value: price } = event.target;
    let validatedPrice = true;
    replacements[item.change_index] = {
      item,
      price,
      liters: null
    };
    const {
      pms_request: {
        pms: { change_items }
      }
    } = request;

    for (const key in replacements) {
      if (replacements[key].item.change_index !== change_items.length - 1) {
        totalReplacementsPrice += Number(replacements[key].price);
      } else {
        totalReplacementsPrice += Number(
          replacements[key].liters * oilPrice.oil_price.price
        );
      }
    }

    for (let i = 0; validatedPrice && i < change_items.length; i++) {
      if (
        !replacements[i] ||
        replacements[i].item.change_index !== change_items.length - 1
      ) {
        if (!replacements[i] || !replacements[i].price) {
          validatedPrice = false;
        }
      } else if (
        !replacements[i] ||
        replacements[i].item.change_index === change_items.length - 1
      ) {
        if (!replacements[i] || !replacements[i].liters) {
          validatedPrice = false;
        }
      }
    }

    this.setState({ replacements, totalReplacementsPrice, validatedPrice });
  };

  _handleOtherLitersInput = event => {
    let { value: otherLiters } = event.target;

    this.setState(
      {
        otherLiters
      },
      this._getTotalCost
    );
  };

  _handleLitersInput = (event, item) => {
    let { requests } = this.props;
    let {
      contentIndex,
      replacements,
      totalReplacementsPrice,
      oilPrice
    } = this.state;
    totalReplacementsPrice = 0;
    const request = requests[contentIndex];
    const { value: liters } = event.target;
    let validatedPrice = true;
    replacements[item.change_index] = {
      item,
      liters,
      price: null
    };
    const {
      pms_request: {
        pms: { change_items }
      }
    } = request;

    for (const key in replacements) {
      if (replacements[key].item.change_index !== change_items.length - 1) {
        totalReplacementsPrice += Number(replacements[key].price);
      } else {
        totalReplacementsPrice += Number(
          replacements[key].liters * oilPrice.oil_price.price
        );
      }
    }

    for (let i = 0; validatedPrice && i < change_items.length; i++) {
      if (
        !replacements[i] ||
        replacements[i].item.change_index !== change_items.length - 1
      ) {
        if (!replacements[i] || !replacements[i].price) {
          validatedPrice = false;
        }
      } else if (
        !replacements[i] ||
        replacements[i].item.change_index === change_items.length - 1
      ) {
        if (!replacements[i] || !replacements[i].liters) {
          validatedPrice = false;
        }
      }
    }

    this.setState({ replacements, totalReplacementsPrice, validatedPrice });
  };

  _removeSchedule = index => {
    let { preferredSchedules } = this.state;
    preferredSchedules.splice(index, 1);
    this.setState({ preferredSchedules });
  };

  _handleSelectedSchedule = event => {
    const { requests } = this.props;
    const { contentIndex } = this.state;
    const { value: selectedSchedule } = event.target;
    const validatedSchedule = selectedSchedule !== null;
    this.setState({
      schedule: requests[contentIndex].preferred_schedule[selectedSchedule],
      selectedSchedule,
      validatedSchedule
    });
  };

  _handleSelectedShop = event => {
    const { pmsShops } = this.props;
    const { value: selectedShop } = event.target;
    const validatedShop = selectedShop !== null;
    this.setState({
      shop: pmsShops[selectedShop],
      selectedShop,
      validatedShop
    });
  };

  _next = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex + 1 });
  };

  _previous = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex - 1 });
  };

  _reopen = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { requestPms, t } = this.props;
    const {
      schedule,
      preferredSchedules: preferred_schedules,
      replacementTypes: replacements,
      selectedOilType: oil_type
    } = this.state;
    requestPms({
      preferred_schedules,
      replacements,
      oil_type,
      type: "preventive",
      car_schedule_id: schedule.id
    })
      .then(() => {
        successMessages.push({
          message: "Request has been created!"
        });
        this.setState({ successMessages }, () => {
          this._toggleModalReopen();
          this._getRequests();
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
    const { createEstimate, requests, t } = this.props;
    const {
      contentIndex,
      freebies,
      notes,
      replacements,
      schedule,
      shop,
      otherLiters,
      otherItems,
      otherReplacementItems
    } = this.state;
    let replacementItems = [];

    for (let key in replacements) {
      const replacement_id = replacements[key].item.id;
      const price = replacements[key].price;
      const liters = replacements[key].liters;
      replacementItems.push({ replacement_id, price, liters });
    }
    let data = {
      request_id: requests[contentIndex].id,
      shop_id: shop.id,
      freebies,
      discount: 0,
      preferred_date: moment(schedule.date).format("YYYY-MM-DD"),
      preferred_time: schedule.time,
      notes
    };

    if (requests[contentIndex].type === "other services") {
      data.other_services = {
        pms_others_id: requests[contentIndex].pms_others_request.pms_others.id,
        liters: otherLiters
      };
      data.other_items = otherItems;
      data.other_replacement_items = otherReplacementItems;
    } else {
      data.replacements = replacementItems;
    }

    createEstimate(data)
      .then(() => {
        successMessages.push({
          message:
            "Estimate has been submitted! Please wait for the customer to approve your estimation."
        });
        this.setState({ successMessages }, () => {
          this._toggleModalCreation();
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

  _toggleModalReopen = (id, index) => {
    const { requests, getCarSchedule } = this.props;
    const { mdlReopen } = this.state;
    const request = requests[index];

    if (request) {
      getCarSchedule(request.car_id, request.pms_request.pms.id)
        .then(schedule => {
          let schedules = [];
          request.preferred_schedule.forEach(schedule => {
            schedule.date = new Date(schedule.date);
            schedules.push(schedule);
          });

          let replacements = {};
          request.pms_request.pms.change_items.forEach((item, index) => {
            replacements[item] = {};
            replacements[item].index = index;
            replacements[item].type = request.pms_request.replacements[index];
          });

          this.setState({
            contentIndex: index,
            schedule,
            mdlReopen: !mdlReopen,
            preferredSchedules: schedules,
            replacementTypes: replacements,
            selectedOilType: request.pms_request.oil_type,
            validatedPreferredSchedule: true,
            validatedSelectedOilType: true,
            validatedReplacementTypes: true
          });
        })
        .catch(error => console.log(error));
    } else {
      this.setState({
        menuIndex: 0,
        mdlReopen: !mdlReopen,
        preferredSchedules: [{}],
        replacementTypes: {},
        selectedOilType: null,
        validatedPreferredSchedule: false,
        validatedSelectedOilType: false,
        validatedReplacementTypes: false
      });
    }
  };

  _addOtherItems = () => {
    let { otherItems } = this.state;
    otherItems.push({ entry: "", price: 0 });
    this.setState({ otherItems }, this._getTotalCost);
  };

  _handleAdditionalItem = (event, index) => {
    let { otherItems } = this.state;
    let item = otherItems[index];
    item.entry = event.target.value;
    this.setState({ otherItems });
  };

  _handleAdditionalItemPrice = (event, index) => {
    let { otherItems } = this.state;
    let item = otherItems[index];
    item.price = event.target.value;
    this.setState({ otherItems }, this._getTotalCost);
  };

  _handleOtherReplacementItems = (event, item) => {
    let { otherReplacementItems } = this.state;
    otherReplacementItems[item] = event.target.value;
    this.setState({ otherReplacementItems }, this._getTotalCost);
  };

  _getTotalCost = () => {
    const {
      contentIndex,
      otherItems,
      otherLiters,
      otherReplacementItems
    } = this.state;
    const { requests, otherPrices } = this.props;

    let sum =
      otherLiters *
      otherPrices.oil_prices.values[
        requests[contentIndex].pms_others_request.value
      ];

    const item = otherPrices
      ? otherPrices.labor_prices.find(
          dataObject => requests[contentIndex].car.type === dataObject.car_type
        )
      : null;

    if (item) {
      sum += Number(item.price);
    }

    for (let i = 0; i < otherItems.length; i++) {
      sum += Number(otherItems[i].price);
    }

    for (let key in otherReplacementItems) {
      sum += Number(otherReplacementItems[key]);
    }

    this.setState({ totalPrice: sum });
  };

  _toggleModalCreation = (id, index) => {
    const {
      getShopPmsLaborPrice,
      getShopPmsOilPrice,
      requests,
      getPmsOtherPrices
    } = this.props;
    const { mdlCreation, mdlCreationOther } = this.state;
    let { totalPrice } = this.state;
    const request = requests[index];

    if (request) {
      if (request.type === "preventive") {
        const {
          pms_request: {
            oil_type,
            pms: { mileage }
          },
          car: { type }
        } = request;
        getShopPmsLaborPrice(mileage, type)
          .then(laborPrice => {
            getShopPmsOilPrice(mileage, oil_type)
              .then(oilPrice => {
                if (laborPrice.labor_price) {
                  totalPrice += Number(laborPrice.labor_price.price);
                }

                this.setState({
                  contentIndex: index,
                  freebies: [],
                  requestId: id,
                  menuIndex: 0,
                  mdlCreation: !mdlCreation,
                  notes: null,
                  replacements: {},
                  reviewed: false,
                  selectedSchedule: null,
                  selectedShop: null,
                  totalPrice,
                  oilPrice,
                  totalReplacementsPrice: 0,
                  validatedPrice: false,
                  validatedSchedule: false,
                  validatedShop: false
                });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const {
          pms_others_request: { masterlist_pms_others_id }
        } = request;
        getPmsOtherPrices(masterlist_pms_others_id)
          .then(({ labor_prices: laborPrices }) => {
            const item = laborPrices
              ? laborPrices.find(
                  dataObject => request.car.type === dataObject.car_type
                )
              : null;

            if (item) {
              totalPrice += Number(item.price);
            }

            this.setState({
              contentIndex: index,
              mdlCreation: false,
              mdlCreationOther: !mdlCreationOther,
              totalPrice,
              selectedSchedule: null,
              selectedShop: null,
              notes: null,
              otherLaborPrice: item,
              freebies: [],
              requestId: id,
              menuIndex: 0,
              validatedSchedule: false,
              validatedShop: false
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      this.setState({
        freebies: [],
        menuIndex: 0,
        mdlCreation: false,
        mdlCreationOther: false,
        notes: null,
        replacements: {},
        reviewed: false,
        selectedSchedule: null,
        selectedShop: null,
        totalPrice: 0,
        totalReplacementsPrice: 0,
        validatedPrice: false,
        validatedSchedule: false,
        validatedShop: false
      });
    }
  };

  render = () => {
    const {
      laborPrice,
      oilPrice,
      pmsShops,
      user,
      timeOptions,
      oilTypeOptions,
      partTypeOptions,
      otherPrices
    } = this.props;
    const {
      errorMessages,
      successMessages,
      contentIndex,
      freebies,
      isFetchingRequests,
      mdlCreation,
      mdlCreationOther,
      mdlReopen,
      menuIndex,
      notes,
      replacements,
      requests,
      reviewed,
      selectedSchedule,
      selectedShop,
      schedule,
      totalPrice,
      totalReplacementsPrice,
      validatedPrice,
      validatedSchedule,
      validatedShop,
      timers,
      validatedPreferredSchedule,
      validatedReplacementTypes,
      validatedSelectedOilType,
      preferredSchedules,
      selectedOilType,
      replacementTypes,
      otherLiters,
      otherLaborPrice,
      otherItems,
      otherReplacementItems
    } = this.state;
    const validated =
      validatedPrice &&
      validatedSchedule &&
      validatedShop &&
      laborPrice &&
      laborPrice.labor_price &&
      oilPrice &&
      oilPrice.oil_price &&
      reviewed;
    const validatedOther =
      validatedSchedule &&
      validatedShop &&
      otherPrices &&
      otherLiters &&
      reviewed;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Requests"
            subtitle={
              user.user_type === USER_TYPE_CUSTOMER ? "Customer" : "Pending"
            }
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
            {user.user_type === USER_TYPE_CUSTOMER ? (
              <CustomerRequests
                events={{
                  handleCancellation: this._handleCancellation,
                  toggleModalReopen: this._toggleModalReopen
                }}
                isFetching={isFetchingRequests}
                requests={requests}
              />
            ) : (
              <PendingRequests
                events={{ toggleModalCreation: this._toggleModalCreation }}
                isFetching={isFetchingRequests}
                requests={requests}
                timers={timers}
              />
            )}
          </Col>
        </Row>
        {mdlReopen && (
          <CreatePMSRequestModal
            current={menuIndex}
            data={{
              content: {
                ...requests[contentIndex],
                schedule: schedule.schedule
              },
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
              submit: this._reopen
            }}
            open={mdlReopen}
            toggle={this._toggleModalReopen}
            validated={
              validatedPreferredSchedule &&
              validatedSelectedOilType &&
              validatedReplacementTypes
            }
          />
        )}
        {mdlCreationOther && (
          <CreateOtherEstimateModal
            current={menuIndex}
            data={{
              content: requests[contentIndex],
              freebies,
              notes,
              otherPrices,
              otherLiters,
              pmsShops,
              replacements,
              reviewed,
              selectedSchedule,
              selectedShop,
              totalPrice,
              otherLaborPrice,
              otherItems,
              otherReplacementItems
            }}
            errorMessages={errorMessages}
            events={{
              handleChkReviewed: this._handleChkReviewed,
              handleFreebies: this._handleFreebies,
              handleNotes: this._handleNotes,
              handleOtherLitersInput: this._handleOtherLitersInput,
              handleSelectedSchedule: this._handleSelectedSchedule,
              handleSelectedShop: this._handleSelectedShop,
              next: this._next,
              previous: this._previous,
              submit: this._submit,
              addOtherItems: this._addOtherItems,
              handleAdditionalItem: this._handleAdditionalItem,
              handleAdditionalItemPrice: this._handleAdditionalItemPrice,
              handleOtherReplacementItems: this._handleOtherReplacementItems
            }}
            open={mdlCreationOther}
            toggle={this._toggleModalCreation}
            validated={validatedOther}
          />
        )}
        {mdlCreation && (
          <CreateEstimateModal
            current={menuIndex}
            data={{
              content: requests[contentIndex],
              freebies,
              laborPrice,
              notes,
              oilPrice,
              pmsShops,
              replacements,
              reviewed,
              selectedSchedule,
              selectedShop,
              totalPrice,
              totalReplacementsPrice
            }}
            errorMessages={errorMessages}
            events={{
              handleChkReviewed: this._handleChkReviewed,
              handleFreebies: this._handleFreebies,
              handleNotes: this._handleNotes,
              handlePriceInput: this._handlePriceInput,
              handleLitersInput: this._handleLitersInput,
              handleSelectedSchedule: this._handleSelectedSchedule,
              handleSelectedShop: this._handleSelectedShop,
              next: this._next,
              previous: this._previous,
              submit: this._submit
            }}
            open={mdlCreation}
            toggle={this._toggleModalCreation}
            validated={validated}
          />
        )}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  laborPrice: state.servicesReducer.laborPrice,
  oilPrice: state.servicesReducer.oilPrice,
  pmsShops: state.shopsReducer.pmsShops,
  requests: state.requestsReducer.requests,
  oilTypeOptions: state.servicesReducer.oilTypeOptions,
  partTypeOptions: state.servicesReducer.partTypeOptions,
  timeOptions: state.requestsReducer.timeOptions,
  otherPrices: state.servicesReducer.otherPrices
});

export default withTranslation()(
  connect(mapStateToProps, {
    cancelRequest,
    createEstimate,
    getCarSchedule,
    getPmsEnabledShops,
    getPmsOtherPrices,
    getRequests,
    getShopPmsLaborPrice,
    getShopPmsOilPrice,
    getScheduleTime,
    getOilTypeOptions,
    getPartTypeOptions,
    requestPms
  })(Requests)
);
