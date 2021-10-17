import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ReactPlaceholder from "react-placeholder/lib";
import { TextBlock, RoundShape } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container
} from "shards-react";

import { colors } from "../../utils/helper";
import EmptyAppointmentsList from "./EmptyAppointmentsList";
import { DEFAULT_SHOP_AVATAR } from "../../utils/constants";
import currencyFormatter from "../../utils/helper/currency-formatter";

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
        <td>
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={3}
            style={{ width: 150 }}
          />
        </td>
        <td>
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 100 }}
          />
        </td>
        <td>
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={1}
            style={{ width: 100 }}
          />
        </td>
        <td>
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={1} />
        </td>
        <td />
      </tr>
    );
    repeat--;
  }

  return component;
};

const AppointmentsList = ({
  attemptSubmit,
  approve,
  isFetching,
  appointments,
  type,
  t
}) => {
  return isFetching || appointments.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Appointments</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th colSpan={2}>
                  <small>Shop Details</small>
                </th>
                <th className="text-center">
                  <small>Price</small>
                </th>
                <th className="text-center">
                  <small>Appointment Schedule</small>
                </th>
                <th className="text-center">
                  <small>Type</small>
                </th>
                <th className="text-center">
                  <small>Action</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <ReactPlaceholder
                ready={!isFetching}
                showLoadingAnimation={true}
                customPlaceholder={<Placeholder repeat={3} />}
              >
                {appointments.map(({ id, estimate, status }, index) => (
                  <tr key={index}>
                    <td className="lo-stats__image">
                      <img
                        alt={estimate.shop.name}
                        className="rounded"
                        src={
                          estimate.shop.avatar
                            ? estimate.shop.avatar.path
                            : DEFAULT_SHOP_AVATAR
                        }
                      />
                    </td>
                    <td className="lo-stats__order-details">
                      <Link to={`/shop/${estimate.shop.slug}`}>
                        {estimate.shop.name}
                      </Link>
                      <p className="mb-0">
                        <small className="text-capitalize">{status}</small>
                      </p>
                    </td>
                    <td className="text-center text-capitalize text-success">
                      {currencyFormatter.format(estimate.total) || "-"}
                    </td>
                    <td className="text-capitalize text-center">
                      <p className="mb-0">
                        {moment(estimate.preferred_date).format(
                          "(dddd) MMM. Do, YYYY"
                        )}{" "}
                        - {estimate.preferred_time}
                      </p>
                    </td>
                    <td className="text-center text-capitalize text-primary">
                      {estimate.request.type || "-"}
                    </td>
                    <td className="text-center text-capitalize">
                      <Link
                        className="btn btn-primary btn-sm mx-2"
                        to={`/appointment/${id}`}
                      >
                        <i className="material-icons">remove_red_eye</i> View
                        Details
                      </Link>
                      {type === "vendor" && status === "pending" && (
                        <Button
                          theme="success"
                          size="sm"
                          className="mx-2"
                          onClick={() => approve(id, estimate.total)}
                        >
                          {attemptSubmit ? (
                            <div>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="sr-only">
                                {t("common.lblLoading")}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <i className="material-icons">check</i> Accept
                            </div>
                          )}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </ReactPlaceholder>
            </tbody>
          </table>
        </Container>
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyAppointmentsList />
  );
};

AppointmentsList.defaultProps = {
  appointments: [],
  attemptSubmit: false
};

AppointmentsList.propTypes = {
  attemptSubmit: PropTypes.bool,
  approve: PropTypes.func,
  isFetching: PropTypes.bool,
  appointments: PropTypes.array,
  type: PropTypes.string
};

export default withTranslation()(AppointmentsList);
