import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { RoundShape, TextBlock } from 'react-placeholder/lib/placeholders';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Tooltip
} from 'shards-react';

import EmptyShopsList from './EmptyShopsList';
import { DEFAULT_SHOP_AVATAR } from '../../utils/constants';
import { colors } from '../../utils/helper';
import { shopsStatus } from '../../utils/status';

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
        <td className="lo-stats__order-details">
          <TextBlock
            color={colors.PLACEHOLDER_COLOR}
            rows={2}
            style={{ width: 200 }}
          />
        </td>
        <td className="lo-stats__status">
          <div className="d-table mx-auto">
            <Badge className="text-capitalize" pill theme="secondary">
              -
            </Badge>
          </div>
        </td>
        <td className="lo-stats__total text-center text-capitalize">
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={1} />
        </td>
        <td className="lo-stats__total text-center text-capitalize" />
      </tr>
    );
    repeat--;
  }

  return component;
};

const ShopsList = ({ isFetching, shops, t, toggleModal }) => {
  const [toolTips, setToolTip] = useState([]);
  return isFetching || shops.length ? (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{t('translation.tblTitleShops')}</h6>
      </CardHeader>
      <CardBody className="p-0">
        <Container fluid className="px-0">
          <table className="table lo-stats mb-0">
            <thead className="py-1 bg-light text-semibold border-bottom">
              <tr>
                <th colSpan={2}>
                  <small>{t('common.tblColShop')}</small>
                </th>
                <th className="text-center">
                  <small>{t('common.tblColStatus')}</small>
                </th>
                <th className="text-center">
                  <small>{t('common.tblColType')}</small>
                </th>
                <th className="text-center">
                  <small>{t('common.tblColActions')}</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <ReactPlaceholder
                ready={!isFetching}
                showLoadingAnimation={true}
                customPlaceholder={<Placeholder repeat={3} />}
              >
                {shops.map((shop, index) => {
                  toolTips[index] = {
                    edit: toolTips[index] ? toolTips[index].edit : false,
                    manage: toolTips[index] ? toolTips[index].manage : false
                  };
                  return (
                    <tr key={index}>
                      <td className="lo-stats__image">
                        <img
                          alt={shop.name}
                          className="rounded"
                          src={
                            shop.avatar ? shop.avatar.path : DEFAULT_SHOP_AVATAR
                          }
                        />
                      </td>
                      <td className="lo-stats__order-details">
                        <Link to={`/shop/${shop.slug}`}>{shop.name}</Link>
                        <p className="mb-0">
                          <small>
                            Last Updated: {moment(shop.updated_at).fromNow()}
                          </small>
                        </p>
                      </td>
                      <td className="lo-stats__status">
                        <div className="d-table mx-auto">
                          <Badge
                            className="text-capitalize"
                            pill
                            theme={shopsStatus[shop.status].theme}
                          >
                            {shopsStatus[shop.status].text}
                          </Badge>
                        </div>
                      </td>
                      <td className="lo-stats__total text-center text-capitalize">
                        {shop.type ? shop.type : '-'}
                      </td>
                      <td className="lo-stats__total text-center text-capitalize">
                        <Link
                          id={`btnEditShop-${index}`}
                          className="btn btn-warning btn-sm text-white mx-2"
                          to={`/shop/${shop.slug}/manage`}
                        >
                          <i className="material-icons">edit</i>
                        </Link>
                        <Tooltip
                          target={`#btnEditShop-${index}`}
                          open={toolTips[index].edit}
                          toggle={() => {
                            const newToolTips = [...toolTips];
                            newToolTips[index].edit = !newToolTips[index].edit;
                            setToolTip(newToolTips);
                          }}
                        >
                          Edit Shop Details
                        </Tooltip>
                        <Link
                          id={`btnManageActivationRequirements-${index}`}
                          className="btn btn-success btn-sm text-white mx-2"
                          to={`/shop/${shop.slug}/documents`}
                        >
                          <i className="material-icons">attachment</i>
                        </Link>
                        <Tooltip
                          target={`#btnManageActivationRequirements-${index}`}
                          open={toolTips[index].manage}
                          toggle={() => {
                            const newToolTips = [...toolTips];
                            newToolTips[index].manage = !newToolTips[index]
                              .manage;
                            setToolTip(newToolTips);
                          }}
                        >
                          Manage Activation Requirements
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </ReactPlaceholder>
            </tbody>
          </table>
        </Container>
      </CardBody>
      <CardFooter className="border-top" />
    </Card>
  ) : (
    <EmptyShopsList toggleModal={toggleModal} />
  );
};
ShopsList.defaultProps = {
  shops: []
};

ShopsList.propTypes = {
  isFetching: PropTypes.bool,
  shops: PropTypes.array,
  toggleModal: PropTypes.func
};

export default withTranslation()(ShopsList);
