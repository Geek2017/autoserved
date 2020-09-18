import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormTextarea,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row
} from "shards-react";
import TagsInput from "react-tagsinput";

const rating = ["Extremely Poor", "Bad", "Average", "Good", "Excellent"];

const AppointmentFinalization = ({
  current,
  data,
  errorMessages,
  events,
  maxPages,
  open,
  toggle,
  validated
}) => (
  <Modal centered fade open={open} role="dialog" size="lg" toggle={toggle}>
    <ModalHeader closeAriaLabel="Close" toggle={toggle}>
      Finalize Appointment
    </ModalHeader>
    <ModalBody className="pt-3" style={{ height: 400, overflow: "auto" }}>
      <div className="progress-wrapper mb-3">
        <div className="progress-label">Completion Progress</div>
        <Progress
          className="progress-sm"
          max={maxPages}
          striped
          value={current + 1}
        >
          <span className="progress-value">{`${current +
            1} / ${maxPages}`}</span>
        </Progress>
      </div>
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
      {current === 0 ? (
        <div className="text-center">
          <h5>Additional Work Items</h5>
          <small>
            If there were additional work items, provide theme here.
          </small>
          <Row className="mt-3 mb-3">
            <Col className="mx-auto" lg="9">
              <TagsInput
                value={data.additionalItems || []}
                onChange={events.handleAdditionalItems}
                inputProps={{
                  placeholder: "Add items?"
                }}
              />
            </Col>
          </Row>
          <h5>
            Rate {data.user_type === "vendor" ? "Customer" : "Vendor"}{" "}
            <span className="text-danger">*</span>
          </h5>
          <Row className="mt-3">
            <Col lg="9" className="mx-auto mb-3">
              <ButtonGroup size="lg">
                {rating.map((item, index) => (
                  <Button
                    key={index}
                    title={item}
                    theme="light"
                    onClick={() => events.rate(index + 1)}
                  >
                    <i
                      className={`material-icons text-${
                        data.rate >= 0 && data.rate <= index
                          ? "dark"
                          : "warning"
                      }`}
                    >
                      {data.rate >= 0 && data.rate <= index
                        ? "star_border"
                        : "star"}
                    </i>
                  </Button>
                ))}
              </ButtonGroup>
              <h4 className="mt-3 font-weight-bold">
                {rating[data.rate - 1] || ""}
              </h4>
            </Col>
          </Row>
        </div>
      ) : current === 1 ? (
        <div className="text-center">
          <h5>
            Feedback <span className="text-danger">*</span>
          </h5>
          <small>Provide additional details for the rating provided.</small>
          <Row className="mt-3">
            <Col lg="9" className="mx-auto mb-3">
              <FormTextarea
                value={data.feedback || ""}
                onChange={events.handleFeedback}
                placeholder="Please provide feedback, suggestions and comments."
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </ModalBody>
    <ModalFooter className="d-block">
      <Row>
        <Col className="text-align-left" lg="6">
          <ButtonGroup>
            <Button
              disabled={current === 0}
              theme="primary"
              onClick={events.previous}
            >
              &laquo; Previous
            </Button>
            <Button
              disabled={current === maxPages - 1}
              theme="primary"
              onClick={events.next}
            >
              Next &raquo;
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="d-flex justify-content-end" lg="6">
          <ButtonGroup>
            <Button
              disabled={!validated}
              theme="success"
              onClick={events.submit}
            >
              <div>
                <span className="text-white">
                  <i className="material-icons">check</i>
                </span>{" "}
                Done
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

AppointmentFinalization.defaultProps = {
  current: 0,
  data: {},
  errorMessages: [],
  events: {},
  maxPages: 2,
  open: false,
  validated: false
};

AppointmentFinalization.propTypes = {
  current: PropTypes.number,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  validated: PropTypes.bool
};

export default withTranslation()(AppointmentFinalization);
