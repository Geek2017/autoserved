import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactGoogleMap from "react-google-map";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { withTranslation } from "react-i18next";
import Select from "react-select";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  Col,
  DatePicker,
  FormInput,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row,
  Tooltip
} from "shards-react";

import { MAPS_API_KEY, APP_ADD_CAR_DETAILS } from "../../utils/constants";
import AlertMessages from "../../components/common/AlertMessages";

const CreateCarModal = ({
  current,
  data,
  errorMessages,
  events,
  maxPages,
  open,
  toggle,
  validated
}) => {
  const [toolTip, setToolTip] = useState(false);
  return (
    <Modal centered fade open={open} role="dialog" size="lg" toggle={toggle}>
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        Let's create your car
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
          <div className="mt-3">
            <AlertMessages
              errorMessages={errorMessages}
              infoMessages={[
                {
                  message:
                    "You must provide your information as accurately as possible."
                }
              ]}
            />
          </div>
        </div>
        {current === 0 ? (
          <div className="text-center">
            <h5>
              Specify your car's location <span className="text-danger">*</span>
            </h5>
            <small>
              We will use this information to enhance your experience
            </small>
            <Row className="mt-3">
              <Col lg="9" className="mx-auto mb-3">
                <ReactGoogleMapLoader
                  params={{
                    key: MAPS_API_KEY,
                    libraries: "places,geocode"
                  }}
                  render={googleMaps =>
                    googleMaps && (
                      <ReactGooglePlacesSuggest
                        autocompletionRequest={{
                          input: data.txtSearch || ""
                        }}
                        googleMaps={googleMaps}
                        onSelectSuggest={events.handleSelectSuggest}
                      >
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="material-icons">place</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            id="txtLocation"
                            placeholder="Search location"
                            value={data.txtLocation || ""}
                            onChange={events.handleSearch}
                          />
                        </InputGroup>
                      </ReactGooglePlacesSuggest>
                    )
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="9" className="mx-auto">
                <ReactGoogleMapLoader
                  params={{
                    key: MAPS_API_KEY,
                    libraries: "places,geocode"
                  }}
                  render={googleMaps =>
                    googleMaps &&
                    data.latitude &&
                    data.longitude && (
                      <div
                        style={{
                          height: "40vh",
                          width: "100%"
                        }}
                      >
                        <ReactGoogleMap
                          autoFitBounds
                          googleMaps={googleMaps}
                          zoom={16}
                          coordinates={[
                            {
                              position: {
                                lat: data.latitude,
                                lng: data.longitude
                              }
                            }
                          ]}
                        />
                      </div>
                    )
                  }
                />
              </Col>
            </Row>
          </div>
        ) : current === 1 ? (
          <Row>
            <Col lg="12">
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="mb-0">
                    Choose car details{" "}
                    <a target="__blank" href={APP_ADD_CAR_DETAILS}>
                      <i id="showHelp" className="material-icons">
                        help
                      </i>
                    </a>
                  </h6>
                  <Tooltip
                    target="#showHelp"
                    open={toolTip}
                    toggle={() => {
                      setToolTip(!toolTip);
                    }}
                  >
                    Can't find your car details? Click this.
                  </Tooltip>
                  <small>
                    Provide at least the <strong>car make</strong> and{" "}
                    <strong>car model</strong>. If you can't find your car
                    details, please proceed{" "}
                    <a target="__blank" href={APP_ADD_CAR_DETAILS}>
                      here
                    </a>
                    .
                  </small>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="3">
                      <Button
                        theme="secondary"
                        active={data.carMakeIsActive}
                        outline
                        block
                        onClick={events.openCarMake}
                      >
                        {data.selectedCarMake
                          ? data.selectedCarMake.label
                          : "Make"}{" "}
                        <span className="text-danger">*</span>
                      </Button>
                    </Col>
                    {data.selectedCarMake ? (
                      <Col lg="3">
                        <Button
                          theme="secondary"
                          active={data.carModelIsActive}
                          outline
                          block
                          onClick={events.openCarModel}
                        >
                          {data.selectedCarModel
                            ? data.selectedCarModel.label
                            : "Model"}{" "}
                          <span className="text-danger">*</span>
                        </Button>
                      </Col>
                    ) : null}
                    {data.selectedCarModel ? (
                      <Col lg="3">
                        <Button
                          theme="secondary"
                          active={data.carYearIsActive}
                          outline
                          block
                          onClick={events.openCarYear}
                        >
                          {data.selectedCarYear
                            ? data.selectedCarYear.label
                            : "Year"}
                        </Button>
                      </Col>
                    ) : null}
                    {data.selectedCarYear ? (
                      <Col lg="3">
                        <Button
                          theme="secondary"
                          active={data.carTrimIsActive}
                          outline
                          block
                          onClick={events.openCarTrim}
                        >
                          {data.selectedCarTrim
                            ? data.selectedCarTrim.label
                            : "Trim"}
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                  <Row>
                    <Col lg="12">
                      {data.carMakeIsActive ? (
                        <Card small className="mt-3">
                          <CardBody>
                            <Select
                              options={data.makes}
                              onChange={events.handleSelectCarMake}
                            />
                          </CardBody>
                        </Card>
                      ) : data.carModelIsActive ? (
                        <Card small className="mt-3">
                          <CardBody>
                            <Select
                              options={data.models}
                              onChange={events.handleSelectCarModel}
                            />
                          </CardBody>
                        </Card>
                      ) : data.carYearIsActive ? (
                        <Card small className="mt-3">
                          <CardBody>
                            <Select
                              options={data.years}
                              onChange={events.handleSelectCarYear}
                            />
                          </CardBody>
                        </Card>
                      ) : data.carTrimIsActive ? (
                        <Card small className="mt-3">
                          <CardBody>
                            <Select
                              options={data.trims}
                              onChange={events.handleSelectCarTrim}
                            />
                          </CardBody>
                        </Card>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : current === 2 ? (
          <div className="text-center">
            <h5>Additional Car Details</h5>
            <Row className="mt-3">
              <Col lg="9" className="mx-auto mb-3">
                <ListGroup flush>
                  <ListGroupItem>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Plate Number <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <FormInput
                          id="txtPlateNumber"
                          placeholder="Enter plate number"
                          onChange={events.handlePlateNumber}
                          value={data.plateNumber || ""}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Vehicle Type <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <FormSelect
                          id="selVehicleType"
                          className="text-capitalize"
                          onChange={events.handleVehicleType}
                          value={data.selectedVehicleType || ""}
                        >
                          {!data.selectedVehicleType ? (
                            <option value={""}>Select Vehicle Type</option>
                          ) : null}
                          {data.vehicleTypes.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Engine Type <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <FormSelect
                          id="selEngineType"
                          className="text-capitalize"
                          onChange={events.handleEngineType}
                          value={data.selectedEngineType || ""}
                        >
                          {!data.selectedEngineType ? (
                            <option value={""}>Select Engine Type</option>
                          ) : null}
                          {data.engineTypes.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Transmission Type{" "}
                          <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <FormSelect
                          id="selTransmissionType"
                          className="text-capitalize"
                          onChange={events.handleTransmissionType}
                          value={data.selectedTransmissionType || ""}
                        >
                          {!data.selectedTransmissionType ? (
                            <option value={""}>Select Transmission Type</option>
                          ) : null}
                          {data.transmissionTypes.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </div>
        ) : current === 3 ? (
          <div className="text-center">
            <h5>Service Details</h5>
            <Row className="mt-3">
              <Col lg="9" className="mx-auto mb-3">
                <ListGroup flush>
                  <ListGroupItem>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Current Mileage <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <FormInput
                          id="txtCurrentMileage"
                          placeholder="Enter current mileage"
                          type="number"
                          onChange={events.handleMileage}
                          value={data.mileage || ""}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>
                          Date Purchased <span className="text-danger">*</span>
                        </small>
                      </Col>
                      <Col lg="6">
                        <DatePicker
                          onChange={events.handleDatePurchased}
                          placeholderText="Select date"
                          value={data.datePurchased}
                          selected={data.datePurchased}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6">
                        <small>Last Service Date</small>
                      </Col>
                      <Col lg="6">
                        <DatePicker
                          onChange={events.handleLastServiced}
                          placeholderText="Select date"
                          value={data.lastServiced}
                          selected={data.lastServiced}
                        />
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
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
                    <i className="material-icons">add</i>
                  </span>{" "}
                  Create Car Profile
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

CreateCarModal.defaultProps = {
  current: 0,
  data: {},
  errorMessages: [],
  events: {},
  maxPages: 4,
  open: false,
  validated: false
};

CreateCarModal.propTypes = {
  current: PropTypes.number,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  validated: PropTypes.bool
};

export default withTranslation()(CreateCarModal);
