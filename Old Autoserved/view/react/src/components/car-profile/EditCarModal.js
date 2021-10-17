import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Form,
  FormInput,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "shards-react";

const EditCarModal = ({
  attemptSubmit,
  data,
  events,
  errors,
  open,
  t,
  toggle
}) => {
  const {
    car,
    transmissionTypes,
    engineTypes,
    selectedEngineType,
    selectedTransmissionType,
    color,
    plateNumber,
    validatedPlateNumber
  } = data;
  const {
    handleEngineType,
    handleTransmissionType,
    handleColor,
    handlePlateNumber,
    submit
  } = events;
  return (
    <Modal open={open} fade centered role="dialog">
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        Edit Car Profile
      </ModalHeader>
      <ModalBody>
        <h6 className="font-weight-bold">
          {car ? car.car_make.name : null} - {car ? car.car_model.name : null}
        </h6>
        {errors.map((error, index) => (
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
          <Row form>
            <Col md="12" className="form-group">
              <FormSelect
                className="text-capitalize"
                onChange={handleEngineType}
                value={selectedEngineType || ""}
              >
                {!selectedEngineType ? (
                  <option value={""}>Select Engine Type</option>
                ) : null}
                {engineTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
          <Row form>
            <Col md="12" className="form-group">
              <FormSelect
                id="selTransmissionType"
                className="text-capitalize"
                onChange={handleTransmissionType}
                value={selectedTransmissionType || ""}
              >
                {!selectedTransmissionType ? (
                  <option value={""}>Select Transmission Type</option>
                ) : null}
                {transmissionTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
          <Row form>
            <Col md="12" className="form-group">
              <FormInput
                type="text"
                placeholder={"Enter the color of your car"}
                onChange={handleColor}
                value={color || ""}
              />
            </Col>
          </Row>
          <Row form>
            <Col md="12" className="form-group">
              <FormInput
                type="text"
                placeholder={"Enter plate number"}
                onChange={handlePlateNumber}
                value={plateNumber || ""}
              />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <div className="my-2 ml-auto">
          <ButtonGroup>
            <Button
              theme="success"
              onClick={submit}
              disabled={attemptSubmit || !validatedPlateNumber}
            >
              {attemptSubmit ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{t("common.lblLoading")}</span>
                </div>
              ) : (
                <div>
                  <span className="text-white">
                    <i className="material-icons">save</i>
                  </span>{" "}
                  Edit Car Profile
                </div>
              )}
            </Button>
            <Button onClick={() => toggle(car)} theme="white">
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
};

EditCarModal.defaultProps = {
  errors: [],
  open: false
};

EditCarModal.propTypes = {
  attemptSubmit: PropTypes.bool,
  data: PropTypes.object,
  errors: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func
};

export default withTranslation()(EditCarModal);
