import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Row, Col } from 'shards-react';

const UserDetails = ({ profile }) => {
  return (
    <Card small className="user-details mb-4">
      <CardHeader className="p-0">
        <div className="user-details__bg">
          <img src={profile.image} alt={profile.name} />
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {/* User Avatar */}
        <div className="user-details__avatar mx-auto">
          <img src={profile.image} alt={profile.name} />
        </div>
        {/* User Name */}
        <h4 className="text-center m-0 mt-2">
          {profile.lname}, {profile.fname}
        </h4>
        {/* User Bio */}

        {/* User Data */}
        <div className="user-details__user-data border-top border-bottom p-4">
          <Row className="mb-3">
            <Col className="w-50">
              <span>Email</span>
              <span>{profile.email}</span>
            </Col>
            <Col className="w-50">
              <span>Phone</span>
              <span>{profile.mobile}</span>
            </Col>
          </Row>
          <Row />
          <Row>
            <Col className="w-50">
              <span>Country</span>
              <span>{profile.country}</span>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

UserDetails.propTypes = {
  /**
   * The user data.
   */
  profile: PropTypes.object
};

export default UserDetails;
