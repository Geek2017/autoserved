import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  DatePicker,
  FormSelect,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row
} from "shards-react";

const CreatePMSOtherRequestModal = ({
  current,
  data,
  errorMessages,
  events,
  maxPages,
  open,
  schedulesCountMax,
  toggle,
  validated
}) => {
  return (
    <Modal
      centered
      fade
      open={open}
      role="dialog"
      size="lg"
      toggle={() => toggle(data.pmsOtherType)}
    >
      <ModalHeader
        closeAriaLabel="Close"
        toggle={() => toggle(data.pmsOtherType)}
        className="text-capitalize"
      >
        {data.content ? `Requesting for ${data.content.name}` : ""}
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
            <h5>Select your preferred schedule (at most 3 time slots)</h5>
            <small>
              Set a schedule a month before the expected scheduled date
            </small>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <ListGroup flush>
                  <ListGroupItem>
                    {data.preferredSchedules.map((item, index) => {
                      return (
                        <Row key={index} className="mb-1">
                          <Col lg="5">
                            <DatePicker
                              filterDate={date => date >= moment()}
                              onChange={value =>
                                events.handlePreferredScheduleDate(value, index)
                              }
                              openToDate={new Date()}
                              placeholderText="Select date"
                              value={item.date}
                              selected={item.date}
                            />
                          </Col>
                          <Col lg="5">
                            <FormSelect
                              id="selPreferredScheduleType"
                              className="text-capitalize"
                              onChange={event =>
                                events.handlePreferredScheduleTime(event, index)
                              }
                              value={item.time || ""}
                            >
                              {!item.time ? (
                                <option value={""}>
                                  Choose Preferred Time
                                </option>
                              ) : null}
                              {data.timeOptions.map((type, index) => (
                                <option key={`date-${index}`} value={type}>
                                  {type}
                                </option>
                              ))}
                            </FormSelect>
                          </Col>
                          {index > 0 ? (
                            <Col lg="2">
                              <Button
                                size="sm"
                                theme="danger"
                                onClick={() => events.removeSchedule(index)}
                              >
                                <i className="material-icons">remove_circle</i>
                              </Button>
                            </Col>
                          ) : (
                            <Col lg="2">
                              <Button
                                disabled={
                                  data.preferredSchedules.length ===
                                  schedulesCountMax
                                }
                                size="sm"
                                theme="success"
                                onClick={events.addSchedule}
                              >
                                <i className="material-icons">add_circle</i>
                              </Button>
                            </Col>
                          )}
                        </Row>
                      );
                    })}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </div>
        ) : current === 1 ? (
          <div className="text-center">
            <h5>Select Oil Type</h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <FormSelect
                  id="selOilType"
                  className="text-capitalize"
                  onChange={events.handleOilTypeSelection}
                  value={data.selectedOilType || ""}
                >
                  {!data.selectedOilType ? (
                    <option value={""}>Choose Oil Type</option>
                  ) : null}
                  {data.oilTypeOptions.map((type, index) => (
                    <option key={`oilType-${index}`} value={type}>
                      {type}
                    </option>
                  ))}
                </FormSelect>
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
                    <i className="material-icons">send</i>
                  </span>{" "}
                  Send Request
                </div>
              </Button>
              <Button onClick={() => toggle(data.pmsOtherType)} theme="white">
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

CreatePMSOtherRequestModal.defaultProps = {
  current: 0,
  data: {},
  errorMessages: [],
  events: {},
  maxPages: 2,
  schedulesCountMax: 3,
  open: false,
  validated: false
};

CreatePMSOtherRequestModal.propTypes = {
  current: PropTypes.number,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  validated: PropTypes.bool
};

export default withTranslation()(CreatePMSOtherRequestModal);
