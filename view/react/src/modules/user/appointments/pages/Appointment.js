import React, { Component } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Col,
  Progress,
  Row
} from "shards-react";

import { actions as appointmentsActions } from "../index";
import { actions as carProfilesActions } from "../../../customer/car-profiles";
import PageTitle from "../../../../components/common/PageTitle";
import CarDetails from "../../../../components/car-profile/CarDetails";
import Details from "../../../../components/shop-profile/Details";
import PmsDetails from "../../../../components/services/PmsDetails";
import AppointmentFinalization from "../../../../components/appointments/AppointmentFinalization";
import RepairHistory from "../../../../components/car-profile/RepairHistory";
import AlertMessages from "../../../../components/common/AlertMessages";
import currencyFormatter from "../../../../utils/helper/currency-formatter";

const {
  getAppointment,
  cancelAppointment,
  startAppointment,
  completeAppointment,
  rateCustomer,
  rateShop
} = appointmentsActions;

const { getRepairHistory } = carProfilesActions;

const status = {
  cancelled: "danger",
  pending: "secondary",
  approved: "success",
  started: "primary",
  completed: "success"
};

const progress = {
  cancelled: 0,
  pending: 25,
  approved: 50,
  started: 75,
  completed: 100
};

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      additionalItems: [],
      isFetchingAppointment: true,
      isFetchingRepairHistory: true,
      mdlAppointment: false,
      feedback: null,
      rate: 0,
      menuIndex: 0
    };
  }

  componentDidMount = () => {
    this._getAppointment();
  };

  _start = () => {
    const confirm = window.confirm(
      "Are you sure you want to start the appointment?"
    );

    if (confirm) {
      const { startAppointment, match } = this.props;
      startAppointment(match.params.id)
        .then(this._getAppointment)
        .catch(error => console.log(error));
    }
  };

  _cancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (confirm) {
      const { cancelAppointment, match } = this.props;
      cancelAppointment(match.params.id)
        .then(this._getAppointment)
        .catch(error => console.log(error));
    }
  };

  _complete = () => {
    const confirm = window.confirm(
      "Are you sure you want to complete this appointment?"
    );

    if (confirm) {
      const { completeAppointment, match } = this.props;
      completeAppointment(match.params.id)
        .then(this._getAppointment)
        .catch(error => console.log(error));
    }
  };

  _next = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex + 1 });
  };

  _previous = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex - 1 });
  };

  _handleAdditionalItems = text => {
    this.setState({ additionalItems: text });
  };

  _handleFeedback = event => {
    this.setState({ feedback: event.target.value });
  };

  _rate = rate => {
    this.setState({ rate });
  };

  _rateCustomer = () => {
    const {
      rateCustomer,
      match: {
        params: { id: appointmentId }
      },
      appointment: {
        estimate: { customer_id, shop }
      }
    } = this.props;

    const {
      rate: rating,
      feedback: description,
      additionalItems: additional_work_items
    } = this.state;
    rateCustomer(appointmentId, {
      shop_id: shop.id,
      for_customer_id: customer_id,
      rating,
      description,
      additional_work_items
    })
      .then(() => {
        let successMessages = [{ message: "Rating has been submitted!" }];
        this._getAppointment();
        this._toggleModal();
        this.setState({ successMessages });
      })
      .catch(error => console.log(error));
  };

  _rateShop = () => {
    const {
      rateShop,
      match: {
        params: { id: appointmentId }
      },
      appointment: {
        estimate: { shop }
      }
    } = this.props;
    const {
      rate: rating,
      feedback: description,
      additionalItems: additional_work_items
    } = this.state;
    rateShop(appointmentId, {
      for_shop_id: shop.id,
      rating,
      description,
      additional_work_items
    })
      .then(() => {
        let successMessages = [{ message: "Rating has been submitted!" }];
        this._getAppointment();
        this._toggleModal();
        this.setState({ successMessages });
      })
      .catch(error => console.log(error));
  };

  _getAppointment = () => {
    const { getAppointment, getRepairHistory, match } = this.props;
    getAppointment(match.params.id)
      .then(appointment => {
        getRepairHistory(appointment.car_id)
          .then(() => {
            this.setState({ isFetchingRepairHistory: false });
          })
          .catch(error => console.log(error));
        this.setState({ isFetchingAppointment: false });
      })
      .catch(error => console.log(error));
  };

  _toggleModal = () => {
    const { mdlAppointment } = this.state;
    this.setState({ mdlAppointment: !mdlAppointment });
  };

  render = () => {
    const { appointment, user, history } = this.props;
    const {
      mdlAppointment,
      menuIndex,
      isFetchingRepairHistory,
      additionalItems,
      rate,
      feedback,
      successMessages,
      errorMessages
    } = this.state;
    const validated = rate > 0 && feedback !== null;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Appointment"
            subtitle="Scheduled"
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Link
              className="btn btn-white mx-auto ml-sm-auto mr-sm-0 mr-lg-3"
              to={`/appointments`}
            >
              &larr; Go Back
            </Link>
            {appointment && (
              <>
                {appointment.status === "approved" &&
                  user.user_type === "vendor" && (
                    <Button
                      theme="info"
                      className="mr-sm-0 mr-lg-3"
                      onClick={this._start}
                    >
                      <i className="material-icons">done</i> Start Job
                    </Button>
                  )}
                {appointment.status === "started" &&
                  user.user_type === "vendor" && (
                    <Button
                      theme="success"
                      className="mr-sm-0 mr-lg-3"
                      onClick={this._complete}
                    >
                      <i className="material-icons">done</i> Mark as Done
                    </Button>
                  )}
                {appointment.customer_rating === null &&
                  appointment.status === "completed" &&
                  user.user_type === "customer" && (
                    <Button
                      theme="warning"
                      className="mr-sm-0 mr-lg-3 text-white"
                      onClick={this._toggleModal}
                    >
                      <i className="material-icons">star</i> Rate Shop
                    </Button>
                  )}
                {appointment.customer_rating !== null &&
                  appointment.shop_rating === null &&
                  appointment.status === "completed" &&
                  user.user_type === "vendor" && (
                    <Button
                      theme="warning"
                      className="mr-sm-0 mr-lg-3 text-white"
                      onClick={this._toggleModal}
                    >
                      <i className="material-icons">star</i> Rate Customer
                    </Button>
                  )}
                {appointment.status !== "completed" &&
                user.user_type === "vendor" &&
                moment(new Date()) <=
                  moment(appointment.scheduled_date).subtract(2, "d") ? (
                  <Button
                    theme="danger"
                    className="mr-sm-0"
                    onClick={this._cancel}
                  >
                    <i className="material-icons">close</i> Cancel
                  </Button>
                ) : null}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <AlertMessages
              successMessages={successMessages}
              errorMessages={errorMessages}
            />
          </Col>
        </Row>
        {appointment && (
          <Row>
            <Col lg="4">
              <CarDetails car={appointment.estimate.request.car} />
              <Details shop={appointment.estimate.shop} />
            </Col>
            <Col lg="8">
              <Card className="mb-4">
                <CardBody>
                  <Row>
                    <Col lg="6" className="pb-3 pt-2">
                      <div className="progress-wrapper">
                        <div className={`progress-label text-capitalize`}>
                          Current Status:{" "}
                          <span
                            className={`text-${status[appointment.status]}`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                        <Progress
                          className="progress-sm"
                          value={`${progress[appointment.status]}`}
                          striped
                        >
                          <span className="progress-value">
                            {progress[appointment.status]}%
                          </span>
                        </Progress>
                      </div>
                    </Col>
                    <Col lg="3">
                      <p className="text-center mb-0">
                        {moment(appointment.scheduled_date).format(
                          "MMM DD, YYYY"
                        )}{" "}
                        - {appointment.scheduled_time}
                      </p>
                      <p className="text-center mb-0">
                        <small>
                          {moment(appointment.scheduled_date).format("dddd")}
                        </small>
                      </p>
                    </Col>
                    <Col lg="3">
                      <h6 className="text-center mb-0 text-success font-weight-bold">
                        {currencyFormatter.format(appointment.estimate.total)}
                      </h6>
                      <p className="text-center mb-0">
                        <small>Total</small>
                      </p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {appointment.estimate.request.type === "preventive" && (
                <PmsDetails
                  pms={appointment.estimate.request.pms_request.pms}
                />
              )}
              {appointment.estimate.request.type === "other services" && (
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Other PMS Service - Details</h6>
                  </CardHeader>
                  <CardBody className="px-4">
                    <Row>
                      <Col lg="12">
                        <strong>Change Oil Service</strong>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter />
                </Card>
              )}
              <RepairHistory
                isFetching={isFetchingRepairHistory}
                history={history}
              />
            </Col>
          </Row>
        )}
        <AppointmentFinalization
          current={menuIndex}
          data={{
            additionalItems,
            rate,
            feedback,
            user_type: user.user_type
          }}
          open={mdlAppointment}
          toggle={this._toggleModal}
          events={{
            next: this._next,
            previous: this._previous,
            handleAdditionalItems: this._handleAdditionalItems,
            handleFeedback: this._handleFeedback,
            rate: this._rate,
            submit:
              user.user_type === "vendor" ? this._rateCustomer : this._rateShop
          }}
          validated={validated}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  appointment: state.appointmentsReducer.appointment,
  user: state.sessionReducer.user,
  history: state.carProfilesReducer.history
});

export default withTranslation()(
  connect(mapStateToProps, {
    getAppointment,
    cancelAppointment,
    startAppointment,
    getRepairHistory,
    completeAppointment,
    rateCustomer,
    rateShop
  })(Appointments)
);
