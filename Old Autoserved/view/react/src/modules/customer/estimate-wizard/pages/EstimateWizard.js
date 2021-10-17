import React, { Component } from 'react';
import ReactGoogleMap from 'react-google-map';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'shards-react';

import { actions as estimateWizardActions } from '../index';
import { MAPS_API_KEY } from '../../../../utils/constants';

const { getCarMakes } = estimateWizardActions;

class EstimateWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: [],
      years: [],
      models: [],
      trims: [],
      selectedCarMake: null,
      selectedCarYear: null,
      selectedCarModel: null,
      selectedCarTrim: null,
      txtAddress: null,
      txtSearch: null,
      txtLocation: null,
      longitude: null,
      latitude: null,
      carMakeIsActive: false,
      carYearIsActive: false,
      carModelIsActive: false,
      carTrimIsActive: false
    };
  }

  componentDidMount = () => {
    this._getCarMakes();
  };

  _getCarMakes = () => {
    const { getCarMakes } = this.props;
    getCarMakes()
      .then(makes => {
        if (makes) {
          let carMakes = makes.map((value, index) => ({
            value: value.id,
            label: value.name
          }));

          this.setState({ makes: carMakes });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleSearch = event => {
    const { value: txtSearch } = event.target;
    this.setState({ txtSearch, txtLocation: txtSearch });
  };

  _handleSelectCarMake = selectedCarMake => {
    this.setState({
      selectedCarMake,
      carMakeIsActive: false,
      carYearIsActive: true
    });
  };

  _handleSelectSuggest = suggestion => {
    const { formatted_address: txtLocation, geometry } = suggestion;
    const longitude = geometry.location.lng();
    const latitude = geometry.location.lat();
    this.setState({
      txtSearch: '',
      txtLocation,
      latitude,
      longitude
    });
  };

  _openCarMake = event => {
    event.preventDefault();
    const { carMakeIsActive } = this.state;
    this.setState({ carMakeIsActive: !carMakeIsActive });
  };

  _openCarYear = event => {
    event.preventDefault();
    const { carYearIsActive } = this.state;
    this.setState({ carYearIsActive: !carYearIsActive });
  };

  _openCarModel = event => {
    event.preventDefault();
    const { carModelIsActive } = this.state;
    this.setState({ carModelIsActive: !carModelIsActive });
  };

  _openCarTrim = event => {
    event.preventDefault();
    const { carTrimIsActive } = this.state;
    this.setState({ carTrimIsActive: !carTrimIsActive });
  };

  render = () => {
    const {
      makes,
      // years,
      // models,
      // trims,
      selectedCarMake,
      selectedCarYear,
      selectedCarModel,
      selectedCarTrim,
      latitude,
      longitude,
      txtLocation,
      txtSearch,
      carMakeIsActive,
      carYearIsActive,
      carModelIsActive,
      carTrimIsActive
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col lg="10" className="mb-4 mx-auto">
            <h4 className="mt-3 text-center font-weight-bold">
              Request quotes from shops by answering few simple questions
            </h4>
            <h6 className="text-center">
              Professional service providers with transparent pricing to meet
              your needs
            </h6>
          </Col>
        </Row>
        <Row>
          <Col lg="10" className="mb-4 mx-auto">
            <Row className="position-relative">
              <Col lg="8" className="mt-4">
                <Row>
                  <Col lg="12">
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="mb-0">Enter your location</h6>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg="12">
                            <p className="text-light mb-2">
                              Already have an account?{' '}
                              <Link to="/login">Login</Link>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12" className="mb-3">
                            <ReactGoogleMapLoader
                              params={{
                                key: MAPS_API_KEY,
                                libraries: 'places,geocode'
                              }}
                              render={googleMaps =>
                                googleMaps && (
                                  <ReactGooglePlacesSuggest
                                    autocompletionRequest={{
                                      input: txtSearch || ''
                                    }}
                                    googleMaps={googleMaps}
                                    onSelectSuggest={this._handleSelectSuggest}
                                  >
                                    <InputGroup seamless>
                                      <InputGroupAddon type="prepend">
                                        <InputGroupText>
                                          <i className="material-icons">
                                            place
                                          </i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <FormInput
                                        id="txtLocation"
                                        placeholder="Search your location"
                                        value={txtLocation || ''}
                                        onChange={this._handleSearch}
                                      />
                                    </InputGroup>
                                  </ReactGooglePlacesSuggest>
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <ReactGoogleMapLoader
                              params={{
                                key: MAPS_API_KEY,
                                libraries: 'places,geocode'
                              }}
                              render={googleMaps =>
                                googleMaps &&
                                latitude &&
                                longitude && (
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
                                            lat: latitude,
                                            lng: longitude
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
                  </Col>
                </Row>
                {!(longitude && latitude) ? (
                  <Row>
                    <Col lg="12">
                      <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                          <h6 className="mb-0">Select your car</h6>
                        </CardHeader>
                        <CardBody>
                          <Row>
                            <Col lg="3">
                              <Button
                                theme="secondary"
                                active={carMakeIsActive}
                                outline
                                block
                                onClick={this._openCarMake}
                              >
                                {selectedCarMake
                                  ? selectedCarMake.label
                                  : 'Make'}
                              </Button>
                            </Col>
                            {selectedCarMake ? (
                              <Col lg="3">
                                <Button
                                  theme="secondary"
                                  active={carYearIsActive}
                                  outline
                                  block
                                  onClick={this._openCarYear}
                                >
                                  Year
                                </Button>
                              </Col>
                            ) : null}
                            {selectedCarYear ? (
                              <Col lg="3">
                                <Button
                                  theme="secondary"
                                  active={carModelIsActive}
                                  outline
                                  block
                                  onClick={this._openCarModel}
                                >
                                  Model
                                </Button>
                              </Col>
                            ) : null}
                            {selectedCarTrim ? (
                              <Col lg="3">
                                <Button
                                  theme="secondary"
                                  active={carTrimIsActive}
                                  outline
                                  block
                                  onClick={this._openCarTrim}
                                >
                                  Trim
                                </Button>
                              </Col>
                            ) : null}
                          </Row>
                          <Row>
                            <Col lg="12">
                              {carMakeIsActive ? (
                                <Card small className="mt-3">
                                  <CardBody>
                                    <Select
                                      options={makes}
                                      onChange={this._handleSelectCarMake}
                                    />
                                  </CardBody>
                                </Card>
                              ) : null}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                ) : null}
                {selectedCarMake &&
                selectedCarYear &&
                selectedCarModel &&
                selectedCarTrim ? (
                  <Row>
                    <Col lg="12">
                      <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                          <h6 className="mb-0">
                            Select what services you need
                          </h6>
                        </CardHeader>
                        <CardBody />
                      </Card>
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col lg="4" className="mt-4">
                <Card small className="mb-4">
                  <CardHeader className="bg-secondary">
                    <h6 className="text-white mb-0">
                      Select your preferred appointment
                    </h6>
                  </CardHeader>
                  <CardBody />
                  <CardFooter className="border-top">
                    <Button block>Request Estimates</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  user: state.authenticationReducer.user,
  makes: state.estimateWizardReducer.makes
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getCarMakes }
  )(EstimateWizard)
);
