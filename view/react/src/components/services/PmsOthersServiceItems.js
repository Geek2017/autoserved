import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormInput,
  ListGroup,
  ListGroupItem,
  Row
} from "shards-react";

const PmsOthersServiceItems = ({ events, data }) => {
  const { handlePrice, handleVehicleTypePrice } = events;
  const { oilTypes, otherService, otherPrices, vehicleTypes } = data;
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0 text-capitalize">{otherService.name} - Pricing</h6>
      </CardHeader>
      <CardBody className="px-4">
        {otherService.type === "oil" ? (
          <ListGroup flush>
            <ListGroupItem>
              <Row>
                <Col lg="6">
                  <strong>Labor</strong>
                  <Form className="mt-3">
                    {vehicleTypes.length
                      ? vehicleTypes.map((item, index) => {
                          let laborPrices = null;

                          if (otherPrices) {
                            laborPrices = otherPrices.labor_prices;
                          }

                          const data = laborPrices
                            ? laborPrices.find(
                                dataObject => item === dataObject.car_type
                              )
                            : null;
                          return (
                            <Row key={index} form>
                              <Col lg="8" className="form-group">
                                <label
                                  className="text-capitalize text-light"
                                  htmlFor={`txtPriceVehicle${index}`}
                                >
                                  {item}
                                </label>
                              </Col>
                              <Col lg="4">
                                <FormInput
                                  id={`txtPriceVehicle${index}`}
                                  type="number"
                                  placeholder="Price"
                                  onChange={event => {
                                    handleVehicleTypePrice(event, item);
                                  }}
                                  defaultValue={data ? data.price : ""}
                                />
                              </Col>
                            </Row>
                          );
                        })
                      : null}
                  </Form>
                </Col>
                <Col lg="6">
                  <strong>Engine Oil Type</strong>
                  <p>
                    <small>(Price/Liter)</small>
                  </p>
                  <Form className="mt-3">
                    {oilTypes.length
                      ? oilTypes.map((item, index) => {
                          let price = null;

                          if (
                            otherPrices &&
                            otherPrices.oil_prices &&
                            otherPrices.oil_prices.values
                          ) {
                            price = otherPrices.oil_prices.values[item];
                          }

                          return (
                            <Row key={index} form>
                              <Col lg="8" className="form-group">
                                <label
                                  className="text-capitalize text-light"
                                  htmlFor={`txtPriceOil${index}`}
                                >
                                  {item}
                                </label>
                              </Col>
                              <Col lg="4">
                                <FormInput
                                  id={`txtPriceOil${index}`}
                                  type="number"
                                  placeholder="Price"
                                  onChange={event => {
                                    handlePrice(event, item);
                                  }}
                                  defaultValue={price || ""}
                                />
                              </Col>
                            </Row>
                          );
                        })
                      : null}
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        ) : null}
      </CardBody>
      <CardFooter />
    </Card>
  );
};

PmsOthersServiceItems.defaultProps = {
  data: null
};

PmsOthersServiceItems.propTypes = {
  events: PropTypes.object,
  data: PropTypes.object
};

export default withTranslation()(PmsOthersServiceItems);
