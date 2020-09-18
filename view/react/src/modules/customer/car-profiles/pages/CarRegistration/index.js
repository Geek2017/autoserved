import React, { PureComponent } from "react";
import { connect } from "react-redux";
import HeaderToolbar from "./Toolbar";
import Wizard from "../../../../../components/Wizard";
import CarLocationForm from "../../forms/CarLocationForm";
import CarDetailsForm from "../../forms/CarDetailsForm";
import CarDetailsFormAdditional from "../../forms/CarDetailsFormAdditional";
import CarServiceDetailsForm from "../../forms/CarServiceDetailsForm";
import { createCarProfile, createCarSchedules } from "../../actions";

import { Container } from "shards-react";

class CarRegistration extends PureComponent {
  handleRegister = form => {
    const { createCarProfile, createCarSchedules, history } = this.props;

    const carData = {
      make_id: form.make.value || "",
      model_id: form.model.value || "",
      car_year: form.year.value || "",
      trim_id: form.trim.value || "",
      plate_number: form.plateNumber || "",
      type: form.selectedVehicleType || "",
      engine_type: form.selectedEngineType || "",
      transmission: form.selectedTransmissionType || "",
      current_mileage: form.mileage || "",
      longitude: form.longitude || "",
      latitude: form.latitude || "",
      date_purchased: form.datePurchased || "",
      last_serviced: form.lastServiced || ""
    };
    createCarProfile(carData)
      .then(car => {
        createCarSchedules(car.id)
          .then(res => {
            history.push("/cars");
          })
          .catch(error => {
            console.log("createCarSchedules error wew ==== ", error);
          });
      })
      .catch(error => {
        console.log("createCarProfile error wew ==== ", error);
      });
  };

  render() {
    const FORMS_LIST = [
      {
        id: 1,
        component: CarLocationForm,
        stepTitle: "Car Location",
        cardTitle: `Specify your car's location`,
        cardSubTitle: `We will use this information to enhance your experience`,
        isValid: false
      },
      {
        id: 2,
        component: CarDetailsForm,
        stepTitle: "Car General Details",
        cardTitle: `Choose car details`,
        cardSubTitle: `Provide at least the car make and car model.`,
        isValid: false
      },
      {
        id: 3,
        component: CarDetailsFormAdditional,
        stepTitle: "Car Engine Details",
        cardTitle: `More car detail`,
        cardSubTitle: `Additional Car Details`,
        isValid: false
      },
      {
        id: 4,
        component: CarServiceDetailsForm,
        stepTitle: "Service Details",
        cardTitle: `Service detail`,
        cardSubTitle: `Additional Service Details`,
        isValid: false
      }
    ];
    return (
      <div className="p_carRegistration">
        <Container fluid className="main-content-container">
          <Wizard
            isStrict
            isReversable
            forms={[...FORMS_LIST]}
            cardChildComponent={<CardAdditionalComponents />}
            handleWizardForm={form => {
              this.handleRegister(form);
            }}
          />
        </Container>
      </div>
    );
  }
}

function CardAdditionalComponents(props) {
  return (
    <div className="p_carRegistration__card-additional">
      <HeaderToolbar grid={{ sm: 12 }} />
      <p className="description">
        Input the necessary details of your car so we can have a better
        recommendation for you.
      </p>
    </div>
  );
}

export default connect(null, {
  createCarProfile,
  createCarSchedules
})(CarRegistration);
