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

const ShopEstimates = ({ events, isFetching, estimates }) => {
  return isFetching || estimates.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">List of Shop Estimates</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th colSpan={2}>
                  <small>Car Details</small>
                </th>
                <th colSpan={2}>
                  <small>Estimating Shop</small>
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
                      <p className="mb-0 text-primary">
                        {estimate.request.car.car_model.name || ''}{' '}
                        {estimate.request.car.car_trim
                          ? estimate.request.car.car_trim.name
                          : ''}
                      </p>
                      <p className="mb-0">
                        <small>
                          Sent to:{' '}
                          <strong>
                            {estimate.request.car.user.fname}{' '}
                            {estimate.request.car.user.lname.charAt(0)}.
                          </strong>{' '}
                        </small>
                      </p>
                      <p className="mb-0">
                        <small>
                          {numberFormatter.format(estimate.distance)} km away
                        </small>
                      </p>
                    </td>
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
                        theme="danger"
                        size="sm"
                        className="mx-2"
                        onClick={() => events.cancel(estimate.id)}
                      >
                        <i className="material-icons">close</i> Cancel
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

ShopEstimates.defaultProps = {
  estimates: []
};

ShopEstimates.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool,
  estimates: PropTypes.array
};

export default withTranslation()(ShopEstimates);
