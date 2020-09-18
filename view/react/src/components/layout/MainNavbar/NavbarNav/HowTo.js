import React, { useState, useEffect } from "react";
import {} from "pusher-js";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Tour from "reactour";
import { NavItem, NavLink } from "shards-react";

import { actions as menuActions } from "../index";

import {
  TOUR_ICON_DASHBOARD,
  TOUR_ICON_CAR,
  TOUR_ICON_REQUEST,
  TOUR_GIF_REQUEST,
  TOUR_GIF_CAR_PROFILE,
  TOUR_ICON_REPAIR,
  TOUR_ICON_APPOINTMENT,
  TOUR_ICON_SHOP,
  TOUR_ICON_SERVICES,
  TOUR_ICON_ESTIMATE,
  TOUR_ICON_RATE,
  TOUR_GIF_SHOP,
  TOUR_GIF_SERVICES,
  TOUR_GIF_ESTIMATE,
  TOUR_GIF_NOTIFICATION
} from "../../../../utils/constants";

const { setFirstTimeLogin } = menuActions;

const customerSteps = [
  {
    content: (
      <div>
        <h4>
          Welcome to <strong className="text-primary">AutoServed</strong>!
        </h4>
        <h6>
          <em>Your personal car maintenance advisor.</em>
        </h6>
        <p>
          Let me walk you through how you can take advantage of our platform for
          a transparent and seamless transaction.
        </p>
      </div>
    )
  },
  {
    selector: ".c-dashboard",
    content: (
      <div>
        <img
          src={TOUR_ICON_DASHBOARD}
          alt="Dashboard"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Dashboard</h4>
        <p>
          Your dashboard will contain your account information and provide you
          with analytics data for you to make better decisions.
        </p>
      </div>
    )
  },
  {
    selector: ".c-car-profile",
    content: (
      <div>
        <img
          src={TOUR_ICON_CAR}
          alt="Car Profile"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Register your car</h4>
        <p className="mb-2">
          Manage multiple car profiles in one AutoServed account. Provide car
          details such as car make, model, mileage, location, last service date,
          and more.
        </p>
        <img src={TOUR_GIF_CAR_PROFILE} alt="Create Car Profile" />
      </div>
    )
  },
  {
    selector: ".c-car-profile",
    content: (
      <div>
        <img
          src={TOUR_ICON_REQUEST}
          alt="Create Request"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Request for an estimate</h4>
        <p className="mb-2">
          Create an estimate request for preventive maintenance and corrective
          services from multiple partner shops.
        </p>
        <img src={TOUR_GIF_REQUEST} alt="Create Request" />
      </div>
    )
  },
  {
    selector: ".c-estimates",
    content: (
      <div>
        <img
          src={TOUR_ICON_APPOINTMENT}
          alt="View Estimates"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Book an appointment</h4>
        <p className="mb-2">
          Receive an estimation breakdown from matched auto shops and confirm
          appointment schedules for the selected services to be rendered.
        </p>
      </div>
    )
  },
  {
    selector: ".c-appointments",
    content: (
      <div>
        <img
          src={TOUR_ICON_REPAIR}
          alt="Appointment"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Auto shop repairs your car</h4>
        <p className="mb-2">
          After appointment confirmation, show up at the auto shop on the agreed
          appointment schedule. It's that easy!
        </p>
      </div>
    )
  },
  {
    selector: ".c-appointments",
    content: (
      <div>
        <img
          src={TOUR_ICON_RATE}
          alt="Feedback and Rating"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Rate your experience</h4>
        <p className="mb-2">
          Provide accurate and honest feedback of the rendered services once
          appointment has been completed.
        </p>
      </div>
    )
  },
  {
    content: (
      <div>
        <h4>
          You're now ready to start using{" "}
          <strong className="text-primary">AutoServed</strong>.
        </h4>
        <p>
          Don't hesitate to contact us at{" "}
          <a href="mailto:support@autoserved.com">support@autoserved.com</a> if
          you have questions and suggestions.
        </p>
      </div>
    )
  }
];
const vendorSteps = [
  {
    content: (
      <div>
        <h4>
          Welcome to <strong className="text-primary">AutoServed</strong>!
        </h4>
        <h6>
          <em>Your personal car maintenance advisor.</em>
        </h6>
        <p>
          Let me walk you through how you can take advantage of our platform for
          a transparent and seamless transaction.
        </p>
      </div>
    )
  },
  {
    selector: ".v-dashboard",
    content: (
      <div>
        <img
          src={TOUR_ICON_DASHBOARD}
          alt="Dashboard"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Dashboard</h4>
        <p>
          Your dashboard will contain your account information and provide you
          with analytics data for you to make better decisions.
        </p>
      </div>
    )
  },
  {
    selector: ".v-shops",
    content: (
      <div>
        <img
          src={TOUR_ICON_SHOP}
          alt="Shops"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Register your shop</h4>
        <p className="mb-2">
          Manage multiple shops on the platform in one AutoServed account.
          Upload photos, add shop location, business hours, features, amenities
          and payment methods.
        </p>
        <img src={TOUR_GIF_SHOP} alt="Create Car Profile" />
      </div>
    )
  },
  {
    selector: ".v-services",
    content: (
      <div>
        <img
          src={TOUR_ICON_SERVICES}
          alt="Services"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Setup shop services</h4>
        <p className="mb-2">
          Setup services available in your shop. Preventive maintenance and
          corrective repair services are available at your disposal.
        </p>
        <img src={TOUR_GIF_SERVICES} alt="Create Car Profile" />
      </div>
    )
  },
  {
    selector: ".v-requests",
    content: (
      <div>
        <img
          src={TOUR_ICON_REQUEST}
          alt="Receive Requests"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Receive request notifications</h4>
        <p className="mb-2">
          Maximize business opportunities when you get e-mail, SMS, and in-app
          notifications when customers request for PMS and corrective repair
          services that match your shops.
        </p>
        <img
          style={{ width: "100%" }}
          src={TOUR_GIF_NOTIFICATION}
          alt="Create Request"
        />
      </div>
    )
  },
  {
    selector: ".v-estimates",
    content: (
      <div>
        <img
          src={TOUR_ICON_ESTIMATE}
          alt="Submit Estimates"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Submit an estimate</h4>
        <p className="mb-2">
          Add suitable prices to the services you will render to satisfy
          customer requests. Partner shops will have 24 hours to create an
          estimate to be submitted to the customers.
        </p>
        <img src={TOUR_GIF_ESTIMATE} alt="Create Car Profile" />
      </div>
    )
  },
  {
    selector: ".v-appointments",
    content: (
      <div>
        <img
          src={TOUR_ICON_APPOINTMENT}
          alt="Appointment"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Confirm booking and appointment</h4>
        <p className="mb-2">
          Set the appointment by choosing from the 3 preferred schedules by the
          customer, then specifying the exact date and time for the service to
          be rendered.
        </p>
      </div>
    )
  },
  {
    selector: ".v-appointments",
    content: (
      <div>
        <img
          src={TOUR_ICON_RATE}
          alt="Feedback and Rating"
          style={{ height: 50 }}
          className="mb-2"
        />
        <h4>Receive feedback from customer</h4>
        <p className="mb-2">
          Grow and improve customer service through our platform's two-way
          feedback system. Rating and comments will be received after the
          appointment has been completed and service has been rendered. Auto
          shops can also give rating and feedback to customers.
        </p>
      </div>
    )
  },
  {
    content: (
      <div>
        <h4>
          You're now ready to start using{" "}
          <strong className="text-primary">AutoServed</strong>.
        </h4>
        <p>
          Don't hesitate to contact us at{" "}
          <a href="mailto:support@autoserved.com">support@autoserved.com</a> if
          you have questions and suggestions.
        </p>
      </div>
    )
  }
];

const HowTo = ({ user, firstTimeLogin, setFirstTimeLogin }) => {
  const [isTourOpen, toggleTour] = useState(false);
  const [steps, setSteps] = useState(customerSteps);

  useEffect(() => {
    const { user_type, first_time_login } = user;
    first_time_login && toggleTour(first_time_login && firstTimeLogin);
    setSteps(
      user_type === "vendor"
        ? vendorSteps
        : user_type === "customer"
        ? customerSteps
        : []
    );
  }, [user, firstTimeLogin]);

  const _tourMe = () => {
    toggleTour(!isTourOpen);
    setFirstTimeLogin(false);
  };

  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="btn nav-link-icon text-center"
        title="How it works?"
        onClick={_tourMe}
      >
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">help</i>
        </div>
      </NavLink>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={_tourMe}
        showCloseButton
        closeWithMask
      />
    </NavItem>
  );
};

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  firstTimeLogin: state.menuReducer.firstTimeLogin
});

export default withTranslation()(
  connect(mapStateToProps, { setFirstTimeLogin })(HowTo)
);
