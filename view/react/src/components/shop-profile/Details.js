import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'shards-react';

import {
  DEFAULT_SHOP_AVATAR,
  DEFAULT_SHOP_BANNER
} from '../../utils/constants';
import { shopsStatus } from '../../utils/status';

const Details = ({ shop, t }) => {
  const paymentMethod = shop.payment_method;
  return (
    <Card small className="user-details mb-4">
      <CardHeader className="p-0">
        <div className="user-details__bg" style={{ maxHeight: '30vh' }}>
          <img
            src={shop.banner ? shop.banner.path : DEFAULT_SHOP_BANNER}
            alt={shop.name}
          />
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="user-details__avatar mx-auto bg-white border-white">
          <img
            src={shop.avatar ? shop.avatar.path : DEFAULT_SHOP_AVATAR}
            alt={shop.name}
          />
        </div>
        <h4 className="text-center m-0 mt-2">
          {/* <i className="text-primary material-icons">check_circle</i>{' '} */}
          {shop.name}
        </h4>
        <p className="text-center my-1">
          <Badge
            className="text-capitalize"
            pill
            theme={shopsStatus[shop.status].theme}
          >
            {shopsStatus[shop.status].text}
          </Badge>
        </p>
        <p className="text-center text-light mx-0 my-3 px-3">
          {shop.description ? shop.description : '-'}
        </p>
        <div className="user-details__user-data border-top border-bottom p-4">
          <Row className="mb-3">
            <Col className="w-50">
              <span>{t('translation.txtEmail')}</span>
              <a href={`mailto:${shop.user.email}`}>{shop.user.email}</a>
            </Col>
            <Col className="w-50">
              <span>{t('translation.txtLocation')}</span>
              <span>{shop.address ? shop.address : '-'}</span>
            </Col>
          </Row>
          <Row>
            <Col className="w-50">
              <span>{t('translation.txtPhone')}</span>
              <a href={`tel:+63${shop.contact}`}>+63 {shop.contact}</a>
            </Col>
            <Col className="w-50">
              <span>{t('translation.txtPaymentMethod')}</span>
              <div className="user-details__tags py-2">
                {paymentMethod
                  ? paymentMethod.map((tag, idx) => (
                      <Badge
                        pill
                        theme="light"
                        className="d-inline text-light text-uppercase mb-2 border mr-1"
                        key={idx}
                      >
                        {tag}
                      </Badge>
                    ))
                  : '-'}
              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

Details.defaultProps = {
  shop: null
};

Details.propTypes = {
  shop: PropTypes.object
};

export default withTranslation()(Details);
