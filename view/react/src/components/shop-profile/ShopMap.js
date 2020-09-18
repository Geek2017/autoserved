import React from 'react';
import PropTypes from 'prop-types';
import ReactGoogleMap from 'react-google-map';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import { withTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Row, Col } from 'shards-react';

import { MAPS_API_KEY } from '../../utils/constants';

const ShopMap = ({ shop }) => (
  <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Map</h6>
    </CardHeader>
    <CardBody className="p-0">
      <Row className="mx-1">
        <Col lg="12" className="p-3">
          <ReactGoogleMapLoader
            params={{
              key: MAPS_API_KEY,
              libraries: 'places,geocode'
            }}
            render={googleMaps =>
              googleMaps &&
              shop.latitude &&
              shop.longitude && (
                <div
                  style={{
                    height: '50vh',
                    width: '100%'
                  }}
                >
                  <ReactGoogleMap
                    autoFitBounds
                    googleMaps={googleMaps}
                    zoom={16}
                    coordinates={[
                      {
                        position: {
                          lat: Number(shop.latitude),
                          lng: Number(shop.longitude)
                        }
                      }
                    ]}
                  />
                </div>
              )
            }
          />
        </Col>
      </Row>
    </CardBody>
  </Card>
);

ShopMap.propTypes = {
  shop: PropTypes.object
};

export default withTranslation()(ShopMap);
