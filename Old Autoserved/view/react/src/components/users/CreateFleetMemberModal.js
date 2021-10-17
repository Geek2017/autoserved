import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from 'shards-react';

import { validator } from '../../utils/helper';

const CreateFleetMemberModal = ({
  attemptSubmit,
  data,
  errorMessages,
  events,
  open,
  t,
  toggle
}) => {
  const { email, firstName, lastName } = data;
  const { handleFirstName, handleLastName, handleEmail, submit } = events;
  const validFirstName = validator.isValidName(firstName);
  const validLastName = validator.isValidName(lastName);
  const validEmail = validator.isValidEmail(email);
  return (
    <Modal open={open} fade centered role="dialog">
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        Add a New Fleet Member
      </ModalHeader>
      <ModalBody>
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
          <Row>
            <Col lg="6">
              <FormGroup>
                <FormInput
                  type="text"
                  id="txtFirstName"
                  placeholder="Enter first name"
                  onChange={handleFirstName}
                  value={firstName || ''}
                  invalid={firstName !== null && !validFirstName}
                />
                <FormFeedback valid={validFirstName}>
                  First name should not be empty
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <FormInput
                  type="text"
                  id="txtLastName"
                  placeholder="Enter last name"
                  onChange={handleLastName}
                  value={lastName || ''}
                  invalid={lastName !== null && !validLastName}
                />
                <FormFeedback valid={validLastName}>
                  Last name should not be empty
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormInput
              type="email"
              id="txtEmail"
              placeholder={t('common.phEmail')}
              autoComplete="email"
              value={email || ''}
              onChange={handleEmail}
              invalid={email !== null && !validEmail}
            />
            <FormFeedback valid={validEmail}>
              {t('validation.errEmail')}
            </FormFeedback>
          </FormGroup>
        </Form>
        <small>
          <em>Passwords will be sent to the email address provided.</em>
        </small>
      </ModalBody>
      <ModalFooter>
        <div className="my-2 ml-auto">
          <ButtonGroup>
            <Button
              theme="success"
              onClick={submit}
              disabled={
                attemptSubmit ||
                !validEmail ||
                !validFirstName ||
                !validLastName
              }
            >
              {attemptSubmit ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{t('common.lblLoading')}</span>
                </div>
              ) : (
                <div>
                  <span className="text-white">
                    <i className="material-icons">add</i>
                  </span>
                  Add New Member
                </div>
              )}
            </Button>
            <Button onClick={toggle} theme="white">
              <span>
                <i className="material-icons">close</i>
              </span>
              {t('translation.btnCancel')}
            </Button>
          </ButtonGroup>
        </div>
      </ModalFooter>
    </Modal>
  );
};

CreateFleetMemberModal.defaultProps = {
  data: {},
  errorMessages: [],
  events: {},
  open: false
};

CreateFleetMemberModal.propTypes = {
  attemptSubmit: PropTypes.bool,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func
};

export default withTranslation()(CreateFleetMemberModal);
