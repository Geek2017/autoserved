import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormFeedback,
  FormInput,
  Row
} from "shards-react";

import { actions as profileActions } from "../index";
import FormSectionTitle from "../../../../components/common/FormSectionTitle";
import { validator } from "../../../../utils/helper";

const { changePassword } = profileActions;

class ManageProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      successMessages: [],
      txtOldPassword: null,
      txtNewPassword: null,
      txtConfirmNewPassword: null
    };
  }

  _handleOldPassword = event => {
    this.setState({ txtOldPassword: event.target.value });
  };

  _handleNewPassword = event => {
    this.setState({ txtNewPassword: event.target.value });
  };

  _handleConfirmNewPassword = event => {
    this.setState({ txtConfirmNewPassword: event.target.value });
  };

  _submit = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    this.setState(
      { attemptSubmit: true, errorMessages, successMessages },
      () => {
        const { changePassword, t } = this.props;
        const {
          txtOldPassword: old_password,
          txtNewPassword: new_password,
          txtConfirmNewPassword: confirm_new_password
        } = this.state;
        changePassword({ old_password, new_password, confirm_new_password })
          .then(() => {
            successMessages.push({
              message: "Your password has been changed."
            });
            this.setState({
              attemptSubmit: false,
              txtOldPassword: null,
              txtNewPassword: null,
              txtConfirmNewPassword: null,
              successMessages
            });
          })
          .catch(error => {
            if (Array.isArray(error)) {
              errorMessages = errorMessages.concat(error);
            } else if (error.message) {
              errorMessages.push({ message: error.message });
            } else {
              errorMessages.push({ message: t("translation.generalError") });
            }

            this.setState({ errorMessages, attemptSubmit: false });
          });
      }
    );
  };

  render = () => {
    const { t } = this.props;
    const {
      attemptSubmit,
      errorMessages,
      successMessages,
      txtOldPassword,
      txtNewPassword,
      txtConfirmNewPassword
    } = this.state;
    const validPassword = validator.isValidPassword(
      txtOldPassword,
      txtOldPassword
    );
    const validNewPassword = validator.isValidPassword(
      txtNewPassword,
      txtConfirmNewPassword
    );
    return (
      <div>
        <Container fluid className="px-0">
          {successMessages.map((success, index) => (
            <Alert
              key={index}
              fade
              theme="success"
              className="outline-success mb-0"
            >
              <p className="mb-0">{success.message}</p>
            </Alert>
          ))}
          {errorMessages.map((error, index) => (
            <Alert
              key={index}
              fade
              theme="danger"
              className="outline-danger mb-0"
            >
              <p className="mb-0">{error.message}</p>
            </Alert>
          ))}
        </Container>
        <Container fluid className="main-content-container px-4 my-5">
          <Row>
            <Col lg="8" className="mx-auto mt-4">
              <Card small className="edit-user-details mb-4">
                <CardBody className="p-0">
                  <Form className="py-4">
                    <FormSectionTitle
                      title="Account Password"
                      description="Update your password."
                    />
                    <div className="mx-4">
                      <Row form className="mb-3">
                        <Col lg="12" className="form-group">
                          <label htmlFor="txtOldPassword">Password</label>
                          <FormInput
                            type="password"
                            id="txtOldPassword"
                            placeholder="Enter current password"
                            autoComplete="current-password"
                            value={txtOldPassword || ""}
                            onChange={this._handleOldPassword}
                            invalid={txtOldPassword !== null && !validPassword}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col lg="12" className="form-group">
                          <label htmlFor="txtNewPassword">New Password</label>
                          <FormInput
                            type="password"
                            id="txtNewPassword"
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            value={txtNewPassword || ""}
                            onChange={this._handleNewPassword}
                            invalid={
                              txtNewPassword !== null &&
                              txtConfirmNewPassword !== null &&
                              !validNewPassword
                            }
                          />
                          <FormFeedback valid={validNewPassword}>
                            {t("validation.errPassword")}
                          </FormFeedback>
                        </Col>
                      </Row>
                      <Row form>
                        <Col lg="12" className="form-group">
                          <label htmlFor="txtConfirmNewPassword">
                            Confirm New Password
                          </label>
                          <FormInput
                            type="password"
                            id="txtConfirmNewPassword"
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                            value={txtConfirmNewPassword || ""}
                            onChange={this._handleConfirmNewPassword}
                            invalid={
                              txtNewPassword !== null &&
                              txtConfirmNewPassword !== null &&
                              !validNewPassword
                            }
                          />
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter className="border-top">
                  <Button
                    size="sm"
                    theme="success"
                    className="ml-auto mr-3 float-right"
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
                          {t("common.lblLoading")}
                        </span>
                      </div>
                    ) : (
                      "Update Settings"
                    )}
                  </Button>
                  <Link
                    to={`/profile`}
                    className="btn btn-sm btn-white ml-auto mr-3 float-right"
                  >
                    &larr; Go Back
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default withTranslation()(
  connect(null, { changePassword })(ManageProfile)
);
