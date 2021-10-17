import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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

const { forgotPassword } = authActions;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      successMessages: [],
      email: null
    };
  }

  _handleEmail = event => {
    const { value: email } = event.target;
    this.setState({ email });
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptSubmit: true }, () => {
      const { forgotPassword, t } = this.props;
      const { email } = this.state;
      let errorMessages = [];
      let successMessages = [];
      forgotPassword(email)
        .then(() => {
          successMessages.push({
            message:
              'You will receive an email if you have an Autoserved account.'
          });
          this.setState({
            attemptSubmit: false,
            email: null,
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
    const { authenticated, location, t } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { attemptSubmit, errorMessages, successMessages, email } = this.state;
    const validEmail = validator.isValidEmail(email);
    return authenticated === true ? (
      <Redirect to={from} />
    ) : (
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
                  Reset Password
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
                    <label htmlFor="txtEmail">Email Address</label>
                    <FormInput
                      type="email"
                      id="txtEmail"
                      placeholder="Enter email address"
                      autoComplete="email"
                      value={email || ''}
                      onChange={this._handleEmail}
                      invalid={email !== null && !validator.isValidEmail(email)}
                    />
                    <FormFeedback valid={validEmail}>
                      {t('validation.errEmail')}
                    </FormFeedback>
                    <small className="form-text text-muted text-center">
                      You will receive an email with a unique token.
                    </small>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    onClick={this._submit}
                    disabled={!validEmail}
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
                      'Reset Password'
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

const mapStateToProps = state => ({
  authenticated: state.sessionReducer.authenticated
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { forgotPassword }
  )(ForgotPassword)
);
