import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Button, Container, Col, Row } from "shards-react";

import { actions as carProfilesActions } from "../index";
import { actions as estimateWizardActions } from "../../estimate-wizard";
import PageTitle from "../../../../components/common/PageTitle";
import CreateCarModal from "../../../../components/car-profile/CreateCarModal";
import AlertMessages from "../../../../components/common/AlertMessages";
import CarsList from "../../../../components/car-profile/CarsList";
import DeleteCarModal from "../../../../components/car-profile/DeleteCarModal";
import EditCarModal from "../../../../components/car-profile/EditCarModal";

const {
  createCarProfile,
  createCarSchedules,
  deleteCarProfile,
  editCarProfile,
  getCars,
  getEngineTypes,
  getTransmissionTypes,
  getVehicleTypes
} = carProfilesActions;
const {
  getCarMakes,
  getCarModels,
  getCarYears,
  getCarTrims
} = estimateWizardActions;

class CarProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      successMessages: [],
      agreeDelete: false,
      agreeNoRetrieve: false,
      carMakeIsActive: false,
      carYearIsActive: false,
      carModelIsActive: false,
      carTrimIsActive: false,
      color: null,
      datePurchased: null,
      isFetchingCars: true,
      lastServiced: null,
      latitude: null,
      longitude: null,
      mdlDeletion: false,
      mdlCreation: false,
      mdlEdit: false,
      menuIndex: 0,
      mileage: null,
      plateNumber: null,
      selectedCar: null,
      selectedCarMake: null,
      selectedCarYear: null,
      selectedCarModel: null,
      selectedCarTrim: null,
      selectedEngineType: null,
      selectedTransmissionType: null,
      selectedVehicleType: null,
      txtLocation: null,
      txtSearch: null,
      validatedCarMake: false,
      validatedCarModel: false,
      validatedDatePurchased: false,
      validatedEngineType: false,
      validatedLocation: false,
      validatedMileage: false,
      validatedPlateNumber: false,
      validatedTransmissionType: false,
      validatedVehicleType: false
    };
  }

  componentDidMount = () => {
    const {
      getCarMakes,
      getEngineTypes,
      getTransmissionTypes,
      getVehicleTypes
    } = this.props;
    this._getCars();
    getCarMakes().catch(error => {
      console.log(error);
    });
    getEngineTypes().catch(error => {
      console.log(error);
    });
    getTransmissionTypes().catch(error => {
      console.log(error);
    });
    getVehicleTypes().catch(error => {
      console.log(error);
    });
  };

  _delete = selectedCar => {
    let errorMessages = [];
    let successMessages = [];
    const { deleteCarProfile, t } = this.props;
    deleteCarProfile(selectedCar.id)
      .then(() => {
        successMessages.push({
          message: "Car profile has been deleted!"
        });
        this.setState({ successMessages }, () => {
          this._toggleModalDeletion();
          this._getCars();
        });
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages });
      });
  };

  _getCars = () => {
    const { getCars } = this.props;
    getCars()
      .then(() => {
        this.setState({ isFetchingCars: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleAgreeDelete = () => {
    const { agreeDelete } = this.state;
    this.setState({ agreeDelete: !agreeDelete });
  };

  _handleDatePurchased = value => {
    const datePurchased = new Date(value);
    this.setState({ datePurchased, validatedDatePurchased: true });
  };

  _handleEngineType = event => {
    const { value: selectedEngineType } = event.target;
    this.setState({ selectedEngineType, validatedEngineType: true });
  };

  _handleLastServiced = value => {
    const lastServiced = new Date(value);
    this.setState({ lastServiced });
  };

  _handleMileage = event => {
    const { value: mileage } = event.target;
    const validatedMileage = mileage !== null && mileage.length > 0;
    this.setState({ mileage, validatedMileage });
  };

  _handleNoRetrieve = () => {
    const { agreeNoRetrieve } = this.state;
    this.setState({ agreeNoRetrieve: !agreeNoRetrieve });
  };

  _handleColor = event => {
    const { value: color } = event.target;
    this.setState({ color });
  };

  _handlePlateNumber = event => {
    const { value: plateNumber } = event.target;
    const validatedPlateNumber = plateNumber !== null && plateNumber.length;
    this.setState({ plateNumber, validatedPlateNumber });
  };

  _handleSearch = event => {
    const { value: txtSearch } = event.target;
    this.setState({ txtSearch, txtLocation: txtSearch });
  };

  _handleSelectCarMake = selectedCarMake => {
    const { getCarModels } = this.props;
    const validatedCarMake = selectedCarMake !== null;
    this.setState({
      carMakeIsActive: false,
      carModelIsActive: true,
      selectedCarMake,
      selectedCarModel: null,
      selectedCarYear: null,
      selectedCarTrim: null,
      validatedCarMake
    });
    getCarModels(selectedCarMake.value).catch(error => {
      console.log(error);
    });
  };

  _handleSelectCarModel = selectedCarModel => {
    const { getCarYears } = this.props;
    const validatedCarModel = selectedCarModel !== null;
    this.setState({
      carModelIsActive: false,
      carYearIsActive: true,
      selectedCarModel,
      selectedCarYear: null,
      selectedCarTrim: null,
      validatedCarModel
    });
    getCarYears(selectedCarModel.value).catch(error => {
      console.log(error);
    });
  };

  _handleSelectCarYear = selectedCarYear => {
    const { getCarTrims } = this.props;
    const { selectedCarModel } = this.state;
    this.setState({
      carYearIsActive: false,
      carTrimIsActive: true,
      selectedCarYear,
      selectedCarTrim: null
    });
    getCarTrims(selectedCarModel.value, selectedCarYear.value).catch(error => {
      console.log(error);
    });
  };

  _handleSelectCarTrim = selectedCarTrim => {
    this.setState({
      carTrimIsActive: false,
      selectedCarTrim
    });
  };

  _handleSelectSuggest = suggestion => {
    const { formatted_address: txtLocation, geometry } = suggestion;
    const latitude = geometry.location.lat();
    const longitude = geometry.location.lng();
    const validatedLocation = latitude && longitude;
    this.setState({
      txtSearch: "",
      txtLocation,
      latitude,
      longitude,
      validatedLocation
    });
  };

  _handleTransmissionType = event => {
    const { value: selectedTransmissionType } = event.target;
    this.setState({
      selectedTransmissionType,
      validatedTransmissionType: true
    });
  };

  _handleVehicleType = event => {
    const { value: selectedVehicleType } = event.target;
    this.setState({ selectedVehicleType, validatedVehicleType: true });
  };

  _next = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex + 1 });
  };

  _openCarMake = event => {
    event.preventDefault();
    const { carMakeIsActive } = this.state;
    this.setState({
      carMakeIsActive: !carMakeIsActive,
      carModelIsActive: false,
      carYearIsActive: false,
      carTrimIsActive: false
    });
  };

  _openCarModel = event => {
    event.preventDefault();
    const { carModelIsActive } = this.state;
    this.setState({
      carMakeIsActive: false,
      carModelIsActive: !carModelIsActive,
      carYearIsActive: false,
      carTrimIsActive: false
    });
  };

  _openCarYear = event => {
    event.preventDefault();
    const { carYearIsActive } = this.state;
    this.setState({
      carMakeIsActive: false,
      carModelIsActive: false,
      carYearIsActive: !carYearIsActive,
      carTrimIsActive: false
    });
  };

  _openCarTrim = event => {
    event.preventDefault();
    const { carTrimIsActive } = this.state;
    this.setState({
      carMakeIsActive: false,
      carModelIsActive: false,
      carYearIsActive: false,
      carTrimIsActive: !carTrimIsActive
    });
  };

  _previous = () => {
    const { menuIndex } = this.state;
    this.setState({ menuIndex: menuIndex - 1 });
  };

  _submit = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { createCarProfile, createCarSchedules, t } = this.props;
    const {
      datePurchased: date_purchased,
      lastServiced: last_serviced,
      latitude,
      longitude,
      mileage: current_mileage,
      plateNumber: plate_number,
      selectedCarMake,
      selectedCarModel,
      selectedCarYear,
      selectedCarTrim,
      selectedEngineType: engine_type,
      selectedTransmissionType: transmission,
      selectedVehicleType: type
    } = this.state;
    const carData = {
      type,
      make_id: selectedCarMake.value,
      model_id: selectedCarModel.value,
      car_year: selectedCarYear ? selectedCarYear.value : null,
      trim_id: selectedCarTrim ? selectedCarTrim.value : null,
      engine_type,
      transmission,
      plate_number,
      current_mileage,
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      date_purchased,
      last_serviced
    };
    createCarProfile(carData)
      .then(car => {
        createCarSchedules(car.id)
          .then(() => {
            this._getCars();
            successMessages.push({
              message: "Car profile and PMS schedule has been created."
            });
            this.setState({
              mdlCreation: false,
              successMessages
            });
          })
          .catch(error => {
            if (Array.isArray(error)) {
              errorMessages = errorMessages.concat(error);
            } else {
              errorMessages.push({ message: t("translation.generalError") });
            }

            this.setState({ errorMessages });
          });
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else if (error.response) {
          error.response.data.errors.plate_number.map(message => {
            return errorMessages.push({ message });
          });
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages });
      });
  };

  _submitEdit = event => {
    event.preventDefault();
    let errorMessages = [];
    let successMessages = [];
    const { editCarProfile, t } = this.props;
    const {
      color,
      plateNumber: plate_number,
      selectedEngineType: engine_type,
      selectedTransmissionType: transmission,
      selectedCar
    } = this.state;
    const carData = {
      color,
      engine_type,
      transmission,
      plate_number
    };
    editCarProfile(selectedCar.id, carData)
      .then(() => {
        successMessages.push({
          message: "Car profile has been edited."
        });
        this.setState({
          mdlEdit: false,
          successMessages
        });
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errorMessages = errorMessages.concat(error);
        } else {
          errorMessages.push({ message: t("translation.generalError") });
        }

        this.setState({ errorMessages });
      });
  };

  _toggleModalCreation = () => {
    const { mdlCreation } = this.state;
    this.setState({
      datePurchased: null,
      lastServiced: null,
      latitude: null,
      longitude: null,
      mdlCreation: !mdlCreation,
      menuIndex: 0,
      mileage: null,
      plateNumber: null,
      selectedCarMake: null,
      selectedCarYear: null,
      selectedCarModel: null,
      selectedCarTrim: null,
      selectedEngineType: null,
      selectedTransmissionType: null,
      selectedVehicleType: null,
      txtLocation: null,
      txtSearch: null
    });
  };

  _toggleModalDeletion = selectedCar => {
    const { mdlDeletion } = this.state;
    this.setState({
      agreeDelete: false,
      agreeNoRetrieve: false,
      mdlDeletion: !mdlDeletion,
      selectedCar
    });
  };

  _toggleModalEdit = selectedCar => {
    const { mdlEdit } = this.state;
    this.setState({
      mdlEdit: !mdlEdit,
      selectedCar,
      color: selectedCar.color,
      plateNumber: selectedCar.plate_number,
      selectedTransmissionType: selectedCar.transmission,
      selectedEngineType: selectedCar.engine_type,
      validatedPlateNumber: true
    });
  };

  render = () => {
    const {
      cars,
      engineTypes,
      makes,
      models,
      t,
      transmissionTypes,
      trims,
      vehicleTypes,
      years
      // history
    } = this.props;
    const {
      agreeDelete,
      agreeNoRetrieve,
      carMakeIsActive,
      carModelIsActive,
      carYearIsActive,
      carTrimIsActive,
      color,
      datePurchased,
      errorMessages,
      successMessages,
      isFetchingCars,
      lastServiced,
      latitude,
      longitude,
      mdlCreation,
      mdlDeletion,
      mdlEdit,
      menuIndex,
      mileage,
      plateNumber,
      selectedCar,
      selectedCarMake,
      selectedCarYear,
      selectedCarModel,
      selectedCarTrim,
      selectedEngineType,
      selectedTransmissionType,
      selectedVehicleType,
      txtLocation,
      txtSearch,
      validatedCarMake,
      validatedCarModel,
      validatedDatePurchased,
      validatedEngineType,
      validatedLocation,
      validatedMileage,
      validatedPlateNumber,
      validatedTransmissionType,
      validatedVehicleType
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t("translation.ttlCarProfile")}
            subtitle={t("translation.subTtlCarProfile")}
            className="page-header__text text-sm-left"
          />
          <Col sm="4" className="page-header__actions d-flex ml-auto my-auto">
            <Button
              onClick={this._toggleModalCreation}
              // onClick={() => history.push('/cars/new')}
              className="mx-auto ml-sm-auto mr-sm-0"
            >
              <i className="material-icons">add</i>
              {t("translation.btnCreateNewCar")}
            </Button>
          </Col>
        </Row>
        <Row className="page-body">
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
            <CarsList
              cars={cars}
              events={{
                toggleModalCreation: this._toggleModalCreation,
                toggleModalDeletion: this._toggleModalDeletion,
                toggleModalEdit: this._toggleModalEdit
              }}
              isFetching={isFetchingCars}
            />
          </Col>
        </Row>
        {selectedCar ? (
          <EditCarModal
            open={mdlEdit}
            data={{
              car: selectedCar,
              transmissionTypes,
              engineTypes,
              color,
              plateNumber,
              selectedTransmissionType,
              selectedEngineType,
              validatedPlateNumber
            }}
            events={{
              handleEngineType: this._handleEngineType,
              handleTransmissionType: this._handleTransmissionType,
              handlePlateNumber: this._handlePlateNumber,
              handleColor: this._handleColor,
              submit: this._submitEdit
            }}
            toggle={this._toggleModalEdit}
          />
        ) : null}
        <CreateCarModal
          current={menuIndex}
          data={{
            carMakeIsActive,
            carYearIsActive,
            carModelIsActive,
            carTrimIsActive,
            datePurchased,
            engineTypes,
            lastServiced,
            latitude,
            longitude,
            makes,
            models,
            mileage,
            plateNumber,
            selectedCarMake,
            selectedCarYear,
            selectedCarModel,
            selectedCarTrim,
            selectedEngineType,
            selectedTransmissionType,
            selectedVehicleType,
            transmissionTypes,
            trims,
            txtLocation,
            txtSearch,
            vehicleTypes,
            years
          }}
          events={{
            handleDatePurchased: this._handleDatePurchased,
            handleEngineType: this._handleEngineType,
            handleLastServiced: this._handleLastServiced,
            handleMileage: this._handleMileage,
            handlePlateNumber: this._handlePlateNumber,
            handleSearch: this._handleSearch,
            handleSelectSuggest: this._handleSelectSuggest,
            handleSelectCarMake: this._handleSelectCarMake,
            handleSelectCarModel: this._handleSelectCarModel,
            handleSelectCarYear: this._handleSelectCarYear,
            handleSelectCarTrim: this._handleSelectCarTrim,
            handleTransmissionType: this._handleTransmissionType,
            handleVehicleType: this._handleVehicleType,
            next: this._next,
            openCarMake: this._openCarMake,
            openCarModel: this._openCarModel,
            openCarYear: this._openCarYear,
            openCarTrim: this._openCarTrim,
            previous: this._previous,
            submit: this._submit
          }}
          errorMessages={errorMessages}
          open={mdlCreation}
          toggle={this._toggleModalCreation}
          validated={
            validatedCarMake &&
            validatedCarModel &&
            validatedDatePurchased &&
            validatedEngineType &&
            validatedLocation &&
            validatedMileage &&
            validatedPlateNumber &&
            validatedTransmissionType &&
            validatedVehicleType
          }
        />
        <DeleteCarModal
          data={{ car: selectedCar, agreeDelete, agreeNoRetrieve }}
          events={{
            delete: () => this._delete(selectedCar),
            handleAgreeDelete: this._handleAgreeDelete,
            handleNoRetrieve: this._handleNoRetrieve,
            openCarMake: this._openCarMake,
            openCarModel: this._openCarModel,
            openCarYear: this._openCarYear,
            openCarTrim: this._openCarTrim
          }}
          open={mdlDeletion}
          toggle={this._toggleModalDeletion}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  cars: state.carProfilesReducer.cars,
  engineTypes: state.carProfilesReducer.engineTypes,
  makes: state.estimateWizardReducer.makes,
  models: state.estimateWizardReducer.models,
  transmissionTypes: state.carProfilesReducer.transmissionTypes,
  trims: state.estimateWizardReducer.trims,
  vehicleTypes: state.carProfilesReducer.vehicleTypes,
  years: state.estimateWizardReducer.years
});

export default withTranslation()(
  connect(mapStateToProps, {
    createCarProfile,
    createCarSchedules,
    deleteCarProfile,
    editCarProfile,
    getCars,
    getCarMakes,
    getCarModels,
    getCarYears,
    getCarTrims,
    getEngineTypes,
    getTransmissionTypes,
    getVehicleTypes
  })(CarProfiles)
);
