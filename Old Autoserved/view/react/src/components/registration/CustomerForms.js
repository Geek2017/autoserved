import React, { Component } from "react";
import queryString from "query-string";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormCheckbox,
  FormFeedback,
  FormGroup,
  FormInput,
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

const { registerCustomer, validateFleet } = authActions;

class CustomerForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 5,
      // T&C accept flag
      accepted: false,
      // Register flag
      attemptRegister: false,
      // Error messages container
      errorMessages: [],
      // Success messages container
      successMessages: [],
      infoMessages: [],
      // Form values
      selCountry: null,
      txtEmail: null,
      txtFirstName: null,
      txtLastName: null,
      txtPassword: null,
      txtConfirmPassword: null,
      txtContact: null
    };
  }

  componentDidMount = () => {
    const { location, validateFleet } = this.props;
    this.setState({ selCountry: "Philippines" });
    validateFleet(queryString.parse(location.search)).catch(
      error => error && console.log(error)
    );
  };

  _handleAgreement = () => {
    const { accepted } = this.state;
    this.setState({ accepted: !accepted });
  };

  _handleConfirmPassword = event => {
    this.setState({ txtConfirmPassword: event.target.value });
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

  _handlePassword = event => {
    this.setState({ txtPassword: event.target.value });
  };

  _handleContact = event => {
    this.setState({ txtContact: event.target.value });
  };

  _handleCountry = event => {
    this.setState({ selCountry: event.target.value });
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptRegister: true }, () => {
      let errorMessages = [];
      let successMessages = [];
      let infoMessages = [];
      const { registerCustomer, fleet, t, history } = this.props;
      const {
        selCountry: country,
        txtEmail: email,
        txtFirstName: fname,
        txtLastName: lname,
        txtPassword: password,
        txtContact: contact
      } = this.state;
      registerCustomer({
        fleet_id: fleet ? fleet.id : null,
        fname,
        lname,
        country,
        email,
        contact,
        password
      })
        .then(customer => {
          if (customer) {
            successMessages.push({
              message: t("translation.successRegisterCustomer")
            });
            this.setState(
              {
                attemptRegister: false,
                accepted: false,
                successMessages,
                errorMessages,
                txtEmail: null,
                txtFirstName: null,
                txtLastName: null,
                txtPassword: null,
                txtConfirmPassword: null,
                txtContact: null
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
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else if (error.response) {
            error.response.data.data.errors.email.map(message => {
              return errorMessages.push({ message });
            });
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages, attemptRegister: false });
        });
    });
  };

  render = () => {
    const { authenticated, fleet, location, t } = this.props;
    const {
      accepted,
      attemptRegister,
      errorMessages,
      successMessages,
      infoMessages,
      txtConfirmPassword,
      txtEmail,
      txtFirstName,
      txtLastName,
      txtPassword,
      txtContact
    } = this.state;
    const validFirstName = validator.isValidName(txtFirstName);
    const validLastName = validator.isValidName(txtLastName);
    const validEmail = validator.isValidEmail(txtEmail);
    const validContact = validator.isValidMobileNumber(txtContact);
    const validPassword = validator.isValidPassword(
      txtPassword,
      txtConfirmPassword
    );
    const disabledButton =
      !accepted ||
      attemptRegister ||
      !validFirstName ||
      !validLastName ||
      !validContact ||
      !validEmail ||
      !validPassword;
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
          {fleet && (
            <FormGroup>
              <label htmlFor="txtFleetName">Fleet Name</label>
              <FormInput id="txtFleetName" readOnly value={fleet.name} />
            </FormGroup>
          )}
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
            <label htmlFor="txtEmail">{t("common.lblEmail")}</label>
            <FormInput
              type="email"
              id="txtEmail"
              placeholder={t("common.phEmail")}
              autoComplete="email"
              value={txtEmail || ""}
              onChange={this._handleEmail}
              invalid={txtEmail !== null && !validEmail}
            />
            <FormFeedback valid={validEmail}>
              {t("validation.errEmail")}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <label htmlFor="txtPassword">{t("common.lblPassword")}</label>
            <FormInput
              type="password"
              id="txtPassword"
              placeholder={t("common.phPassword")}
              autoComplete="new-password"
              value={txtPassword || ""}
              onChange={this._handlePassword}
              invalid={
                txtPassword !== null &&
                txtConfirmPassword !== null &&
                !validPassword
              }
            />
            <FormFeedback valid={validPassword}>
              {t("validation.errPassword")}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <label htmlFor="txtConfirmPassword">
              {t("common.lblConfirmPassword")}
            </label>
            <FormInput
              type="password"
              id="txtConfirmPassword"
              placeholder={t("common.phConfirmPassword")}
              autoComplete="confirm-password"
              value={txtConfirmPassword || ""}
              onChange={this._handleConfirmPassword}
              invalid={
                txtPassword !== null &&
                txtConfirmPassword !== null &&
                !validPassword
              }
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="txtContact">Mobile Number</label>
            <InputGroup className="mb-3">
              <InputGroupAddon type="prepend">
                <InputGroupText>+63</InputGroupText>
              </InputGroupAddon>
              <FormInput
                type="text"
                id="txtContact"
                placeholder="Enter contact number"
                onChange={this._handleContact}
                value={txtContact || ""}
                invalid={txtContact !== null && !validContact}
              />
              <FormFeedback valid={validContact}>
                Invalid contact number
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <label htmlFor="selCountry">{t("common.lblCountry")}</label>
            <FormSelect id="selCountry" onChange={this._handleCountry}>
              <option>Philippines</option>
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
              t("translation.btnRegister")
            )}
          </Button>
        </Form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  authenticated: state.sessionReducer.authenticated,
  fleet: state.authenticationReducer.fleet
});

export default withRouter(
  withTranslation()(
    connect(mapStateToProps, { registerCustomer, validateFleet })(CustomerForms)
  )
);
