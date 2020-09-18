import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Col, Row, Form, FormGroup } from "shards-react";
import Select from "react-select";

import { actions as estimateWizardActions } from "../../estimate-wizard";

const {
  getCarMakes,
  getCarModels,
  getCarYears,
  getCarTrims
} = estimateWizardActions;

class CarDetailsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        make: props.fieldStorage.make || "",
        model: props.fieldStorage.model || "",
        year: props.fieldStorage.year || "",
        trim: props.fieldStorage.trim || ""
      }
    };
  }

  componentDidMount() {
    const { getCarMakes } = this.props;
    getCarMakes().catch(error => {
      console.log(error);
    });
  }

  checkForm = () => {
    const { onHandleCurrentFormValidation, currentFormIndex } = this.props;
    const { make, model } = this.state.fields;
    if (make !== "" && model !== "") {
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

  handleField = field => fieldValue => {
    const {
      getCarModels,
      getCarYears,
      getCarTrims,
      fieldStorage,
      onSetFieldStorage
    } = this.props;
    const fields = { ...this.state.fields };
    fields[field] = fieldValue;

    if (field === "make") {
      fields.model = "";
      fields.year = "";
      fields.trim = "";
      getCarModels(fields.make.value).catch(error => {
        console.log(error);
      });
    } else if (field === "model") {
      fields.year = "";
      fields.trim = "";
      getCarYears(fields.model.value).catch(error => {
        console.log(error);
      });
    } else if (field === "year") {
      fields.trim = "";
      getCarTrims(fields.model.value, fields.model.year).catch(error => {
        console.log(error);
      });
    }

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
    const { trims, makes, models, years } = this.props;

    console.log("@render [this.state.fields] === ", this.state.fields);
    return (
      <Row className="mt-3">
        <Col lg="12" className="mb-3">
          <Form>
            <FormGroup>
              <label htmlFor="#username">Car Make *</label>
              <Select
                value={fields.make || null}
                options={makes}
                onChange={this.handleField("make")}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#username">Car Model *</label>
              <Select
                value={fields.model || null}
                options={models}
                onChange={this.handleField("model")}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#username">Car Year</label>
              <Select
                value={fields.year || null}
                options={years}
                onChange={this.handleField("year")}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#username">Car Trim</label>
              <Select
                value={fields.trim || null}
                options={trims}
                onChange={this.handleField("trim")}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  makes: state.estimateWizardReducer.makes,
  models: state.estimateWizardReducer.models,
  trims: state.estimateWizardReducer.trims,
  years: state.estimateWizardReducer.years
});

export default connect(mapStateToProps, {
  getCarMakes,
  getCarModels,
  getCarYears,
  getCarTrims
})(CarDetailsForm);
