import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { RoundShape, TextBlock } from 'react-placeholder/lib/placeholders';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, Col, Row } from 'shards-react';

import EmptyShopsList from './EmptyShopsList';
import { DEFAULT_SHOP_AVATAR } from '../../utils/constants';
import { colors } from '../../utils/helper';
import { shopsStatus } from '../../utils/status';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <Col key={repeat} className="mb-4" lg="3" md="4">
        <Card>
          <CardBody className="text-center">
            <div className="user-details__avatar mx-auto bg-white border-white mb-3">
              <RoundShape
                color={colors.PLACEHOLDER_COLOR}
                style={{ height: 100, width: 100 }}
                className="rounded"
              />
            </div>
            <h5 className="mb-0">
              <TextBlock
                color={colors.PLACEHOLDER_COLOR}
                rows={1}
                style={{ width: 75 }}
                className="mx-auto"
              />
              <TextBlock
                color={colors.PLACEHOLDER_COLOR}
                rows={1}
                style={{ width: 75 }}
                className="mx-auto mt-2"
              />
            </h5>
          </CardBody>
          <CardFooter className="border-top text-center p-3">
            <Badge pill outline size="sm" theme="secondary">
              -
            </Badge>
          </CardFooter>
        </Card>
      </Col>
    );
    repeat--;
  }

  return component;
};

const ManageShopsList = ({ isFetching, shops, t }) => {
  return isFetching || shops.length ? (
    <Row>
      <ReactPlaceholder
        ready={!isFetching}
        showLoadingAnimation={true}
        customPlaceholder={<Placeholder repeat={3} />}
      >
        {shops.map((shop, index) => (
          <Col key={index} className="mb-4" lg="3" md="4">
            <Card>
              <CardBody className="text-center py-3">
                <div className="user-details__avatar mx-auto bg-white border-white mb-3">
                  <img
                    alt={shop.name}
                    className="rounded"
                    src={shop.avatar ? shop.avatar.path : DEFAULT_SHOP_AVATAR}
                  />
                </div>
                <h5 className="mb-0">
                  <Link to={`/shop/${shop.slug}`}>{shop.name}</Link>
                </h5>
                <div className="d-table mx-auto">
                  <Badge
                    className="text-capitalize mt-2"
                    pill
                    theme={shopsStatus[shop.status].theme}
                  >
                    {shopsStatus[shop.status].text}
                  </Badge>
                </div>
              </CardBody>
              <CardFooter className="border-top text-center p-3">
                <Link
                  className="btn btn-pill btn-secondary btn-outline-secondary btn-sm"
                  to={`/system/shop/${shop.slug}/requirements`}
                >
                  <i className="material-icons">insert_drive_file</i> Check
                  Requirements
                </Link>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </ReactPlaceholder>
    </Row>
  ) : (
    <EmptyShopsList hideModal />
  );
};

ManageShopsList.defaultProps = {
  shops: []
};

ManageShopsList.propTypes = {
  isFetching: PropTypes.bool,
  shops: PropTypes.array
};

export default withTranslation()(ManageShopsList);
