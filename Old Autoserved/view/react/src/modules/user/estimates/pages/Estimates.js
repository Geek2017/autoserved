import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Container, Col, Row } from "shards-react";

import { actions as estimatesActions } from "../index";
import PageTitle from "../../../../components/common/PageTitle";
import AlertMessages from "../../../../components/common/AlertMessages";
import { USER_TYPE_CUSTOMER } from "../../../../utils/constants";
import EstimateQuotes from "../../../../components/estimates/EstimateQuotes";
import ShopEstimates from "../../../../components/estimates/ShopEstimates";
import CreateAppointmentModal from "../../../../components/estimates/CreateAppointmentModal";

const { createAppointment, getEstimates, cancelEstimates } = estimatesActions;

class Estimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      contentIndex: null,
      estimateId: null,
      isFetchingEstimates: true,
      mdlCreation: false,
      menuIndex: 0,
      reviewed: false
    };
  }

  componentDidMount = () => {
    this._getEstimates();
  };

  _getEstimates = () => {
    const { getEstimates } = this.props;
    getEstimates()
      .then(() => {
        this.setState({ isFetchingEstimates: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleChkReviewed = () => {
    const { reviewed } = this.state;
    this.setState({ reviewed: !reviewed });
  };

  _next = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex + 1 });
  };

  _previous = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex - 1 });
  };

  _submit = (event, index) => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { createAppointment, estimates, t } = this.props;
    const { estimateId, contentIndex } = this.state;
    createAppointment(estimates[contentIndex].request.car.id, estimateId)
      .then(() => {
        successMessages.push({
          message: "Appointment has been submitted!"
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

  _toggleModalCreation = (id, index) => {
    const { mdlCreation } = this.state;
    this.setState({
      mdlCreation: !mdlCreation,
      contentIndex: index,
      estimateId: id
    });
  };

  _cancelEstimate = estimate_id => {
    const { cancelEstimates, t } = this.props;
    let errorMessages = [];
    let successMessages = [];
    const confirmation = window.confirm(
      "You are about to cancel this estimation. Confirm if you are sure."
    );

    if (confirmation) {
      cancelEstimates(estimate_id)
        .then(() => {
          successMessages.push({
            message: "Estimate has been cancelled!"
          });
          this.setState({ successMessages }, this._getEstimates);
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

  render = () => {
    const { estimates, user } = this.props;
    const {
      errorMessages,
      successMessages,
      contentIndex,
      isFetchingEstimates,
      mdlCreation,
      menuIndex,
      reviewed
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Estimates"
            subtitle={
              user.user_type === USER_TYPE_CUSTOMER ? "Shop" : "Submitted"
            }
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
            {user.user_type === USER_TYPE_CUSTOMER ? (
              <EstimateQuotes
                isFetching={isFetchingEstimates}
                estimates={estimates}
                events={{ toggleModalCreation: this._toggleModalCreation }}
              />
            ) : (
              <ShopEstimates
                events={{
                  cancel: this._cancelEstimate
                }}
                isFetching={isFetchingEstimates}
                estimates={estimates}
              />
            )}
          </Col>
        </Row>
        <CreateAppointmentModal
          current={menuIndex}
          data={{
            content: estimates[contentIndex],
            reviewed
          }}
          errorMessages={errorMessages}
          events={{
            handleChkReviewed: this._handleChkReviewed,
            next: this._next,
            toggleModalCreation: this._toggleModalCreation,
            previous: this._previous,
            submit: this._submit
          }}
          open={mdlCreation}
          toggle={this._toggleModalCreation}
          validated={reviewed}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  estimates: state.estimatesReducer.estimates,
  user: state.sessionReducer.user
});

export default withTranslation()(
  connect(mapStateToProps, {
    createAppointment,
    getEstimates,
    cancelEstimates
  })(Estimates)
);
