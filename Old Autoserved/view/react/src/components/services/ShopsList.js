import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { TextRow } from 'react-placeholder/lib/placeholders';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormCheckbox
} from 'shards-react';

import { colors } from '../../utils/helper';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(<TextRow key={repeat} color={colors.PLACEHOLDER_COLOR} />);
    repeat--;
  }

  return <div>{component}</div>;
};

const ShopsList = ({ disabled, isFetching, onChange, shops }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">List of Shops</h6>
    </CardHeader>
    <CardBody className="px-4">
      <fieldset>
        <ReactPlaceholder
          ready={!isFetching}
          showLoadingAnimation={true}
          customPlaceholder={<Placeholder repeat={3} />}
        >
          <p>
            <small>
              Select shops to enable PMS services. Make sure to complete your{' '}
              <Link to="/shops">Shop Profiles</Link>.
            </small>
          </p>
          {shops.length ? (
            shops.map((shop, index) => (
              <FormCheckbox
                checked={shop.pms_enabled && shop.status !== 'pending'}
                key={index}
                onChange={() => {
                  onChange(shop);
                }}
                small
                disabled={disabled || shop.status === 'pending'}
              >
                <span
                  className={
                    disabled || shop.status === 'pending' ? 'text-muted' : null
                  }
                >
                  {shop.name}
                </span>
              </FormCheckbox>
            ))
          ) : (
            <p>No shops found</p>
          )}
        </ReactPlaceholder>
      </fieldset>
    </CardBody>
    <CardFooter className="border-top text-right">
      <Link to="/shops">Manage Shops &rarr;</Link>
    </CardFooter>
  </Card>
);

ShopsList.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  shops: PropTypes.array,
  isFetching: PropTypes.bool
};

export default withTranslation()(ShopsList);
