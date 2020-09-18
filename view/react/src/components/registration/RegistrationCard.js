import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'shards-react';

import Logo from '../common/Logo';
import SwitchButtons from '../common/SwitchButtons';

const items = t => [
  {
    title: 'Individual',
    link: '/customer-registration'
  },
  {
    title: 'Shop',
    link: '/shop-registration'
  },
  {
    title: 'Business',
    link: '/fleet-registration'
  }
];

const RegistrationCard = ({ children, location, t }) => {
  const params = location ? queryString.parse(location.search) : null;
  return (
    <div>
      <Card>
        <CardBody>
          <Logo />
          <h5 className="auth-form__title text-center mb-4">
            {t('translation.ttlCreateNewAccount')}
          </h5>
          {(!params || !params.slug) && (
            <Col className="col d-flex align-items-center mx-auto mb-3">
              <SwitchButtons items={items(t)} />
            </Col>
          )}
          {children}
        </CardBody>
      </Card>
      <div className="auth-form__meta d-flex mt-4">
        <Link to="/forgot-password">{t('translation.lnkForgot')}</Link>
        <Link to="/login" className="ml-auto">
          {t('translation.lnkSignIn')}
        </Link>
      </div>
    </div>
  );
};

RegistrationCard.propTypes = {
  children: PropTypes.element.isRequired
};

export default withTranslation()(RegistrationCard);
