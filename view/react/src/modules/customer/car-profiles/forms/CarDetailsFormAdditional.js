import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Col, Row, Form, FormGroup, FormInput, FormSelect } from "shards-react";

import { actions as carProfilesActions } from "../index";

const {
  getEngineTypes,
  getTransmissionTypes,
  getVehicleTypes
} = carProfilesActions;

class CarDetailsFormAdditional extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        plateNumber: props.fieldStorage.plateNumber || "",
        selectedVehicleType: props.fieldStorage.selectedVehicleType || "",
        selectedEngineType: props.fieldStorage.selectedEngineType || "",
        selectedTransmissionType:
          props.fieldStorage.selectedTransmissionType || ""
      }
    };
  }

  componentDidMount() {
    const {
      getEngineTypes,
      getTransmissionTypes,
      getVehicleTypes
    } = this.props;
    getEngineTypes().catch(error => {
      console.log(error);
    });
    getTransmissionTypes().catch(error => {
      console.log(error);
    });
    getVehicleTypes().catch(error => {
      console.log(error);
    });
  }

  checkForm = () => {
    const { onHandleCurrentFormValidation, currentFormIndex } = this.props;
    const {
      plateNumber,
      selectedVehicleType,
      selectedEngineType,
      selectedTransmissionType
    } = this.state.fields;
    if (
      plateNumber !== "" &&
      selectedVehicleType !== "" &&
      selectedEngineType !== "" &&
      selectedTransmissionType !== ""
    ) {
      onHandleCurrentFormValidation({
        index: currentFormIndex,
        isValid: true
      });
    } else {
      onHandleCurrentFormValidation({
        index: currentFormIndex,
        isValid: false
      });
    }
  };

  handleField = (fieldName, e) => {
    const { onSetFieldStorage, fieldStorage } = this.props;
    const fields = { ...this.state.fields };
    fields[fieldName] = e.target.value;

    this.setState({ fields }, () => {
      onSetFieldStorage({
        ...fieldStorage,
        ...this.state.fields
      });
      this.checkForm();
    });
  };

  render() {
    const { fields } = this.state;
    const { vehicleTypes, engineTypes, transmissionTypes } = this.props;

    return (
      <Row className="mt-3">
        <Col lg="12" className="mx-auto mb-3">
          <Form>
            <FormGroup>
              <label htmlFor="#txtPlateNumber">Plate Number</label>
              <FormInput
                id="txtPlateNumber"
                placeholder="Enter plate number"
                onChange={e => this.handleField("plateNumber", e)}
                value={fields.plateNumber}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#selVehicleType">Select Vehicle Type</label>
              <FormSelect
                id="selVehicleType"
                className="text-capitalize"
                onChange={e => this.handleField("selectedVehicleType", e)}
                value={fields.selectedVehicleType}
              >
                {!fields.selectedVehicleType && (
                  <option value={""}>Select Vehicle Type</option>
                )}
                {vehicleTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#selEngineType">Select Engine Type</label>
              <FormSelect
                id="selEngineType"
                className="text-capitalize"
                onChange={e => this.handleField("selectedEngineType", e)}
                value={fields.selectedEngineType}
              >
                {!fields.selectedEngineType && (
                  <option value={""}>Select Engine Type</option>
                )}
                {engineTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#selTransmissionType">
                Select Transmission Type
              </label>
              <FormSelect
                id="selTransmissionType"
                className="text-capitalize"
                onChange={e => this.handleField("selectedTransmissionType", e)}
                value={fields.selectedTransmissionType}
              >
                {!fields.selectedTransmissionType && (
                  <option value={""}>Select Transmission Type</option>
                )}
                {transmissionTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  engineTypes: state.carProfilesReducer.engineTypes,
  transmissionTypes: state.carProfilesReducer.transmissionTypes,
  vehicleTypes: state.carProfilesReducer.vehicleTypes
});

export default connect(mapStateToProps, {
  getEngineTypes,
  getTransmissionTypes,
  getVehicleTypes
})(CarDetailsFormAdditional);
