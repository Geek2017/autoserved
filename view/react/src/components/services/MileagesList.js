import React from "react";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { TextRow } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from "shards-react";

import { colors, numberFormatter } from "../../utils/helper";

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <ListGroupItem key={repeat} className="d-flex px-3 p-2">
        <TextRow color={colors.PLACEHOLDER_COLOR} />
      </ListGroupItem>
    );
    repeat--;
  }

  return <div>{component}</div>;
};

const MileagesList = ({ data, isFetching, mileages }) => (
  <Card small>
    <CardHeader className="border-bottom">
      <Row>
        <Col className="d-flex">
          <h6 className="m-0">Mileage</h6>
        </Col>
      </Row>
    </CardHeader>
    <CardBody>
      <ListGroup small flush className="list-group-small">
        <ReactPlaceholder
          ready={!isFetching}
          showLoadingAnimation={true}
          customPlaceholder={<Placeholder repeat={10} />}
        >
          {mileages.length ? (
            mileages.map((item, index) => (
              <ListGroupItem key={index} className="d-flex px-3 p-2">
                <Col lg="8">
                  <h6 className="text-primary font-weight-bold mb-0">
                    <Link to={`/services/preventive/mileage-${item.mileage}`}>
                      {numberFormatter.format(item.mileage)} km
                    </Link>
                    {data.pricedPms &&
                      data.pricedPms.priced_labor[item.mileage] &&
                      data.pricedPms.priced_oil[item.mileage] && (
                        <Badge className="ml-2" theme="success">
                          <small>Completed</small>
                        </Badge>
                      )}
                  </h6>
                  <small className="mb-0 text-muted">
                    {item.change_items.join(", ")}
                  </small>
                </Col>
                <Col lg="4">
                  <Link
                    to={`/services/preventive/mileage-${item.mileage}`}
                    className="mr-1 btn btn-sm btn-info btn-block text-white"
                  >
                    <i className="material-icons">edit</i> Manage Services
                  </Link>
                </Col>
              </ListGroupItem>
            ))
          ) : (
            <p>No mileage data found</p>
          )}
        </ReactPlaceholder>
      </ListGroup>
    </CardBody>
  </Card>
);

MileagesList.defaultProps = {
  mileages: []
};

MileagesList.propTypes = {
  mileages: PropTypes.array,
  isFetching: PropTypes.bool
};

export default MileagesList;
