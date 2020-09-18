import React, { Component } from "react";
import queryString from "query-string";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormCheckbox,
  FormGroup,
  FormInput,
  Row
} from "shards-react";

import { actions as authActions } from "../index";
import { LOGO, DEFAULT_LOGIN_BANNER } from "../../../utils/constants";

const { login } = authActions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Login call flag
      attemptLogin: false,
      // Error messages container
      errorMessages: [],
      // Form values
      chkRemember: false,
      txtEmail: null,
      txtPassword: null
    };
  }

  _handleEmail = event => {
    const { value } = event.target;
    this.setState({ txtEmail: value });
  };

  _handlePassword = event => {
    const { value } = event.target;
    this.setState({ txtPassword: value });
  };

  _handleRememberState = () => {
    const { chkRemember } = this.state;
    this.setState({ chkRemember: !chkRemember });
  };

  _login = event => {
    event.preventDefault();
    this.setState({ attemptLogin: true }, () => {
      let errorMessages = [];
      const { login, history, location, t } = this.props;
      const { chkRemember, txtEmail, txtPassword } = this.state;
      const { token } = queryString.parse(location.search);
      const credentials = {
        email: txtEmail,
        password: txtPassword,
        rememberMe: chkRemember,
        token
      };
      login(credentials)
        .then(user => {
          if (user) {
            history.push("/dashboard");
          }
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t("translation.generalError") });
          }

          this.setState({ errorMessages, attemptLogin: false });
        });
    });
  };

  render = () => {
    const { authenticated, location, t } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };
    const {
      attemptLogin,
      errorMessages,
      txtEmail,
      txtPassword,
      chkRemember
    } = this.state;
    return authenticated === true ? (
      <Redirect to={from} />
    ) : (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="10" className="mx-auto my-auto">
            <Card className="overflow-hidden">
              <CardBody className="p-0">
                <Row>
                  <Col
                    style={{
                      backgroundImage: `url(${DEFAULT_LOGIN_BANNER})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                    lg="6"
                  >
                    <div className="p-5">
                      <h1 className="text-right text-white font-weight-bold display-4">
                        Bridging the gap between car owners and auto shops.
                      </h1>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="p-5 mx-5">
                      <img
                        className="d-table mx-auto mb-3"
                        src={LOGO}
                        alt={t("translation.appName")}
                      />
                      <h5 className="auth-form__title text-center mb-4">
                        {t("translation.ttlLogin")}
                      </h5>
                      {errorMessages.map((error, index) => (
                        <Alert
                          key={index}
                          fade
                          theme="danger"
                          className="outline-danger rounded"
                        >
                          <p className="mb-0">{error.message}</p>
                        </Alert>
                      ))}
                      <Form>
                        <FormGroup>
                          <label htmlFor="txtEmail">
                            {t("common.lblEmail")}
                          </label>
                          <FormInput
                            type="email"
                            id="txtEmail"
                            placeholder={t("common.phEmail")}
                            autoComplete="email"
                            onChange={this._handleEmail}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="txtPassword">
                            {t("common.lblPassword")}
                          </label>
                          <FormInput
                            type="password"
                            id="txtPassword"
                            placeholder={t("common.phPassword")}
                            autoComplete="current-password"
                            onChange={this._handlePassword}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormCheckbox
                            checked={chkRemember}
                            onChange={this._handleRememberState}
                          >
                            {t("common.lblRemember")}
                          </FormCheckbox>
                        </FormGroup>
                        <Button
                          pill
                          theme="accent"
                          className="d-table mx-auto"
                          onClick={this._login}
                          type="submit"
                          disabled={!txtEmail || !txtPassword || attemptLogin}
                        >
                          {attemptLogin ? (
                            <div>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="sr-only">
                                {t("common.lblLoading")}
                              </span>
                            </div>
                          ) : (
                            t("common.lblLogin")
                          )}
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/forgot-password">{t("translation.lnkForgot")}</Link>
              <Link to="/customer-registration" className="ml-auto">
                {t("translation.lnkRegister")}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  authenticated: state.sessionReducer.authenticated,
  user: state.sessionReducer.user
});

export default withTranslation()(connect(mapStateToProps, { login })(Login));
