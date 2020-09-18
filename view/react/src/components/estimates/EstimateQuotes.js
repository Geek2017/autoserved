import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder/lib';
import { RoundShape, TextBlock } from 'react-placeholder/lib/placeholders';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container
} from 'shards-react';

import { colors, numberFormatter } from '../../utils/helper';
import EmptyEstimateQuotes from './EmptyEstimateQuotes';
import currencyFormatter from '../../utils/helper/currency-formatter';
import { DEFAULT_CAR_AVATAR, DEFAULT_SHOP_AVATAR } from '../../utils/constants';

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
        <td />
      </tr>
    );
    repeat--;
  }

  return component;
};

const EstimateQuotes = ({ isFetching, estimates, events }) => {
  return isFetching || estimates.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Estimates Received from Shops</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th colSpan={2}>
                  <small>Estimating Shop</small>
                </th>
                <th colSpan={2}>
                  <small>Car Details</small>
                </th>
                <th className="text-center">
                  <small>Price</small>
                </th>
                <th className="text-center">
                  <small>Schedule</small>
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
                {estimates.map((estimate, index) => (
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
                    <td
                      className="lo-stats__order-details"
                      style={{ width: 200 }}
                    >
                      <Link to={`/shop/${estimate.shop.slug}`}>
                        {estimate.shop.name}
                      </Link>
                      <p className="mb-0"></p>
                      <p className="mb-0">
                        <i className="material-icons">room</i>{' '}
                        <small className="font-weight-bold">
                          {estimate.shop.address}
                        </small>{' '}
                        <small>
                          ({numberFormatter.format(estimate.distance)} km away)
                        </small>
                      </p>
                    </td>
                    <td className="lo-stats__image">
                      <img
                        alt={`${estimate.request.car.car_year} - ${estimate
                          .request.car.car_make.name || ''}`}
                        className="rounded"
                        src={DEFAULT_CAR_AVATAR}
                      />
                    </td>
                    <td className="lo-stats__order-details">
                      <h6 className="mb-0 font-weight-bold">
                        {estimate.request.car.car_year
                          ? `${estimate.request.car.car_year} - `
                          : null}
                        {estimate.request.car.car_make.name || ''}
                      </h6>
                      <Link to={`/car/${estimate.request.car.id}/schedule`}>
                        {estimate.request.car.car_model.name || ''}{' '}
                        {estimate.request.car.car_trim
                          ? estimate.request.car.car_trim.name
                          : ''}
                      </Link>
                    </td>
                    <td className="text-center text-capitalize text-success">
                      {currencyFormatter.format(estimate.total) || '-'}
                    </td>
                    <td className="text-capitalize text-center">
                      <p className="mb-0 text-primary">
                        {estimate.request.type}
                      </p>
                      <p className="mb-0">
                        {moment(estimate.preferred_date).format(
                          '(dddd) MMM. Do, YYYY'
                        )}{' '}
                        - {estimate.preferred_time}
                      </p>
                    </td>
                    <td className="text-center text-capitalize">
                      <Button
                        theme="primary"
                        size="sm"
                        className="mx-2"
                        onClick={() =>
                          events.toggleModalCreation(estimate.id, index)
                        }
                      >
                        <i className="material-icons">remove_red_eye</i> Review
                      </Button>
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
    <EmptyEstimateQuotes />
  );
};

EstimateQuotes.defaultProps = {
  estimates: []
};

EstimateQuotes.propTypes = {
  estimates: PropTypes.array,
  isFetching: PropTypes.bool,
  toggleModalCreation: PropTypes.func
};

export default withTranslation()(EstimateQuotes);
