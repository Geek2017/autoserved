import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Badge, Card, CardBody, ListGroup, ListGroupItem } from "shards-react";

import { DEFAULT_CAR_AVATAR } from "../../utils/constants";
import { numberFormatter } from "../../utils/helper";

const CarDetails = ({ car, t }) => {
  return (
    <Card className="mb-4" small>
      <CardBody>
        {car ? (
          <div>
            <div className="user-details__avatar mx-auto bg-white border-white mb-3 text-center">
              <img
                alt={`${car.car_year} - ${car.car_make.name || ""}`}
                className="rounded"
                src={DEFAULT_CAR_AVATAR}
              />
            </div>
            <h4 className="mb-2 text-center">
              {car.car_year ? `${car.car_year} - ` : null}
              {car.car_make.name || ""}
            </h4>
            <h6 className="text-center">
              {car.car_model.name || ""} {car.car_trim ? car.car_trim.name : ""}
            </h6>
            <ListGroup flush>
              <ListGroupItem className="px-4 text-center">
                <Badge
                  theme="secondary"
                  outline
                  className="text-uppercase mb-3"
                >
                  {car.plate_number || "-"}
                </Badge>
                <div>
                  <span className="font-weight-bold text-primary">
                    {numberFormatter.format(car.current_mileage)} km
                  </span>{" "}
                  since{" "}
                  <span className="font-weight-bold">
                    {car.date_purchased
                      ? moment(car.date_purchased).format("MMM. Do, YYYY")
                      : "-"}
                  </span>
                </div>
              </ListGroupItem>
              <ListGroupItem className="px-4">
                <strong className="text-muted d-block mb-1 mt-3">
                  Engine / Transmission
                </strong>
                <span className="text-capitalize">
                  {car.engine_type} / {car.transmission}
                </span>
                <strong className="text-muted d-block mb-1 mt-3">
                  Last Serviced
                </strong>
                <span
                  title={
                    car.last_serviced
                      ? moment(car.last_serviced).format("MMMM Do YYYY")
                      : "-"
                  }
                >
                  {car.last_serviced
                    ? moment(car.last_serviced).fromNow()
                    : "-"}
                </span>
                <strong className="text-muted d-block mb-1 mt-3">
                  Last Updated
                </strong>
                <span>{moment(car.updated_at).fromNow()}</span>
              </ListGroupItem>
            </ListGroup>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

CarDetails.propTypes = {
  car: PropTypes.object
};

export default withTranslation()(CarDetails);
