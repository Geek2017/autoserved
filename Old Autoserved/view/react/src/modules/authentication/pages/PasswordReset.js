import React, { Component } from 'react';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  FormInput,
  Row
} from 'shards-react';

import { actions as authActions } from '../index';
import { LOGO } from '../../../utils/constants';
import { validator } from '../../../utils/helper';

const { resetPassword } = authActions;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      successMessages: [],
      password: null,
      confirmPassword: null
    };
  }

  _handlePassword = event => {
    const { value: password } = event.target;
    this.setState({ password });
  };

  _handleConfirmPassword = event => {
    const { value: confirmPassword } = event.target;
    this.setState({ confirmPassword });
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptSubmit: true }, () => {
      const { location, resetPassword, t } = this.props;
      const { password, confirmPassword: confirm_password } = this.state;
      let errorMessages = [];
      let successMessages = [];
      const { email, token } = queryString.parse(location.search);
      resetPassword({ password, confirm_password, email, token })
        .then(() => {
          successMessages.push({
            message: 'Your password has been reset. Please proceed to login.'
          });
          this.setState({
            attemptSubmit: false,
            password: null,
            confirmPassword: null,
            successMessages
          });
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t('translation.generalError') });
          }

          this.setState({ errorMessages, attemptSubmit: false });
        });
    });
  };

  render = () => {
    const { t } = this.props;
    const {
      attemptSubmit,
      errorMessages,
      successMessages,
      password,
      confirmPassword
    } = this.state;
    const validPassword = validator.isValidPassword(password, confirmPassword);
    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                <img
                  className="d-table mx-auto mb-3"
                  src={LOGO}
                  alt="AutoServed Logo"
                />
                <h5 className="auth-form__title text-center mb-4">
                  Change Password
                </h5>
                {successMessages.map((success, index) => (
                  <Alert
                    key={index}
                    fade
                    theme="success"
                    className="outline-success rounded"
                  >
                    <p className="mb-0">{success.message}</p>
                  </Alert>
                ))}
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
                    <label htmlFor="txtPassword">Password</label>
                    <FormInput
                      type="password"
                      id="txtPassword"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password || ''}
                      onChange={this._handlePassword}
                      invalid={
                        password !== null &&
                        confirmPassword !== null &&
                        !validPassword
                      }
                    />
                    <FormFeedback valid={validPassword}>
                      {t('validation.errPassword')}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="txtConfirmPassword">Confirm Password</label>
                    <FormInput
                      type="password"
                      id="txtConfirmPassword"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      onChange={this._handleConfirmPassword}
                      value={confirmPassword || ''}
                      invalid={
                        password !== null &&
                        confirmPassword !== null &&
                        !validPassword
                      }
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    onClick={this._submit}
                    disabled={!validPassword}
                  >
                    {attemptSubmit ? (
                      <div>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          {t('common.lblLoading')}
                        </span>
                      </div>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </Form>
              </CardBody>
            </Card>
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/login" className="mx-auto">
                Take me back to login.
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default withTranslation()(
  connect(
    null,
    { resetPassword }
  )(PasswordReset)
);
