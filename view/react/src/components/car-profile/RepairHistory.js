import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { TextRow } from "react-placeholder/lib/placeholders";
import { Card, CardBody, CardHeader, Container } from "shards-react";

import { colors } from "../../utils/helper";
import currencyFormatter from "../../utils/helper/currency-formatter";

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <tr key={repeat}>
        <td colSpan={2}>
          <TextRow color={colors.PLACEHOLDER_COLOR} />
        </td>
      </tr>
    );
    repeat--;
  }

  return component;
};

const RepairHistory = ({ isFetching, history }) => {
  return (
    history.length > 0 && (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Repair History</h6>
        </CardHeader>
        <CardBody className="p-0">
          <Container fluid className="px-0 pb-4">
            <table className="table lo-stats mb-0">
              <thead className="py-1 bg-light text-semibold border-bottom">
                <tr>
                  <th className="text-center">
                    <small>Shop</small>
                  </th>
                  <th className="text-center">
                    <small>Details</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ReactPlaceholder
                  ready={!isFetching}
                  showLoadingAnimation={true}
                  customPlaceholder={<Placeholder repeat={3} />}
                >
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td className="font-weight-bold text-primary text-center">
                        {item.shop.name}
                        <p className="text-capitalize">
                          <strong className="text-secondary">
                            <small className="font-weight-bold">
                              {item.type}
                            </small>
                          </strong>
                        </p>
                      </td>
                      <td className="text-center">
                        <span className="font-weight-bold">
                          {moment(item.date).format("MMM. Do, YYYY")}
                        </span>
                        <p className="mb-0 text-success">
                          {currencyFormatter.format(item.total_cost)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </ReactPlaceholder>
              </tbody>
            </table>
          </Container>
        </CardBody>
      </Card>
    )
  );
};

RepairHistory.defaultProps = {
  history: []
};

RepairHistory.propTypes = {
  isFetching: PropTypes.bool,
  history: PropTypes.array
};

export default RepairHistory;
