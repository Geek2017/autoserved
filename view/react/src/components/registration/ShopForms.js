import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormInput,
  FormCheckbox,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "shards-react";

import AlertMessages from "../common/AlertMessages";
import { actions as authActions } from "../../modules/authentication";
import { APP_TOC_URL, APP_PRIVACY_URL } from "../../utils/constants";
import { validator } from "../../utils/helper";

const { registerShop } = authActions;

class ShopForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 5,
      accepted: false,
      attemptRegister: false,
      errorMessages: [],
      successMessages: [],
      infoMessages: [],
      selCountry: null,
      txtFirstName: null,
      txtLastName: null,
      txtEmail: null,
      txtMobileNumber: null,
      txtShopName: null
    };
  }

  componentWillMount = () => {
    this.setState({ selCountry: "Philippines" });
  };

  _handleAgreement = () => {
    const { accepted } = this.state;
    this.setState({ accepted: !accepted });
  };

  _handleCountry = event => {
    this.setState({ selCountry: event.target.value });
  };

  _handleEmail = event => {
    this.setState({ txtEmail: event.target.value });
  };

  _handleFirstName = event => {
    this.setState({ txtFirstName: event.target.value });
  };

  _handleLastName = event => {
    this.setState({ txtLastName: event.target.value });
  };

  _handleMobileNumber = event => {
    this.setState({ txtMobileNumber: event.target.value });
  };

  _handleShopName = event => {
    this.setState({ txtShopName: event.target.value });
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptRegister: true }, () => {
      let errorMessages = [];
      let successMessages = [];
      let infoMessages = [];
      const { registerShop, t, history } = this.props;
      const {
        selCountry: country,
        txtFirstName: fname,
        txtLastName: lname,
        txtEmail: email,
        txtMobileNumber: contact,
        txtShopName: name
      } = this.state;
      registerShop({
        fname,
        lname,
        country,
        email,
        contact,
        name
      })
        .then(shop => {
          if (shop) {
            successMessages.push({
              message: t("translation.successRegisterShop", shop)
            });
            this.setState(
              {
                attemptRegister: false,
                successMessages,
                errorMessages,
                accepted: false,
                selCountry: null,
                txtShopName: null,
                txtEmail: null,
                txtFirstName: null,
                txtLastName: null,
                txtMobileNumber: null
              },
              () => {
                setInterval(() => {
                  const { countdown } = this.state;
                  infoMessages = [
                    { message: `Redirecting to login in ${countdown}...` }
                  ];
                  this.setState({ infoMessages, countdown: countdown - 1 });

                  if (countdown === 0) {
                    history.push("/login");
                  }
                }, 1000);
              }
            );
          }
        })
        .catch(error => {
          const { data, response } = error;

          if (response) {
            const { data } = response;
            Object.keys(data.errors).map(key =>
              data.errors[key].map(message => errorMessages.push({ message }))
            );
          } else if (data) {
            const { errors } = data;
            errorMessages = errorMessages.concat(errors);
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages, attemptRegister: false });
        });
    });
  };

  render = () => {
    const { authenticated, location, t } = this.props;
    const {
      accepted,
      attemptRegister,
      errorMessages,
      successMessages,
      infoMessages,
      txtEmail,
      txtMobileNumber,
      txtShopName,
      txtFirstName,
      txtLastName
    } = this.state;
    const validShopName = validator.isValidCompanyName(txtShopName);
    const validFirstName = validator.isValidName(txtFirstName);
    const validLastName = validator.isValidName(txtLastName);
    const validEmail = validator.isValidEmail(txtEmail);
    const validMobileNumber = validator.isValidMobileNumber(txtMobileNumber);
    const disabledButton =
      !accepted ||
      attemptRegister ||
      !validShopName ||
      !validFirstName ||
      !validLastName ||
      !validEmail ||
      !validMobileNumber;
    const { from } = location.state || { from: { pathname: "/" } };
    return authenticated === true ? (
      <Redirect to={from} />
    ) : (
      <div>
        <AlertMessages
          errorMessages={errorMessages}
          successMessages={successMessages}
          infoMessages={infoMessages}
        />
        <Form>
          <FormGroup>
            <label htmlFor="txtShopName">Shop Name</label>
            <FormInput
              type="text"
              id="txtShopName"
              placeholder="Enter shop name"
              onChange={this._handleShopName}
              value={txtShopName || ""}
              invalid={txtShopName !== null && !validShopName}
            />
            <FormFeedback valid={validShopName}>Invalid shop name</FormFeedback>
          </FormGroup>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label htmlFor="txtFirstName">First Name</label>
                <FormInput
                  type="text"
                  id="txtFirstName"
                  placeholder="Enter first name"
                  onChange={this._handleFirstName}
                  value={txtFirstName || ""}
                  invalid={txtFirstName !== null && !validFirstName}
                />
                <FormFeedback valid={validFirstName}>
                  First name should not be empty
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label htmlFor="txtLastName">Last Name</label>
                <FormInput
                  type="text"
                  id="txtLastName"
                  placeholder="Enter last name"
                  onChange={this._handleLastName}
                  value={txtLastName || ""}
                  invalid={txtLastName !== null && !validLastName}
                />
                <FormFeedback valid={validLastName}>
                  Last name should not be empty
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <label htmlFor="txtEmail">Email Address</label>
            <FormInput
              type="email"
              id="txtEmail"
              placeholder="Enter email address"
              onChange={this._handleEmail}
              value={txtEmail || ""}
              invalid={txtEmail !== null && !validEmail}
            />
            <FormFeedback valid={validEmail}>
              Invalid email address
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <label htmlFor="txtMobileNumber">Shop's Mobile Number</label>
            <InputGroup className="mb-3">
              <InputGroupAddon type="prepend">
                <InputGroupText>+63</InputGroupText>
              </InputGroupAddon>
              <FormInput
                type="text"
                id="txtMobileNumber"
                placeholder="Enter mobile number"
                onChange={this._handleMobileNumber}
                value={txtMobileNumber || ""}
                invalid={txtMobileNumber !== null && !validMobileNumber}
              />
              <FormFeedback valid={validMobileNumber}>
                Invalid mobile number
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <label htmlFor="selCountry">Country</label>
            <FormSelect id="selCountry" onChange={this._handleCountry}>
              <option value="Philippines">Philippines</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <fieldset>
              <FormCheckbox
                id="formsCheckboxDefault"
                onChange={this._handleAgreement}
                checked={accepted}
              >
                {t("common.lblAgree")}{" "}
                <a target="_new" href={APP_TOC_URL}>
                  {t("common.lblToc")}
                </a>{" "}
                and{" "}
                <a target="_new" href={APP_PRIVACY_URL}>
                  {t("common.lblPrivacy")}
                </a>
              </FormCheckbox>
            </fieldset>
          </FormGroup>
          <Button
            pill
            theme="accent"
            className="d-table mx-auto"
            onClick={this._submit}
            type="submit"
            disabled={disabledButton}
          >
            {attemptRegister ? (
              <div>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">{t("common.lblLoading")}</span>
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </Form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  authenticated: state.sessionReducer.authenticated
});

export default withRouter(
  withTranslation()(connect(mapStateToProps, { registerShop })(ShopForms))
);
