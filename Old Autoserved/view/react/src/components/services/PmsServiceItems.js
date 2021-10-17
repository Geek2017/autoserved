import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
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
} from 'shards-react';

const PmsServiceItems = ({ events, oilTypes, pmsPrices, vehicleTypes }) => {
  const { handleOilTypePrice, handleVehicleTypePrice } = events;
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">PMS Service - Pricing</h6>
      </CardHeader>
      <CardBody className="px-4">
        <ListGroup flush>
          <ListGroupItem>
            <Row>
              <Col lg="6">
                <strong>Labor</strong>
                <Form className="mt-3">
                  {vehicleTypes.length
                    ? vehicleTypes.map((item, index) => {
                        let laborPrices = null;

                        if (pmsPrices) {
                          laborPrices = pmsPrices.labor_prices;
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
                                defaultValue={data ? data.price : ''}
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
                        let oilTypePrices = null;

                        if (pmsPrices) {
                          oilTypePrices = pmsPrices.oil_type_prices;
                        }

                        const data = oilTypePrices
                          ? oilTypePrices.find(
                              dataObject => item === dataObject.oil_type
                            )
                          : null;
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
                                  handleOilTypePrice(event, item);
                                }}
                                defaultValue={data ? data.price : ''}
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
      </CardBody>
      <CardFooter />
    </Card>
  );
};

PmsServiceItems.defaultProps = {
  oilTypes: [],
  pmsPrices: null,
  vehicleTypes: []
};

PmsServiceItems.propTypes = {
  events: PropTypes.object,
  oilTypes: PropTypes.array,
  pmsPrices: PropTypes.object,
  vehicleTypes: PropTypes.array
};

export default withTranslation()(PmsServiceItems);
