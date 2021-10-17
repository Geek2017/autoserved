import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TagsInput from "react-tagsinput";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row
} from "shards-react";

import { numberFormatter } from "../../utils/helper";
import currencyFormatter from "../../utils/helper/currency-formatter";

const CreateOtherEstimateModal = ({
  current,
  data,
  errorMessages,
  events,
  maxPages,
  open,
  toggle,
  validated
}) => {
  return (
    <Modal centered fade open={open} role="dialog" size="lg" toggle={toggle}>
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        {data.content ? `Creating estimates for Other PMS Service` : ""}
      </ModalHeader>
      <ModalBody className="pt-3" style={{ height: 400, overflow: "auto" }}>
        <div className="progress-wrapper mb-3">
          <div className="progress-label">Completion Progress</div>
          <Progress
            className="progress-sm"
            max={maxPages}
            striped
            value={current + 1}
          >
            <span className="progress-value">{`${current +
              1} / ${maxPages}`}</span>
          </Progress>
          {!data.otherPrices.oil_prices || !data.otherPrices.labor_prices ? (
            <Alert fade theme="warning" className="mt-3 rounded">
              <p className="mb-0">
                <i className="material-icons">warning</i> You haven't provided
                any price for this type of service. Click{" "}
                <Link
                  className="text-secondary"
                  to={`/services/preventive/service-${data.content.pms_others_request.pms_others.type}`}
                >
                  here
                </Link>{" "}
                to update the prices.
              </p>
            </Alert>
          ) : null}
          {!data.pmsShops.length ? (
            <Alert fade theme="warning" className="mt-3 rounded">
              <p className="mb-0">
                <i className="material-icons">warning</i> You have no shops that
                have PMS enabled. Click{" "}
                <Link className="text-secondary" to="/services/preventive">
                  here
                </Link>{" "}
                to enable shops.
              </p>
            </Alert>
          ) : null}
        </div>
        {errorMessages.map((error, index) => (
          <Alert
            key={index}
            fade
            theme="danger"
            className="outline-danger rounded"
          >
            <p className="mb-0">{error.message}</p>
          </Alert>
        ))}
        {current === 0 ? (
          <div>
            {data.content ? (
              <Row>
                <Col lg="12">
                  <strong>Change Oil Service</strong>
                  <ul className="mt-3">
                    <li>
                      <small className="text-capitalize">
                        {data.content.pms_others_request.pms_others.name}
                      </small>
                    </li>
                  </ul>
                </Col>
              </Row>
            ) : null}
          </div>
        ) : current === 1 ? (
          <div className="text-center">
            <h5>Customer Car Details</h5>
            {data.content ? (
              <Row className="mb-3">
                <Col className="mx-auto" lg="9">
                  <h4 className="mb-2 text-center">
                    {data.content.car.car_year
                      ? `${data.content.car.car_year} - `
                      : null}
                    {data.content.car.car_make.name || ""}
                  </h4>
                  <h6 className="text-center">
                    {data.content.car.car_model.name || ""}{" "}
                    {data.content.car.car_trim
                      ? data.content.car.car_trim.name
                      : ""}
                  </h6>
                  <ListGroup flush>
                    <ListGroupItem className="px-4 text-center">
                      <div>
                        <span className="font-weight-bold text-primary">
                          {numberFormatter.format(
                            data.content.car.current_mileage
                          )}{" "}
                          km
                        </span>{" "}
                        since{" "}
                        <span className="font-weight-bold">
                          {data.content.car.date_purchased
                            ? moment(data.content.car.date_purchased).format(
                                "MMM. Do, YYYY"
                              )
                            : "-"}
                        </span>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="px-4">
                      <strong className="text-muted d-block mb-1 mt-3">
                        Vehicle Type
                      </strong>
                      <span className="text-capitalize">
                        {data.content.car.type}
                      </span>
                      <strong className="text-muted d-block mb-1 mt-3">
                        Engine / Transmission
                      </strong>
                      <span className="text-capitalize">
                        {data.content.car.engine_type} /{" "}
                        {data.content.car.transmission}
                      </span>
                      <strong className="text-muted d-block mb-1 mt-3">
                        Last Serviced
                      </strong>
                      <span
                        title={
                          data.content.car.last_serviced
                            ? moment(data.content.car.last_serviced).format(
                                "MMMM Do YYYY"
                              )
                            : "-"
                        }
                      >
                        {data.content.car.last_serviced
                          ? moment(data.content.car.last_serviced).fromNow()
                          : "-"}
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            ) : null}
          </div>
        ) : current === 2 ? (
          <div className="text-center">
            <h5>
              Select available shop <span className="text-danger">*</span>
            </h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <FormSelect
                  className="text-capitalize"
                  onChange={events.handleSelectedShop}
                  value={data.selectedShop || ""}
                >
                  {!data.selectedShop ? (
                    <option value={""}>Choose Shop</option>
                  ) : null}
                  {data.pmsShops.map((shop, index) => (
                    <option key={`date-${index}`} value={index}>
                      {shop.name}
                    </option>
                  ))}
                </FormSelect>
              </Col>
            </Row>
            <h5>
              Select best schedule <span className="text-danger">*</span>
            </h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <FormSelect
                  className="text-capitalize"
                  onChange={events.handleSelectedSchedule}
                  value={data.selectedSchedule || ""}
                >
                  {!data.selectedSchedule ? (
                    <option value={""}>Choose Schedule</option>
                  ) : null}
                  {data.content.preferred_schedule.map(
                    ({ date, time }, index) => (
                      <option key={`date-${index}`} value={index}>
                        {moment(date).format("(dddd) MMM. Do, YYYY")} - {time}
                      </option>
                    )
                  )}
                </FormSelect>
              </Col>
            </Row>
          </div>
        ) : current === 3 ? (
          <div className="text-center">
            <h5>Set price for replacement items requested by customer</h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <ListGroup flush>
                  <ListGroupItem>
                    {data.otherPrices.oil_prices
                      ? data.otherPrices.oil_prices.pms_others.items.map(
                          (item, index) => (
                            <Row key={index} className="mb-1">
                              <Col lg="6" className="text-left">
                                <strong className="mb-0 text-capitalize">
                                  {item} <span className="text-danger">*</span>
                                </strong>
                              </Col>
                              <Col lg="6">
                                <FormInput
                                  placeholder="Input price"
                                  type="number"
                                  min={0}
                                  onChange={event =>
                                    events.handleOtherReplacementItems(
                                      event,
                                      item
                                    )
                                  }
                                  value={data.otherReplacementItems[item] || ""}
                                />
                              </Col>
                            </Row>
                          )
                        )
                      : null}
                    <Row className="mb-1">
                      <Col lg="6" className="text-left">
                        <strong className="mb-0 text-capitalize">
                          Engine Oil Capacity (Liters){" "}
                          <span className="text-danger">*</span>
                        </strong>
                        <p className="mb-1">
                          <small className="text-capitalize">
                            Customer Chose: (
                            {data.content.pms_others_request.value})
                          </small>
                        </p>
                      </Col>
                      <Col lg="6">
                        <FormInput
                          placeholder="Suggest engine oil capacity"
                          type="number"
                          min={0}
                          onChange={events.handleOtherLitersInput}
                          value={data.otherLiters || ""}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6" className="text-left">
                        <strong className="mb-0 text-capitalize">
                          Additional Items{" "}
                        </strong>
                      </Col>
                      <Col lg="6">
                        <small
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline"
                          }}
                          className="text-primary"
                          onClick={events.addOtherItems}
                        >
                          Add
                        </small>
                      </Col>
                    </Row>
                    {data.otherItems.map((item, index) => (
                      <Row key={index} className="mb-1">
                        <Col lg="6">
                          <FormInput
                            placeholder="Additional Item"
                            type="text"
                            onChange={event =>
                              events.handleAdditionalItem(event, index)
                            }
                            value={item.entry || ""}
                          />
                        </Col>
                        <Col lg="6">
                          <FormInput
                            placeholder="Input price"
                            type="number"
                            min={0}
                            onChange={event =>
                              events.handleAdditionalItemPrice(event, index)
                            }
                            value={item.price || ""}
                          />
                        </Col>
                      </Row>
                    ))}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <h5>Make your customers happy with freebies</h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <TagsInput
                  value={data.freebies}
                  onChange={events.handleFreebies}
                  inputProps={{
                    placeholder: "Add Freebies"
                  }}
                />
              </Col>
            </Row>
            <h5>Additional notes</h5>
            <small>Notes are only visible to you.</small>
            <Row className="mb-3">
              <Col className="mx-auto" lg="9">
                <FormTextarea
                  value={data.notes || ""}
                  onChange={events.handleNotes}
                />
              </Col>
            </Row>
          </div>
        ) : current === 4 ? (
          <div className="text-center">
            <h5>Review your estimation</h5>
            <Row className="mb-3">
              <Col className="mx-auto" lg="6">
                <ListGroup flush>
                  <ListGroupItem>
                    <Row className="mb-1">
                      <Col lg="12" className="text-left">
                        <Row className="mb-1">
                          <Col lg="6" className="text-left">
                            <strong>Labor Costs</strong>
                            <p className="mb-2">
                              <small className="text-capitalize">
                                {data.content.car.type}
                              </small>
                            </p>
                          </Col>
                          <Col lg="6" className="text-right">
                            <strong>
                              {data.otherLaborPrice
                                ? currencyFormatter.format(
                                    data.otherLaborPrice.price
                                  )
                                : "-"}
                            </strong>
                          </Col>
                        </Row>
                        <strong>Additional Items</strong>
                        {data.otherItems.length ? (
                          data.otherItems.map((item, index) => (
                            <Row key={index} className="mb-1">
                              <Col lg="6" className="text-left">
                                <div className="mb-1 ml-3 text-capitalize">
                                  <small>{item.entry}</small>
                                </div>
                              </Col>
                              <Col lg="6">
                                <p className="text-right mb-1 text-info">
                                  <strong>
                                    {currencyFormatter.format(item.price) ||
                                      "-"}
                                  </strong>
                                </p>
                              </Col>
                            </Row>
                          ))
                        ) : (
                          <Col lg="6" className="text-left">
                            <p className="mb-2">
                              <small className="text-capitalize">-</small>
                            </p>
                          </Col>
                        )}
                        <strong>Replacement Items</strong>
                        {data.otherPrices.oil_prices
                          ? data.otherPrices.oil_prices.pms_others.items.map(
                              (item, index) => (
                                <Row key={index} className="mb-1">
                                  <Col lg="6" className="text-left">
                                    <div className="mb-1 ml-3 text-capitalize">
                                      <small>{item}</small>
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <p className="text-right mb-1 text-info">
                                      <strong>
                                        {currencyFormatter.format(
                                          data.otherReplacementItems[item]
                                            ? data.otherReplacementItems[item]
                                            : 0
                                        ) || "-"}
                                      </strong>
                                    </p>
                                  </Col>
                                </Row>
                              )
                            )
                          : null}
                        <Row>
                          <Col lg="6">
                            <div className="mb-1 ml-3 text-capitalize">
                              <small>
                                Engine Oil -{" "}
                                {
                                  data.content.pms_others_request.pms_others
                                    .name
                                }{" "}
                                ({data.otherLiters}L) @{" "}
                                {data.otherPrices.oil_prices
                                  ? currencyFormatter.format(
                                      data.otherPrices.oil_prices.values[
                                        data.content.pms_others_request.value
                                      ]
                                    )
                                  : "-"}{" "}
                                per liter
                              </small>
                            </div>
                          </Col>
                          <Col lg="6">
                            <p className="text-right mb-1 text-info">
                              <strong>
                                {data.otherPrices.oil_prices
                                  ? currencyFormatter.format(
                                      data.otherLiters *
                                        data.otherPrices.oil_prices.values[
                                          data.content.pms_others_request.value
                                        ]
                                    )
                                  : "-"}
                              </strong>
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="mb-1">
                      <Col lg="6" className="text-left">
                        <strong>Total Price</strong>
                      </Col>
                      <Col lg="6" className="text-right text-success">
                        <strong>
                          {currencyFormatter.format(data.totalPrice)}
                        </strong>
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col lg="6" className="text-left text-info">
                        <span>Platform Fee (5.00%)</span>
                        <p className="mb-0 text-secondary">
                          <small>
                            To be deducted from your wallet on appointment
                            approval.
                          </small>
                        </p>
                      </Col>
                      <Col lg="6" className="text-right text-info">
                        <span>
                          {currencyFormatter.format(data.totalPrice * 0.05)}
                        </span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="mx-auto text-left" lg="6">
                <FormCheckbox
                  checked={data.reviewed}
                  onChange={events.handleChkReviewed}
                >
                  I have reviewed the estimation and I'm ready to submit
                </FormCheckbox>
              </Col>
            </Row>
          </div>
        ) : null}
      </ModalBody>
      <ModalFooter className="d-block">
        <Row>
          <Col className="text-align-left" lg="6">
            <ButtonGroup>
              <Button
                disabled={current === 0}
                theme="primary"
                onClick={events.previous}
              >
                &laquo; Previous
              </Button>
              <Button
                disabled={current === maxPages - 1}
                theme="primary"
                onClick={events.next}
              >
                Next &raquo;
              </Button>
            </ButtonGroup>
          </Col>
          <Col className="d-flex justify-content-end" lg="6">
            <ButtonGroup>
              <Button
                disabled={!validated}
                theme="success"
                onClick={events.submit}
              >
                <div>
                  <span className="text-white">
                    <i className="material-icons">add</i>
                  </span>{" "}
                  Submit Estimate
                </div>
              </Button>
              <Button onClick={toggle} theme="white">
                <span>
                  <i className="material-icons">close</i>
                </span>{" "}
                Cancel
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

CreateOtherEstimateModal.defaultProps = {
  current: 0,
  data: {},
  errorMessages: [],
  events: {},
  maxPages: 5,
  open: false,
  validated: false
};

CreateOtherEstimateModal.propTypes = {
  current: PropTypes.number,
  data: PropTypes.object,
  errorMessages: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  validated: PropTypes.bool
};

export default withTranslation()(CreateOtherEstimateModal);
