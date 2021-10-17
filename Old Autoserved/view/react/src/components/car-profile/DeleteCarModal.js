import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheckbox,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "shards-react";

const DeleteCarModal = ({ data, errorMessages, events, open, t, toggle }) => (
  <Modal centered fade open={open} role="dialog" size="md" toggle={toggle}>
    <ModalHeader closeAriaLabel="Close" toggle={toggle}>
      Delete Car Profile
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
      <Row>
        <Col lg="12">
          <h4 className="text-danger mb-4 text-center">
            <strong>{t("translation.txtCarDeletionConfirmation")}</strong>
          </h4>
          <h6>{t("translation.txtCarDeletionAgreement")}</h6>
          <fieldset>
            <FormCheckbox
              checked={data.agreeDelete}
              id="chkAgreeDelete"
              onChange={events.handleAgreeDelete}
            >
              {t("translation.txtCarDeletionAgreementRequests")}
            </FormCheckbox>
            <FormCheckbox
              checked={data.agreeNoRetrieve}
              id="chkNoRetrieve"
              onChange={events.handleNoRetrieve}
            >
              {t("translation.txtCarDeletionAgreementData")}
            </FormCheckbox>
          </fieldset>
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
      <div className="my-2 mx-auto">
        <ButtonGroup>
          <Button
            theme="danger"
            disabled={!data.agreeDelete || !data.agreeNoRetrieve}
            onClick={events.delete}
          >
            <span className="text-white">
              <i className="material-icons">delete</i>
            </span>
            {t("translation.btnDeleteCarProfile")}
          </Button>
          <Button theme="white" onClick={() => toggle(data.car)}>
            <span>
              <i className="material-icons">close</i>
            </span>
            {t("translation.btnCancel")}
          </Button>
        </ButtonGroup>
      </div>
    </ModalFooter>
  </Modal>
);

DeleteCarModal.defaultProps = {
  data: {},
  errorMessages: [],
  events: {},
  open: false
};

DeleteCarModal.propTypes = {
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func
};

export default withTranslation()(DeleteCarModal);
