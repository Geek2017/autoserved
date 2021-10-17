import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheckbox,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "shards-react";

import currencyFormatter from "../../utils/helper/currency-formatter";

const CreateEstimateModal = ({
  data,
  errorMessages,
  events,
  open,
  toggle,
  validated
}) => {
  return (
    <Modal centered fade open={open} role="dialog" size="lg" toggle={toggle}>
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        Review Shop Estimation
      </ModalHeader>
      <ModalBody className="pt-3" style={{ height: 400, overflow: "auto" }}>
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
        <div className="text-center">
          <h5>Review submitted estimation</h5>
          <Row className="mb-3">
            <Col className="mx-auto" lg="6">
              <ListGroup flush>
                <ListGroupItem>
                  <Row className="mb-1">
                    <Col lg="6" className="text-left">
                      <strong>Shop Estimate</strong>
                      <p className="mb-2">
                        <small>Price provided by the shop</small>
                      </p>
                    </Col>
                    <Col lg="6" className="text-right">
                      <strong>
                        {data.content
                          ? currencyFormatter.format(data.content.amount)
                          : "-"}
                      </strong>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="mb-1">
                    <Col lg="6" className="text-left">
                      <strong>Total Price</strong>
                    </Col>
                    <Col lg="6" className="text-right text-success">
                      <strong>
                        {data.content
                          ? currencyFormatter.format(data.content.amount)
                          : "-"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="mx-auto text-left" lg="6">
              <FormCheckbox
                checked={data.reviewed}
                onChange={events.handleChkReviewed}
              >
                I have reviewed the estimation and I'm ready to submit
              </FormCheckbox>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter className="d-block">
        <Row>
          <Col className="d-flex justify-content-end" lg="12">
            <ButtonGroup>
              <Button
                disabled={!validated}
                theme="success"
                onClick={events.submit}
              >
                <div>
                  <span className="text-white">
                    <i className="material-icons">add</i>
                  </span>{" "}
                  Set Appointment
                </div>
              </Button>
              <Button onClick={toggle} theme="white">
                <span>
                  <i className="material-icons">close</i>
                </span>{" "}
                Cancel
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

CreateEstimateModal.defaultProps = {
  current: 0,
  data: {},
  errorMessages: [],
  events: {},
  maxPages: 3,
  open: false,
  validated: false
};

CreateEstimateModal.propTypes = {
  current: PropTypes.number,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  validated: PropTypes.bool
};

export default withTranslation()(CreateEstimateModal);
