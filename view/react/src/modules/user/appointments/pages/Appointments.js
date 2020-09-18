import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Container, Col, Row } from "shards-react";

import { actions as appointmentsActions } from "../index";
import { actions as profileActions } from "../../profile/index";
import PageTitle from "../../../../components/common/PageTitle";
import AlertMessages from "../../../../components/common/AlertMessages";
import AppointmentsList from "../../../../components/appointments/AppointmentsList";

const { getAppointments, approveAppointment } = appointmentsActions;
const { getWallet } = profileActions;

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      successMessages: [],
      isFetchingAppointments: true
    };
  }

  componentDidMount = () => {
    this._getAppointments();
  };

  _getAppointments = () => {
    const { getAppointments, getWallet } = this.props;
    getAppointments()
      .then(() => {
        this.setState({ isFetchingAppointments: false });
      })
      .catch(error => console.log(error));
    getWallet().catch(error => console.log(error));
  };

  _approve = (id, total) => {
    this.setState({ attemptSubmit: true }, () => {
      const { approveAppointment, wallet } = this.props;
      const amount = total * 0.05;
      const confirmation = window.confirm("Set this appointment?");

      if (confirmation) {
        if (wallet.balance > amount) {
          approveAppointment(id)
            .then(result => {
              if (result) {
                this.setState(
                  {
                    successMessages: [
                      {
                        message: "Appointment has been approved."
                      }
                    ]
                  },
                  this._getAppointments
                );
              } else {
              }
            })
            .catch(error => console.log(error));
        } else {
          this.setState({
            errorMessages: [{ message: "Your wallet balance is running low." }]
          });
        }
      }

      this.setState({ attemptSubmit: false });
    });
  };

  render = () => {
    const { appointments, user } = this.props;
    const {
      errorMessages,
      successMessages,
      isFetchingAppointments,
      attemptSubmit
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Appointments"
            subtitle="Scheduled"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages
              successMessages={successMessages}
              errorMessages={errorMessages}
            />
            <AppointmentsList
              attemptSubmit={attemptSubmit}
              appointments={appointments}
              isFetching={isFetchingAppointments}
              type={user.user_type}
              approve={this._approve}
            />
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  wallet: state.profilesReducer.wallet,
  user: state.sessionReducer.user,
  appointments: state.appointmentsReducer.appointments
});

export default withTranslation()(
  connect(mapStateToProps, { getAppointments, approveAppointment, getWallet })(
    Appointments
  )
);
