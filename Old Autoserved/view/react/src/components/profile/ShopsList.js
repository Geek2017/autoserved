import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { RoundShape, TextBlock } from 'react-placeholder/lib/placeholders';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'shards-react';

import { DEFAULT_SHOP_AVATAR } from '../../utils/constants';
import { colors } from '../../utils/helper';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <Row key={repeat} className="px-3 mx-2 my-3">
        <Col className="user-teams__image my-auto p-0">
          <RoundShape
            color={colors.PLACEHOLDER_COLOR}
            style={{ width: 50, height: 50 }}
          />
        </Col>
        <Col className="user-teams__info pl-3">
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={2} />
        </Col>
      </Row>
    );
    repeat--;
  }

  return <div>{component}</div>;
};

const ShopsList = ({ isFetching, t, shops }) => {
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom ">
        <h6 className="m-0">{t('translation.ttlShopsCreated')}</h6>
      </CardHeader>
      <CardBody className="p-0">
        <ReactPlaceholder
          ready={!isFetching}
          showLoadingAnimation={true}
          customPlaceholder={<Placeholder repeat={3} />}
        >
          {shops.map((shop, index) => (
            <Row className="px-3 mx-2 my-3" key={index}>
              <Col className="user-teams__image my-auto p-0">
                <img
                  className="rounded"
                  src={shop.avatar ? shop.avatar.path : DEFAULT_SHOP_AVATAR}
                  alt={shop.name}
                />
              </Col>
              <Col className="user-teams__info pl-3">
                <Link to={`/shop/${shop.slug}`}>
                  <h6 className="m-0 text-primary">{shop.name}</h6>
                </Link>
                <span className="text-light">
                  {`${shop.service_count} ${t('translation.txtServices')}`}
                </span>
              </Col>
            </Row>
          ))}
        </ReactPlaceholder>
      </CardBody>
      <CardFooter className="border-top text-right">
        <Link to="/shops">Manage Shops &rarr;</Link>
      </CardFooter>
    </Card>
  );
};

ShopsList.defaultProps = {
  shops: []
};

ShopsList.propTypes = {
  shops: PropTypes.array.isRequired,
  isFetching: PropTypes.bool
};

export default withTranslation()(ShopsList);
