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

import { colors } from "../../utils/helper";

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

const OtherServices = ({ data, isFetching, otherServices }) => {
  return (
    <Card small>
      <CardHeader className="border-bottom">
        <Row>
          <Col className="d-flex">
            <h6 className="m-0">Individual Services</h6>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <ListGroup small flush className="list-group-small">
          <ReactPlaceholder
            ready={!isFetching}
            showLoadingAnimation={true}
            customPlaceholder={<Placeholder repeat={3} />}
          >
            {otherServices.map((item, index) => {
              return (
                <ListGroupItem key={index} className="d-flex px-3 p-2">
                  <Col lg="8">
                    <h6 className="text-primary font-weight-bold mb-0 text-capitalize">
                      <Link to={`/services/preventive/service-${item.type}`}>
                        {item.name}
                      </Link>
                      {data.pricedPmsOthers && data.pricedPmsOthers[item.name] && (
                        <Badge className="ml-2" theme="success">
                          <small>Completed</small>
                        </Badge>
                      )}
                    </h6>
                  </Col>
                  <Col lg="4">
                    <Link
                      to={`/services/preventive/service-${item.type}`}
                      className={`mr-1 btn btn-sm btn-info btn-block text-white`}
                    >
                      <i className="material-icons">edit</i> Manage Service
                    </Link>
                  </Col>
                </ListGroupItem>
              );
            })}
          </ReactPlaceholder>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

OtherServices.propTypes = {
  isFetching: PropTypes.bool,
  otherServices: PropTypes.array
};

export default OtherServices;
