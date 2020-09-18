import React, { useState, useEffect } from "react";
import GoogleMapLoader from "../../../../components/googlemap/GoogleMapLoader";
import ReactGoogleMap from "react-google-map";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

import {
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

export default function CarLocationForm(props) {
  const {
    onHandleCurrentFormValidation,
    currentFormIndex,
    fieldStorage,
    onSetFieldStorage
  } = props;
  const [location, getLocation] = useState("");
  const [coordinates, getCoordinates] = useState(
    fieldStorage.latitude &&
      fieldStorage.longitude && {
        latitude: fieldStorage.latitude,
        longitude: fieldStorage.longitude
      }
  );

  useEffect(() => {
    if (location !== "" && coordinates) {
      onHandleCurrentFormValidation({
        index: currentFormIndex,
        isValid: true
      });
    }
  }, [coordinates, currentFormIndex, onHandleCurrentFormValidation, location]);

  const handleSelectSuggest = suggestion => {
    const { formatted_address: txtLocation, geometry } = suggestion;

    getCoordinates({
      latitude: geometry.location.lat(),
      longitude: geometry.location.lng()
    });

    onSetFieldStorage({
      ...fieldStorage,
      latitude: geometry.location.lat(),
      longitude: geometry.location.lng(),
      txtLocation
    });
  };
  return (
    <>
      <Row className="mt-3">
        <Col lg="12">
          <GoogleMapLoader
            componentRenderer={googleMaps => (
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: location }}
                googleMaps={googleMaps}
                onSelectSuggest={handleSelectSuggest}
              >
                <InputGroup seamless>
                  <InputGroupAddon type="prepend">
                    <InputGroupText>
                      <i className="material-icons">place</i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <FormInput
                    id="txtLocation"
                    placeholder="Search location"
                    value={location}
                    onChange={e => getLocation(e.target.value)}
                  />
                </InputGroup>
              </ReactGooglePlacesSuggest>
            )}
          />
        </Col>
      </Row>
      {coordinates && (
        <Row className="mt-3">
          <Col lg="12">
            <GoogleMapLoader
              componentRenderer={googleMaps => (
                <div style={{ height: "40vh", width: "100%" }}>
                  <ReactGoogleMap
                    autoFitBounds
                    googleMaps={googleMaps}
                    zoom={16}
                    coordinates={[
                      {
                        position: {
                          lat: coordinates.latitude,
                          lng: coordinates.longitude
                        }
                      }
                    ]}
                  />
                </div>
              )}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
