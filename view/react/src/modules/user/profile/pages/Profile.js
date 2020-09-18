import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'shards-react';

import { actions as profileActions } from '../index';
import { actions as shopsActions } from '../../../vendor/shops';
import { actions as carProfilesActions } from '../../../customer/car-profiles';
import UserDetails from '../../../../components/profile/UserDetails';
import ProfileStats from '../../../../components/profile/ProfileStats';
import UserActivities from '../../../../components/profile/UserActivities';
import ShopsList from '../../../../components/profile/ShopsList';
import CarsList from '../../../../components/profile/CarsList';
import {
  USER_TYPE_CUSTOMER,
  USER_TYPE_VENDOR
} from '../../../../utils/constants';

const { getAccountActivities, getAccountDetails, getWallet } = profileActions;
const { getShops } = shopsActions;
const { getCars } = carProfilesActions;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingCars: true,
      isFetchingLogs: true,
      isFetchingShops: true
    };
  }

  componentDidMount = () => {
    const {
      getAccountActivities,
      getAccountDetails,
      getCars,
      getShops,
      getWallet
    } = this.props;
    // Retrieve all activity logs
    getAccountActivities()
      .then(() => {
        this.setState({ isFetchingLogs: false });
      })
      .catch(error => {
        console.log(error);
      });
    // Retrieve user's account details
    getAccountDetails().catch(error => {
      console.log(error);
    });
    // Retrieves user's wallet details
    getWallet()
      .then(() => {
        this.setState({ isFetchingShops: false });
      })
      .catch(error => {
        console.log(error);
      });
    // Retrieve all shops
    getShops().catch(error => {
      error && console.log(error);
    });
    getCars().catch(error => {
      error && console.log(error);
    });
  };

  render = () => {
    const { cars, details, logs, shops, user, wallet } = this.props;
    const { isFetchingCars, isFetchingLogs, isFetchingShops } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="py-4">
          <Col lg="4">
            <UserDetails user={details} />
            {details && user.user_type === USER_TYPE_VENDOR ? (
              <ShopsList isFetching={isFetchingShops} shops={shops} />
            ) : details && user.user_type === USER_TYPE_CUSTOMER ? (
              <CarsList isFetching={isFetchingCars} cars={cars} />
            ) : null}
          </Col>
          <Col lg="8">
            {details && user.user_type === USER_TYPE_VENDOR ? (
              <ProfileStats shopsCount={shops.length} wallet={wallet} />
            ) : details && user.user_type === USER_TYPE_CUSTOMER ? (
              <ProfileStats carsCount={cars.length} wallet={wallet} />
            ) : null}
            <UserActivities isFetching={isFetchingLogs} logs={logs} />
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  cars: state.carProfilesReducer.cars,
  details: state.profilesReducer.details,
  logs: state.profilesReducer.logs,
  shops: state.shopsReducer.shops,
  user: state.authenticationReducer.user,
  wallet: state.profilesReducer.wallet
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getAccountActivities, getAccountDetails, getCars, getShops, getWallet }
  )(Profile)
);
