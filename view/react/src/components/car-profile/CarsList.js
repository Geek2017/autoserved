import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ReactPlaceholder from "react-placeholder";
import { RoundShape, TextBlock } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Tooltip
} from "shards-react";

import EmptyCarsList from "./EmptyCarsList";
import { DEFAULT_CAR_AVATAR } from "../../utils/constants";
import { colors } from "../../utils/helper";

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td className="lo-stats__image">
          <RoundShape
            color={colors.PLACEHOLDER_COLOR}
            style={{ width: 50, height: 50 }}
          />
        </td>
        <td className="lo-stats__order-details">
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={4}
            style={{ width: 200 }}
          />
        </td>
        <td className="lo-stats__status">
          <div className="d-table mx-auto">
            <Badge theme="secondary" outline className="text-uppercase">
              -
            </Badge>
          </div>
        </td>
        <td className="lo-stats__total text-center text-capitalize">
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={1} />
        </td>
        <td className="lo-stats__total text-center text-capitalize" />
      </tr>
    );
    repeat--;
  }

  return component;
};

const CarsList = ({ cars, events, isFetching, t }) => {
  const [toolTips, setToolTip] = useState([]);
  return isFetching || cars.length ? (
    <Card small className="carlist-container mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Cars</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <div className="datatable datatable--plain">
            <table className="table lo-stats mb-0">
              <thead className="py-1 bg-light text-semibold border-bottom">
                <tr>
                  <th colSpan={2}>
                    <small>Car Details</small>
                  </th>
                  <th className="text-center">
                    <small>Plate Number</small>
                  </th>
                  <th className="text-center">
                    <small>{t("common.tblColType")}</small>
                  </th>
                  <th className="text-center">
                    <small>{t("common.tblColActions")}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ReactPlaceholder
                  ready={!isFetching}
                  showLoadingAnimation={true}
                  customPlaceholder={<Placeholder repeat={3} />}
                >
                  {cars.map((car, index) => {
                    toolTips[index] = {
                      schedule: toolTips[index]
                        ? toolTips[index].schedule
                        : false,
                      manage: toolTips[index] ? toolTips[index].manage : false,
                      delete: toolTips[index] ? toolTips[index].delete : false
                    };
                    return (
                      <tr key={index}>
                        <td className="lo-stats__image">
                          <img
                            alt={`${car.car_year} - ${car.car_make.name || ""}`}
                            className="rounded"
                            src={DEFAULT_CAR_AVATAR}
                          />
                        </td>
                        <td
                          className="lo-stats__order-details"
                          data-table-label="Car Details"
                        >
                          <h6 className="mb-0 font-weight-bold">
                            {car.car_year ? `${car.car_year} - ` : null}
                            {car.car_make.name || ""}
                          </h6>
                          <Link to={`/car/${car.id}/schedule`}>
                            {car.car_model.name || ""}{" "}
                            {car.car_trim ? car.car_trim.name : ""}
                          </Link>
                          <p className="mb-0">
                            <small
                              title={
                                car.last_serviced
                                  ? moment(car.last_serviced).format(
                                      "MMMM Do, YYYY"
                                    )
                                  : "-"
                              }
                            >
                              Last Serviced:{" "}
                              {car.last_serviced
                                ? moment(car.last_serviced).fromNow()
                                : "-"}
                            </small>
                          </p>
                          <p className="mb-0">
                            <small>
                              Last Updated: {moment(car.updated_at).fromNow()}
                            </small>
                          </p>
                        </td>
                        <td
                          className="lo-stats__total text-center"
                          data-table-label="Plate Number"
                        >
                          <Badge
                            theme="secondary"
                            outline
                            className="text-uppercase"
                          >
                            {car.plate_number || "-"}
                          </Badge>
                        </td>
                        <td
                          className="lo-stats__total text-center text-capitalize"
                          data-table-label="Car Type"
                        >
                          {car.type || "-"}
                        </td>
                        <td
                          className="lo-stats__total text-center text-capitalize"
                          data-table-label="Actions"
                        >
                          <Link
                            id={`btnManagePMSSchedule-${index}`}
                            className="btn btn-info btn-sm text-white mx-2"
                            title="Edit Shop Details"
                            to={`/car/${car.id}/schedule`}
                          >
                            <i className="material-icons">schedule</i>
                          </Link>
                          <Tooltip
                            target={`#btnManagePMSSchedule-${index}`}
                            open={toolTips[index].schedule}
                            toggle={() => {
                              const newToolTips = [...toolTips];
                              newToolTips[index].schedule = !newToolTips[index]
                                .schedule;
                              setToolTip(newToolTips);
                            }}
                          >
                            View PMS Schedules
                          </Tooltip>
                          <Button
                            id={`btnManageCarProfile-${index}`}
                            className="mx-2 text-white"
                            size="sm"
                            theme="warning"
                            title="Edit Car Profile"
                            onClick={() => events.toggleModalEdit(car)}
                          >
                            <i className="material-icons">edit</i>
                          </Button>
                          <Tooltip
                            target={`#btnManageCarProfile-${index}`}
                            open={toolTips[index].manage}
                            toggle={() => {
                              const newToolTips = [...toolTips];
                              newToolTips[index].manage = !newToolTips[index]
                                .manage;
                              setToolTip(newToolTips);
                            }}
                          >
                            Manage Car Profile
                          </Tooltip>
                          <Button
                            id={`btnDeleteCarProfile-${index}`}
                            className="mx-2"
                            size="sm"
                            theme="danger"
                            title="Delete Car Profile"
                            onClick={() => events.toggleModalDeletion(car)}
                          >
                            <i className="material-icons">delete</i>
                          </Button>
                          <Tooltip
                            target={`#btnDeleteCarProfile-${index}`}
                            open={toolTips[index].delete}
                            toggle={() => {
                              const newToolTips = [...toolTips];
                              newToolTips[index].delete = !newToolTips[index]
                                .delete;
                              setToolTip(newToolTips);
                            }}
                          >
                            Delete Car
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </ReactPlaceholder>
              </tbody>
            </table>
          </div>
        </Container>
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyCarsList toggleModal={events.toggleModalCreation} />
  );
};
CarsList.defaultProps = {
  cars: [],
  events: {}
};

CarsList.propTypes = {
  cars: PropTypes.array,
  events: PropTypes.object,
  isFetching: PropTypes.bool
};

export default withTranslation()(CarsList);
