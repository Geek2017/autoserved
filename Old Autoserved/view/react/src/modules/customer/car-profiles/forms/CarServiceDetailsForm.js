import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Col, Row, Form, FormGroup, FormInput, DatePicker } from "shards-react";

import { actions as carProfilesActions } from "../index";

const {
  getEngineTypes,
  getTransmissionTypes,
  getVehicleTypes
} = carProfilesActions;

class CarServiceDetailsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        mileage: props.fieldStorage.mileage || "",
        datePurchased: props.fieldStorage.datePurchased || "",
        lastServiced: props.fieldStorage.lastServiced || ""
      }
    };
  }

  componentDidMount() {}

  checkForm = () => {
    const { onHandleCurrentFormValidation, currentFormIndex } = this.props;
    const { mileage, datePurchased, lastServiced } = this.state.fields;
    if (mileage !== "" && datePurchased !== "" && lastServiced !== "") {
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
    const isDate =
      fieldName === "datePurchased" || fieldName === "lastServiced";
    fields[fieldName] = isDate ? new Date(e) : e.target.value;

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
    return (
      <Row className="mt-3">
        <Col lg="12" className="mx-auto mb-3">
          <Form>
            <FormGroup>
              <label>Current Mileage *</label>
              <FormInput
                placeholder="Enter current mileage"
                type="number"
                onChange={e => this.handleField("mileage", e)}
                value={fields.mileage}
              />
            </FormGroup>
            <FormGroup>
              <label>Date Purchased *</label>
              <DatePicker
                onChange={e => this.handleField("datePurchased", e)}
                placeholderText="Select date"
                value={fields.datePurchased}
                selected={fields.datePurchased}
              />
            </FormGroup>
            <FormGroup>
              <label>Last Serviced *</label>
              <DatePicker
                onChange={e => this.handleField("lastServiced", e)}
                placeholderText="Select date"
                value={fields.lastServiced}
                selected={fields.lastServiced}
              />
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
})(CarServiceDetailsForm);
