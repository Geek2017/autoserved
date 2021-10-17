import React, { Component } from "react";
import moment from "moment";
import queryString from "query-string";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  Badge,
  CardHeader,
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Button
} from "shards-react";

import { actions as profileActions } from "../../profile";

import PageTitle from "../../../../components/common/PageTitle";
import CustomRadioButton from "../../../../components/common/CustomRadioForm";
import TopUpOptions from "../../../../components/common/TopUpOption";
import AlertMessages from "../../../../components/common/AlertMessages";
import options from "../../../../utils/helper/topup-values";
import { formatter } from "../../../../utils/helper";
import currencyFormatter from "../../../../utils/helper/currency-formatter";

const { topUp, getWallet, validateTopUp, getTransactions } = profileActions;

class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      infoMessages: [],
      amount: 2500,
      redirecting: false,
      paymentMethod: "paypal"
    };
  }

  componentDidMount = () => {
    const { validateTopUp, location, t } = this.props;
    const { paymentId, token, PayerID } = queryString.parse(location.search);
    this._getWallet();

    if (paymentId && token && PayerID) {
      let infoMessages = [{ message: "Processing payment..." }];
      let successMessages = [];
      let errorMessages = [];
      this.setState({ infoMessages, redirecting: true }, () => {
        validateTopUp(queryString.parse(location.search))
          .then(result => {
            if (result) {
              successMessages.push({
                message: "Payment has been credited to your account."
              });
              this.setState(
                {
                  infoMessages: [],
                  successMessages,
                  redirecting: false
                },
                this._getWallet
              );
            }
          })
          .catch(error => {
            if (Array.isArray(error)) {
              errorMessages = errorMessages.concat(error);
            } else {
              errorMessages.push({ message: t("translation.generalError") });
            }

            this.setState({
              errorMessages,
              infoMessages: [],
              attemptSubmit: false
            });
          });
      });
    }
  };

  _getWallet = () => {
    const { getWallet, getTransactions } = this.props;
    getWallet().catch(error => console.log(error));
    getTransactions().catch(error => console.log(error));
  };

  _getAmount = amount => {
    this.setState({ amount });
  };

  _submit = event => {
    event.preventDefault();
    const { topUp, t } = this.props;
    const { amount } = this.state;
    let errorMessages = [];
    this.setState({ redirecting: true }, () => {
      topUp(amount)
        .then(url => {
          window.scrollTo(0, 0);
          window.location = url;
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages, redirecting: false });
        });
    });
  };

  render = () => {
    const { wallet, transactions } = this.props;
    const {
      errorMessages,
      successMessages,
      infoMessages,
      redirecting
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="page-header py-4">
          <PageTitle
            title="Top Up"
            subtitle="Payment"
            className="text-sm-left mb-3"
          />
        </Row>

        <AlertMessages
          successMessages={successMessages}
          errorMessages={errorMessages}
          infoMessages={infoMessages}
        />
        <Row>
          <Col>
            <Card small className="mb-4 p-2">
              <CardBody className="text-center">
                <h4>Wallet Value</h4>
                <h4 className="mb-0 text-success font-weight-bold">
                  {formatter.format(wallet ? wallet.balance : 0)}
                </h4>
              </CardBody>
            </Card>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Transaction History</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="px-3">
                    {transactions.length ? (
                      transactions.map((transaction, index) => {
                        return (
                          <div key={index} className="border-bottom p-2">
                            <p className="mb-0">
                              <span
                                className={
                                  transaction.type === "withdraw"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {currencyFormatter.format(transaction.amount)}
                              </span>{" "}
                              <Badge
                                pill
                                theme={
                                  transaction.confirmed ? "success" : "info"
                                }
                              >
                                {transaction.confirmed
                                  ? "Confirmed"
                                  : "Pending"}
                              </Badge>
                            </p>
                            <p className="mb-0">
                              <small>
                                {moment(transaction.created_at).fromNow()}
                              </small>
                            </p>
                            <small>
                              ID: <strong>{transaction.uuid}</strong>
                            </small>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center mb-0">No transactions found</p>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8">
            <Card small className="mb-4 p-2">
              <CardBody className="mb-4 text-center">
                <div className="mt-2 mb-4">
                  <h2 className="text-center">Stock up on Credits</h2>
                  <h6 className="text-center">
                    Buy credits to get a hassle free transaction experience with
                    AutoServed
                  </h6>
                </div>
                <div className="pt-2 pb-2">
                  <TopUpOptions items={options} getAmount={this._getAmount} />
                </div>
                <div className="d-flex justify-content-center">
                  <h6 className="d-inline mr-2">Payment Method:</h6>
                  <CustomRadioButton />
                </div>
                <div className="d-flex align-items-center flex-column">
                  <Button
                    disabled={redirecting}
                    className="w-25"
                    onClick={this._submit}
                  >
                    Proceed to PayPal
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  wallet: state.profilesReducer.wallet,
  transactions: state.profilesReducer.transactions
});

export default withTranslation()(
  connect(mapStateToProps, {
    topUp,
    getWallet,
    validateTopUp,
    getTransactions
  })(TopUp)
);
