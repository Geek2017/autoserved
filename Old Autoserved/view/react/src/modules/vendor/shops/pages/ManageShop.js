import React, { Component } from "react";
import ReactGoogleMap from "react-google-map";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TagsInput from "react-tagsinput";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormCheckbox,
  FormFeedback,
  FormInput,
  FormSelect,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Slider
} from "shards-react";
import { isNumeric, matches } from "validator";

import { actions as shopActions } from "../index";
import FormSectionTitle from "../../../../components/common/FormSectionTitle";
import {
  ACCEPTED_IMAGE_FILE_FORMATS,
  DEFAULT_SHOP_BANNER,
  DEFAULT_SHOP_AVATAR,
  MAPS_API_KEY,
  SHOP_TYPE_ACCESSORY_SHOP,
  SHOP_TYPE_AUTO_AIRCON_REPAIR,
  SHOP_TYPE_AUTO_DETAILING,
  SHOP_TYPE_AUTO_ELECTRICAL,
  SHOP_TYPE_AUTO_PARTS,
  SHOP_TYPE_AUTO_REPAIR,
  SHOP_TYPE_BATTERY_SHOP,
  SHOP_TYPE_CAR_PAINT,
  SHOP_TYPE_CAR_WASH,
  SHOP_TYPE_CAR_WRAP,
  SHOP_TYPE_DEALER_SERVICE_CENTER,
  SHOP_TYPE_EMISSION_CENTER,
  SHOP_TYPE_GAS_STATION,
  SHOP_TYPE_GLASS_REPAIR,
  SHOP_TYPE_SERVICE_CENTER,
  SHOP_TYPE_TINT_SHOP,
  SHOP_TYPE_TIRE_SHOP,
  SHOP_TYPE_TOWING_SERVICE,
  SHOP_TYPE_UPHOLSTERY,
  SHOP_TYPE_VULCANIZING_SHOP,
  REGEX_SHOP_NAME_MATCH
} from "../../../../utils/constants";
import { timeFormatter } from "../../../../utils/helper";

const { getShopDetails, updateShop, uploadFile } = shopActions;
const shopTypes = [
  SHOP_TYPE_ACCESSORY_SHOP,
  SHOP_TYPE_AUTO_AIRCON_REPAIR,
  SHOP_TYPE_AUTO_DETAILING,
  SHOP_TYPE_AUTO_ELECTRICAL,
  SHOP_TYPE_AUTO_PARTS,
  SHOP_TYPE_AUTO_REPAIR,
  SHOP_TYPE_BATTERY_SHOP,
  SHOP_TYPE_CAR_PAINT,
  SHOP_TYPE_CAR_WASH,
  SHOP_TYPE_CAR_WRAP,
  SHOP_TYPE_DEALER_SERVICE_CENTER,
  SHOP_TYPE_EMISSION_CENTER,
  SHOP_TYPE_GAS_STATION,
  SHOP_TYPE_GLASS_REPAIR,
  SHOP_TYPE_SERVICE_CENTER,
  SHOP_TYPE_TINT_SHOP,
  SHOP_TYPE_TIRE_SHOP,
  SHOP_TYPE_TOWING_SERVICE,
  SHOP_TYPE_UPHOLSTERY,
  SHOP_TYPE_VULCANIZING_SHOP
];

class ManageShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Coordinates
      longitude: null,
      latitude: null,
      // Shop data
      shop: null,
      shopUpdates: {},
      // Success messages container
      errorMessages: [],
      successMessages: [],
      // Form values
      txtLocation: null,
      txtFeatures: [],
      txtAmenities: [],
      txtSearch: null,
      chkCash: false,
      chkCreditCard: false,
      operations: {
        sun: { open: false, start: null, end: null },
        mon: { open: false, start: null, end: null },
        tue: { open: false, start: null, end: null },
        wed: { open: false, start: null, end: null },
        thu: { open: false, start: null, end: null },
        fri: { open: false, start: null, end: null },
        sat: { open: false, start: null, end: null }
      }
    };
  }

  componentWillMount = () => {
    const { match } = this.props;
    this._getShopDetails(match.params.slug);
  };

  _getShopDetails = id => {
    const { getShopDetails } = this.props;
    getShopDetails(id)
      .then(shop => {
        if (shop) {
          let chkCash = false;
          let chkCreditCard = false;

          if (shop.payment_method !== null) {
            chkCash = shop.payment_method.includes("cash");
            chkCreditCard = shop.payment_method.includes("credit card");
          }

          this.setState({
            chkCash,
            chkCreditCard,
            latitude: Number(shop.latitude),
            longitude: Number(shop.longitude),
            txtLocation: shop.address,
            txtAmenities: shop.amenities || [],
            txtFeatures: shop.features || [],
            operations: shop.operations,
            shop,
            shopUpdates: shop
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleBanner = event => {
    event.preventDefault();
    const { t, uploadFile } = this.props;
    const { shop } = this.state;
    const file = event.target.files.length ? event.target.files[0] : null;
    let successMessages = [];
    let errorMessages = [];

    if (file) {
      uploadFile("banner", shop.id, file)
        .then(fileBanner => {
          if (fileBanner) {
            successMessages.push({
              message: t("translation.successUpload")
            });
            shop.banner = fileBanner;
            this.setState({ shop, successMessages });
          }
        })
        .catch(() => {
          errorMessages.push({ message: t("translation.generalError") });
          this.setState({ errorMessages });
        });
    }
  };

  _handleAvatar = event => {
    event.preventDefault();
    const { t, uploadFile } = this.props;
    const { shop } = this.state;
    const file = event.target.files.length ? event.target.files[0] : null;
    let successMessages = [];
    let errorMessages = [];

    if (file) {
      uploadFile("avatar", shop.id, file)
        .then(fileAvatar => {
          if (fileAvatar) {
            successMessages.push({
              message: t("translation.successUpload")
            });
            shop.avatar = fileAvatar;
            this.setState({ shop, successMessages });
          }
        })
        .catch(() => {
          errorMessages.push({ message: t("translation.generalError") });
          this.setState({ errorMessages });
        });
    }
  };

  _handleShopName = event => {
    const { shopUpdates } = this.state;
    shopUpdates.name = event.target.value;
    this.setState({ shopUpdates });
  };

  _handleShopType = event => {
    const { shopUpdates } = this.state;
    shopUpdates.type = event.target.value;
    this.setState({ shopUpdates });
  };

  _handleMobileNumber = event => {
    const { shopUpdates } = this.state;
    shopUpdates.contact = event.target.value;
    this.setState({ shopUpdates });
  };

  _handleDescription = event => {
    const { shopUpdates } = this.state;
    shopUpdates.description = event.target.value;
    this.setState({ shopUpdates });
  };

  _handleAmenitiesTag = txtAmenities => {
    this.setState({ txtAmenities });
  };

  _handleFeaturesTag = txtFeatures => {
    this.setState({ txtFeatures });
  };

  _handleChkCash = event => {
    const { chkCash } = this.state;
    this.setState({ chkCash: !chkCash });
  };

  _handleChkCreditCard = () => {
    const { chkCreditCard } = this.state;
    this.setState({ chkCreditCard: !chkCreditCard });
  };

  _handleSearch = event => {
    const { value: txtSearch } = event.target;
    this.setState({ txtSearch, txtLocation: txtSearch });
  };

  _handleSelectSuggest = suggestion => {
    const { shopUpdates } = this.state;
    const { formatted_address: txtLocation, geometry } = suggestion;
    shopUpdates.address = txtLocation;
    shopUpdates.longitude = geometry.location.lng().toString();
    shopUpdates.latitude = geometry.location.lat().toString();
    this.setState({
      txtSearch: "",
      txtLocation,
      latitude: geometry.location.lat(),
      longitude: geometry.location.lng(),
      shopUpdates
    });
  };

  _handleSunday = event => {
    const { operations } = this.state;
    operations.sun.open = !operations.sun.open;
    operations.sun.start = operations.sun.start || 8;
    operations.sun.end = operations.sun.end || 17;
    this.setState({ operations });
  };

  _handleMonday = () => {
    const { operations } = this.state;
    operations.mon.open = !operations.mon.open;
    operations.mon.start = operations.mon.start || 8;
    operations.mon.end = operations.mon.end || 17;
    this.setState({ operations });
  };

  _handleTuesday = () => {
    const { operations } = this.state;
    operations.tue.open = !operations.tue.open;
    operations.tue.start = operations.tue.start || 8;
    operations.tue.end = operations.tue.end || 17;
    this.setState({ operations });
  };

  _handleWednesday = () => {
    const { operations } = this.state;
    operations.wed.open = !operations.wed.open;
    operations.wed.start = operations.wed.start || 8;
    operations.wed.end = operations.wed.end || 17;
    this.setState({ operations });
  };

  _handleThursday = () => {
    const { operations } = this.state;
    operations.thu.open = !operations.thu.open;
    operations.thu.start = operations.thu.start || 8;
    operations.thu.end = operations.thu.end || 17;
    this.setState({ operations });
  };

  _handleFriday = () => {
    const { operations } = this.state;
    operations.fri.open = !operations.fri.open;
    operations.fri.start = operations.fri.start || 8;
    operations.fri.end = operations.fri.end || 17;
    this.setState({ operations });
  };

  _handleSaturday = () => {
    const { operations } = this.state;
    operations.sat.open = !operations.sat.open;
    operations.sat.start = operations.sat.start || 8;
    operations.sat.end = operations.sat.end || 17;
    this.setState({ operations });
  };

  _slideSun = value => {
    const { operations } = this.state;
    operations.sun.start = Number(value[0]).toFixed(0);
    operations.sun.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideMon = value => {
    const { operations } = this.state;
    operations.mon.start = Number(value[0]).toFixed(0);
    operations.mon.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideTue = value => {
    const { operations } = this.state;
    operations.tue.start = Number(value[0]).toFixed(0);
    operations.tue.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideWed = value => {
    const { operations } = this.state;
    operations.wed.start = Number(value[0]).toFixed(0);
    operations.wed.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideThu = value => {
    const { operations } = this.state;
    operations.thu.start = Number(value[0]).toFixed(0);
    operations.thu.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideFri = value => {
    const { operations } = this.state;
    operations.fri.start = Number(value[0]).toFixed(0);
    operations.fri.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _slideSat = value => {
    const { operations } = this.state;
    operations.sat.start = Number(value[0]).toFixed(0);
    operations.sat.end = Number(value[1]).toFixed(0);
    this.setState({ operations });
  };

  _submit = event => {
    event.preventDefault();
    const { match, t, updateShop } = this.props;
    const {
      shopUpdates,
      txtAmenities,
      txtFeatures,
      chkCash,
      chkCreditCard,
      operations
    } = this.state;
    shopUpdates.amenities = txtAmenities;
    shopUpdates.features = txtFeatures;
    shopUpdates.operations = operations;
    let paymentMethod = [];
    let successMessages = [];
    let errorMessages = [];

    if (chkCash) {
      paymentMethod.push("cash");
    }

    if (chkCreditCard) {
      paymentMethod.push("credit card");
    }

    shopUpdates.payment_method = paymentMethod;
    updateShop(match.params.slug, shopUpdates)
      .then(shop => {
        if (shop) {
          successMessages.push({
            message: t("translation.successUpdateShop", shop)
          });
          this.setState({ shop, successMessages });
          window.scrollTo(0, 0);
        }
      })
      .catch(() => {
        errorMessages.push({ message: t("translation.generalError") });
        this.setState({ errorMessages });
      });
  };

  render = () => {
    const { match, t } = this.props;
    const {
      latitude,
      longitude,
      shop,
      shopUpdates,
      errorMessages,
      successMessages,
      txtSearch,
      txtLocation,
      txtFeatures,
      txtAmenities,
      operations,
      chkCash,
      chkCreditCard
    } = this.state;
    const { sun, mon, tue, wed, thu, fri, sat } = operations;
    const { contact: txtMobileNumber, name: txtShopName } = shopUpdates;
    const validMobileNumber =
      txtMobileNumber !== undefined &&
      txtMobileNumber !== null &&
      txtMobileNumber.length === 10 &&
      isNumeric(txtMobileNumber);
    const validShopName =
      txtShopName !== undefined &&
      txtShopName !== null &&
      matches(txtShopName, REGEX_SHOP_NAME_MATCH);
    return (
      <div>
        <Container fluid className="px-0">
          {successMessages.map((success, index) => (
            <Alert
              key={index}
              fade
              theme="success"
              className="outline-success mb-0"
            >
              <p className="mb-0">{success.message}</p>
            </Alert>
          ))}
          {errorMessages.map((error, index) => (
            <Alert
              key={index}
              fade
              theme="danger"
              className="outline-danger mb-0"
            >
              <p className="mb-0">{error.message}</p>
            </Alert>
          ))}
        </Container>
        {shop ? (
          <Container fluid className="main-content-container px-4">
            <Row>
              <Col lg="8" className="mx-auto mt-4">
                <Card small className="edit-user-details mb-4">
                  <CardHeader className="p-0">
                    <div className="edit-user-details__bg">
                      <img
                        src={
                          shop.banner ? shop.banner.path : DEFAULT_SHOP_BANNER
                        }
                        alt={shop.name}
                      />
                      <label className="edit-user-details__change-background">
                        <i className="material-icons mr-1">photo_camera</i>{" "}
                        Change Background Photo (700 x 250)
                        <FormInput
                          innerRef={ref => {
                            if (ref) {
                              ref.accept = ACCEPTED_IMAGE_FILE_FORMATS;
                            }
                          }}
                          className="d-none"
                          type="file"
                          id="fileBanner"
                          onChange={this._handleBanner}
                        />
                      </label>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0">
                    <p className="text-center text-light mb-0 font-italic">
                      <small>Maximum file size: 5MB - (JPEG, PNG)</small>
                    </p>
                    <Form className="py-4">
                      <FormSectionTitle
                        title="General Settings"
                        description="Update your shop profile details."
                      />
                      <Row form className="mx-4">
                        <Col lg="8">
                          <Row form>
                            <Col lg="6" className="form-group">
                              <label htmlFor="txtShopName">Shop Name</label>
                              <FormInput
                                id="txtShopName"
                                onChange={this._handleShopName}
                                value={shopUpdates.name || ""}
                                invalid={
                                  txtShopName !== null &&
                                  !matches(txtShopName, REGEX_SHOP_NAME_MATCH)
                                }
                              />
                              <FormFeedback valid={validShopName}>
                                {t("validation.errShopName")}
                              </FormFeedback>
                            </Col>
                            <Col lg="6" className="form-group">
                              <label htmlFor="selShopType">Shop Type</label>
                              <FormSelect
                                className="text-capitalize"
                                value={shopUpdates.type || ""}
                                onChange={this._handleShopType}
                              >
                                {shop.type === null ? (
                                  <option value={""}>Select an Option</option>
                                ) : null}
                                {shopTypes.map((type, index) => (
                                  <option key={index} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </FormSelect>
                            </Col>
                          </Row>
                          <Row form>
                            <Col lg="12" className="form-group">
                              <label htmlFor="txtMobileNumber">
                                Mobile Number
                              </label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon type="prepend">
                                  <InputGroupText>+63</InputGroupText>
                                </InputGroupAddon>
                                <FormInput
                                  id="txtMobileNumber"
                                  value={shopUpdates.contact || ""}
                                  onChange={this._handleMobileNumber}
                                  invalid={
                                    txtMobileNumber !== null &&
                                    (txtMobileNumber.length !== 10 ||
                                      !isNumeric(txtMobileNumber))
                                  }
                                />
                                <FormFeedback valid={validMobileNumber}>
                                  {t("validation.errMobileNumber")}
                                </FormFeedback>
                              </InputGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col lg="12" className="form-group">
                              <label htmlFor="txtDescription">
                                Description
                              </label>
                              <FormTextarea
                                id="txtDescription"
                                placeholder={"Add a short description here"}
                                value={shopUpdates.description || ""}
                                onChange={this._handleDescription}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="4">
                          <label
                            htmlFor="userProfilePicture"
                            className="text-center w-100 mb-4"
                          >
                            Shop Logo
                          </label>
                          <div className="edit-user-details__avatar m-auto">
                            <img
                              src={
                                shop.avatar
                                  ? shop.avatar.path
                                  : DEFAULT_SHOP_AVATAR
                              }
                              alt={shop.name}
                            />
                            <label className="edit-user-details__avatar__change">
                              <i className="material-icons mr-1">add_a_photo</i>
                              <FormInput
                                innerRef={ref => {
                                  if (ref) {
                                    ref.accept = ACCEPTED_IMAGE_FILE_FORMATS;
                                  }
                                }}
                                id="fileAvatar"
                                className="d-none"
                                type="file"
                                onChange={this._handleAvatar}
                              />
                            </label>
                          </div>
                          <label
                            htmlFor="fileAvatar"
                            className="btn btn-sm btn-white d-table mx-auto mt-4"
                          >
                            <i className="material-icons mr-2">cloud_upload</i>
                            Upload Image (512 x 512)
                          </label>
                          <p className="text-center text-light mb-0 font-italic">
                            <small>Maximum file size: 5MB - (JPEG, PNG)</small>
                          </p>
                        </Col>
                      </Row>
                      <hr />
                      <FormSectionTitle
                        title="Location Settings"
                        description="Setup your shop's location."
                      />
                      <Row form className="mx-4">
                        <Col lg="12">
                          <Row form>
                            <Col lg="12" className="form-group">
                              <label htmlFor="userLocation">Shop Address</label>
                              <ReactGoogleMapLoader
                                params={{
                                  key: MAPS_API_KEY,
                                  libraries: "places,geocode"
                                }}
                                render={googleMaps =>
                                  googleMaps && (
                                    <ReactGooglePlacesSuggest
                                      autocompletionRequest={{
                                        input: txtSearch || ""
                                      }}
                                      googleMaps={googleMaps}
                                      onSelectSuggest={
                                        this._handleSelectSuggest
                                      }
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
                                          placeholder="Search shop location"
                                          value={txtLocation || ""}
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
                            <Col lg="12" className="form-group">
                              <ReactGoogleMapLoader
                                params={{
                                  key: MAPS_API_KEY,
                                  libraries: "places,geocode"
                                }}
                                render={googleMaps =>
                                  googleMaps &&
                                  latitude &&
                                  longitude && (
                                    <div
                                      style={{
                                        height: "50vh",
                                        width: "100%"
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
                        </Col>
                      </Row>
                      <hr />
                      <FormSectionTitle
                        title="Additional Information"
                        description="Provide additional details to your shop's profile."
                      />
                      <Row form className="mx-4">
                        <Col lg="12">
                          <Row form>
                            <Col lg="6" className="form-group">
                              <label htmlFor="txtAmenities">Amenities</label>
                              <TagsInput
                                value={txtAmenities}
                                onChange={this._handleAmenitiesTag}
                                inputProps={{
                                  id: "txtAmenities",
                                  placeholder: "Add Items"
                                }}
                              />
                            </Col>
                            <Col lg="6" className="form-group">
                              <label htmlFor="txtFeatures">Features</label>
                              <TagsInput
                                value={txtFeatures}
                                onChange={this._handleFeaturesTag}
                                inputProps={{
                                  id: "txtFeatures",
                                  placeholder: "Add Item"
                                }}
                              />
                            </Col>
                          </Row>
                          <Row form>
                            <Col lg="12" className="form-group">
                              <label htmlFor="operations">
                                Operating Hours
                              </label>
                              <p className="text-light mb-3">
                                <small>Toggle switch using the label</small>
                              </p>
                              <Row>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={sun.open}
                                      toggle
                                      className="mr-2"
                                      id="chkSunday"
                                      onChange={this._handleSunday}
                                    />
                                  </span>
                                  <label htmlFor="chkSunday">Sunday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!sun.open}
                                    start={[
                                      Number(sun.start ? sun.start : 8),
                                      Number(sun.end ? sun.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideSun}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={mon.open}
                                      toggle
                                      className="mr-2"
                                      id="chkMonday"
                                      onChange={this._handleMonday}
                                    />
                                  </span>
                                  <label htmlFor="chkMonday">Monday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!mon.open}
                                    start={[
                                      Number(mon.start ? mon.start : 8),
                                      Number(mon.end ? mon.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideMon}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={tue.open}
                                      toggle
                                      className="mr-2"
                                      id="chkTuesday"
                                      onChange={this._handleTuesday}
                                    />
                                  </span>
                                  <label htmlFor="chkTuesday">Tuesday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!tue.open}
                                    start={[
                                      Number(tue.start ? tue.start : 8),
                                      Number(tue.end ? tue.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideTue}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={wed.open}
                                      toggle
                                      className="mr-2"
                                      id="chkWednesday"
                                      onChange={this._handleWednesday}
                                    />
                                  </span>
                                  <label htmlFor="chkWednesday">
                                    Wednesday
                                  </label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!wed.open}
                                    start={[
                                      Number(wed.start ? wed.start : 8),
                                      Number(wed.end ? wed.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideWed}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={thu.open}
                                      toggle
                                      className="mr-2"
                                      id="chkThursday"
                                      onChange={this._handleThursday}
                                    />
                                  </span>
                                  <label htmlFor="chkThursday">Thursday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!thu.open}
                                    start={[
                                      Number(thu.start ? thu.start : 8),
                                      Number(thu.end ? thu.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideThu}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={fri.open}
                                      toggle
                                      className="mr-2"
                                      id="chkFriday"
                                      onChange={this._handleFriday}
                                    />
                                  </span>
                                  <label htmlFor="chkFriday">Friday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!fri.open}
                                    start={[
                                      Number(fri.start ? fri.start : 8),
                                      Number(fri.end ? fri.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideFri}
                                  />
                                </Col>
                                <Col lg="3" className="d-flex align-middle">
                                  <span>
                                    <FormCheckbox
                                      checked={sat.open}
                                      toggle
                                      className="mr-2"
                                      id="chkSaturday"
                                      onChange={this._handleSaturday}
                                    />
                                  </span>
                                  <label htmlFor="chkSaturday">Saturday</label>
                                </Col>
                                <Col lg="9" className="align-middle">
                                  <Slider
                                    className="ml-2"
                                    connect
                                    disabled={!sat.open}
                                    start={[
                                      Number(sat.start ? sat.start : 8),
                                      Number(sat.end ? sat.end : 17)
                                    ]}
                                    range={{ min: 0, max: 23 }}
                                    tooltips={[
                                      { to: timeFormatter },
                                      { to: timeFormatter }
                                    ]}
                                    step={1}
                                    onChange={this._slideSat}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <hr />
                      <FormSectionTitle
                        title="Payment Method"
                        description="Setup your shop's payment method."
                      />
                      <Row form className="mx-4">
                        <Col
                          tag="label"
                          htmlFor="chkCash"
                          className="col-form-label"
                        >
                          Cash
                          <small className="text-muted form-text">
                            Allow customers to pay you by cash.
                          </small>
                        </Col>
                        <Col className="d-flex">
                          <FormCheckbox
                            checked={chkCash}
                            toggle
                            className="ml-auto my-auto"
                            id="chkCash"
                            onChange={this._handleChkCash}
                          />
                        </Col>
                      </Row>
                      <Row form className="mx-4">
                        <Col
                          tag="label"
                          htmlFor="chkCreditCard"
                          className="col-form-label"
                        >
                          Credit Card
                          <small className="text-muted form-text">
                            Allow customers to pay you by credit card.
                          </small>
                        </Col>
                        <Col className="d-flex">
                          <FormCheckbox
                            checked={chkCreditCard}
                            toggle
                            className="ml-auto my-auto"
                            id="chkCreditCard"
                            onChange={this._handleChkCreditCard}
                          />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="border-top">
                    {/* <Button
                      size="sm"
                      theme="danger"
                      className="btn-outline-danger ml-3"
                    >
                      Delete Shop
                    </Button> */}
                    <Button
                      size="sm"
                      theme="success"
                      className="ml-auto mr-3 float-right"
                      onClick={this._submit}
                      disabled={!validShopName || !validMobileNumber}
                    >
                      Save Changes
                    </Button>
                    <Link
                      to={`/shop/${match.params.slug}`}
                      className="btn btn-sm btn-white ml-auto mr-3 float-right"
                    >
                      &larr; Go Back
                    </Link>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  shop: state.shopsReducer.shop,
  file: state.shopsReducer.file
});

export default withTranslation()(
  connect(mapStateToProps, { getShopDetails, updateShop, uploadFile })(
    ManageShop
  )
);
