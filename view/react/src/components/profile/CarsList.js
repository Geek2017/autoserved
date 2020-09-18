import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'shards-react';

import { DEFAULT_CAR_AVATAR } from '../../utils/constants';

const CarsList = ({ t, cars }) => {
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{t('translation.ttlCarProfilesCreated')}</h6>
      </CardHeader>
      <CardBody className="p-0">
        {cars.map((car, index) => (
          <Row className="px-3 mx-2 my-3" key={index}>
            <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
              <img
                alt={`${car.car_year} - ${car.car_make.name || ''}`}
                className="rounded"
                src={DEFAULT_CAR_AVATAR}
              />
            </Col>
            <Col className="user-teams__info pl-3">
              <h6 className="mb-0 font-weight-bold">
                {car.car_year ? `${car.car_year} - ` : null}
                {car.car_make.name || ''}
              </h6>
              <Link to={`/car/${car.id}/schedule`}>
                {car.car_model.name || ''}{' '}
                {car.car_trim ? car.car_trim.name : ''}
              </Link>
              <div className="mt-2">
                <Badge theme="secondary" outline className="text-uppercase">
                  {car.plate_number || '-'}
                </Badge>
              </div>
            </Col>
          </Row>
        ))}
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  );
};

CarsList.defaultProps = {
  cars: []
};

CarsList.propTypes = {
  cars: PropTypes.array.isRequired
};

export default withTranslation()(CarsList);
