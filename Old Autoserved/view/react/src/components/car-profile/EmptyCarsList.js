import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "shards-react";

import { ICONS_CAR } from "../../utils/constants";

const EmptyCarsList = ({ t, toggleModal }) => (
  <Card className="mb-4">
    <CardBody className="text-center">
      <img
        src={ICONS_CAR}
        alt="Garage Icon"
        style={{ height: 75 }}
        className="mb-3"
      />
      <h4>
        <strong>{t("translation.txtCarProfileCaption")}</strong>
      </h4>
      <h6>{t("translation.txtCarProfileNoCars")}</h6>
      {/* <Link className="mt-3 mb-2 btn btn-primary btn-pill" to={"/cars/new"}>
        {t("translation.btnCreateNewCar")}
      </Link> */}
      <Button className="mt-3 mb-2" pill onClick={toggleModal}>
        {t("translation.btnCreateNewCar")}
      </Button>
    </CardBody>
  </Card>
);

EmptyCarsList.propTypes = {
  toggleModal: PropTypes.func
};

export default withTranslation()(EmptyCarsList);
