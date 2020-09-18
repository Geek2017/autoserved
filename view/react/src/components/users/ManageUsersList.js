import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock } from 'react-placeholder/lib/placeholders';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, Col, Row } from 'shards-react';

import { colors } from '../../utils/helper';
import {
  USER_TYPE_ADMIN,
  USER_TYPE_CUSTOMER,
  USER_TYPE_VENDOR
} from '../../utils/constants';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <Col key={repeat} className="mb-4" lg="3" md="4">
        <Card>
          <CardBody className="py-3">
            <TextBlock
              color={colors.PLACEHOLDER_COLOR}
              rows={1}
              style={{ width: 200 }}
            />
            <TextBlock
              color={colors.PLACEHOLDER_COLOR}
              rows={1}
              style={{ width: 150 }}
              className="mt-2 mb-2"
            />
            <TextBlock
              color={colors.PLACEHOLDER_COLOR}
              rows={1}
              style={{ width: 100 }}
              className="mt-2"
            />
            <hr />
            <div className="text-center">
              <Badge pill outline size="sm" theme="secondary">
                -
              </Badge>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
    repeat--;
  }

  return component;
};

const ManageUsersList = ({
  events,
  isFetching,
  users,
  t,
  user: currentUser
}) => {
  return isFetching || users.length ? (
    <Row>
      <ReactPlaceholder
        ready={!isFetching}
        showLoadingAnimation={true}
        customPlaceholder={<Placeholder repeat={3} />}
      >
        {users.map((user, index) => (
          <Col key={index} className="mb-4" lg="3" md="4">
            <Card>
              <CardBody className="py-3">
                <h6 className="mb-0">
                  <Link
                    className={
                      user.deleted_at
                        ? 'font-weight-bold text-danger'
                        : 'font-weight-bold'
                    }
                    to={`/user/${user.id}`}
                  >
                    {user.email_verified_at && !user.deleted_at ? (
                      <i className="material-icons text-success">
                        verified_user
                      </i>
                    ) : null}{' '}
                    {user.fname} {user.lname}
                  </Link>
                </h6>
                <h6>
                  <small>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </small>
                </h6>
                <p className="mb-0">
                  <i className="material-icons">
                    {user.user_type === USER_TYPE_ADMIN
                      ? 'offline_bolt'
                      : user.user_type === USER_TYPE_CUSTOMER
                      ? 'account_circle'
                      : user.user_type === USER_TYPE_VENDOR
                      ? 'store'
                      : 'directions_car'}
                  </i>{' '}
                  <small>
                    {user.user_type === USER_TYPE_ADMIN
                      ? 'Administrator'
                      : user.user_type === USER_TYPE_CUSTOMER
                      ? 'Customer'
                      : user.user_type === USER_TYPE_VENDOR
                      ? 'Vendor'
                      : 'Fleet Admin'}
                  </small>
                </p>
                {currentUser.user_type === USER_TYPE_ADMIN ? (
                  <div>
                    <hr />
                    <div className="text-center">
                      <Row>
                        <Col>
                          <Button
                            className="mr-2"
                            pill
                            outline
                            size="sm"
                            theme="info"
                          >
                            <i className="material-icons">
                              account_balance_wallet
                            </i>{' '}
                            Wallet
                          </Button>
                          <Button
                            className="mr-2"
                            pill
                            outline
                            size="sm"
                            theme="secondary"
                          >
                            <i className="material-icons">lock</i> Password
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          {!user.email_verified_at ? (
                            <Button
                              className="mr-2"
                              pill
                              outline
                              size="sm"
                              theme="success"
                              onClick={() => events.resendVerification(user.email)}
                            >
                              <i className="material-icons">email</i>{' '}
                              Verification
                            </Button>
                          ) : null}
                          <Button
                            pill
                            outline={currentUser.id === user.id}
                            disabled={currentUser.id === user.id}
                            size="sm"
                            theme={user.deleted_at ? 'success' : 'danger'}
                          >
                            <i className="material-icons">
                              {user.deleted_at
                                ? 'restore_from_trash'
                                : 'delete'}
                            </i>{' '}
                            {user.deleted_at ? 'Restore' : 'Deactivate'}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        ))}
      </ReactPlaceholder>
    </Row>
  ) : null;
};

ManageUsersList.defaultProps = {
  users: []
};

ManageUsersList.propTypes = {
  events: PropTypes.object,
  isFetching: PropTypes.bool,
  users: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.authenticationReducer.user
});

export default withTranslation()(
  connect(
    mapStateToProps,
    {}
  )(ManageUsersList)
);
