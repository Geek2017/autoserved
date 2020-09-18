import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormInput,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from 'shards-react';

import { DEFAULT_AVATAR, USER_TYPE_FLEET_ADMIN } from '../../utils/constants';

const UserDetails = ({ t, user }) => {
  const [copiedState, setCopiedState] = useState('Copy');
  const linkRef = useRef(null);
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom text-center">
        <div className="text-right mb-0">
          <Link className="btn btn-outline-light btn-sm" to="/settings">
            <i className="material-icons text-light">settings</i>
          </Link>
        </div>
        <div className="user-details__avatar mx-auto bg-white border-white mb-3">
          <img
            src={user && user.image ? user.image : DEFAULT_AVATAR}
            alt={user ? user.fname : null}
          />
        </div>
        {user ? (
          <div>
            <h4 className="mb-2">{user.full_name}</h4>
            {user.email_verified_at ? (
              <Badge theme="success" pill>
                <i className="material-icons mr-2">verified_user</i>
                {t('translation.txtVerified')}
              </Badge>
            ) : (
              <Badge theme="danger" pill>
                <i className="material-icons mr-2">info</i>
                {t('translation.txtUnverified')}
              </Badge>
            )}
          </div>
        ) : null}
      </CardHeader>
      <CardBody>
        <ListGroup flush>
          {user ? (
            <ListGroupItem className="px-4">
              {user.user_type === USER_TYPE_FLEET_ADMIN ? (
                <div className="mb-3">
                  <strong className="text-muted d-block mb-1">
                    Fleet User Registration Link
                  </strong>
                  <InputGroup className="mb-3">
                    <FormInput
                      readOnly
                      innerRef={linkRef}
                      value={`${window.location.origin.toString()}/f/register?slug=${
                        user.fleet.slug
                      }&key=${user.fleet.fleet_key}&token=${user.fleet.token}`}
                    />
                    {document.queryCommandSupported('copy') && (
                      <InputGroupAddon type="append">
                        <Button
                          onClick={() => {
                            linkRef.current.select();
                            document.execCommand('copy');
                            setCopiedState('Copied!');
                          }}
                          theme="white"
                        >
                          <i className="material-icons mr-1">file_copy</i>{' '}
                          {copiedState}
                        </Button>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                </div>
              ) : null}
              <strong className="text-muted d-block mb-1">
                {t('translation.txtEmail')}
              </strong>
              <a href={`mailto:${user.email}`}>{user.email}</a>
              <strong className="text-muted d-block mb-1 mt-3">
                {t('translation.txtCountry')}
              </strong>
              <span>{user.country}</span>
              <strong className="text-muted d-block mb-1 mt-3">
                {t('translation.txtMobileNumber')}
              </strong>
              {user.mobile ? (
                <a href={`tel:+63${user.mobile}`}>{`+63 ${user.mobile}`}</a>
              ) : (
                '-'
              )}
            </ListGroupItem>
          ) : null}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object
};

export default withTranslation()(UserDetails);
