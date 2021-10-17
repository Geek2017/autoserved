import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "shards-react";

import { actions as shopActions } from "../index";
import ListCompletion from "../../../../components/common/ListCompletion";
import PageTitle from "../../../../components/common/PageTitle";
import Details from "../../../../components/shop-profile/Details";
import OperatingHours from "../../../../components/shop-profile/OperatingHours";
import ShopData from "../../../../components/shop-profile/ShopData";
import ShopMap from "../../../../components/shop-profile/ShopMap";
import { USER_TYPE_VENDOR } from "../../../../utils/constants";
import {
  shopProfileCompletion,
  shopActivationRequirements
} from "../../../../utils/helper";
import AlertMessages from "../../../../components/common/AlertMessages";

const { getShopDetails } = shopActions;

class Shop extends Component {
  componentDidMount = () => {
    const { match } = this.props;
    const { getShopDetails } = this.props;
    getShopDetails(match.params.slug).catch(error => {
      console.log(error);
    });
  };

  render = () => {
    const { match, shop, t, user } = this.props;
    const { slug } = match.params;
    const showEdit =
      user.user_type === USER_TYPE_VENDOR &&
      shop !== null &&
      user.id === shop.user.id;
    const profileItems = shopProfileCompletion(shop).filter(item => !item.done);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="8"
            title={t("translation.ttlShopDetails")}
            subtitle={t("translation.subTtlShop")}
            className="text-sm-left"
          />
          {showEdit ? (
            <Col lg="4" className="d-flex ml-auto my-auto">
              <Link
                to={`/shop/${slug}/manage`}
                className="btn btn-warning mx-auto ml-sm-auto mr-sm-0 text-white"
              >
                <i className="material-icons">edit</i>
                {t("translation.btnEditShop")}
              </Link>
            </Col>
          ) : null}
        </Row>
        {shop ? (
          <Row className="py-4">
            <Col lg="8">
              <Details shop={shop} />
              <OperatingHours data={shop.operations} />
              <Row>
                <Col lg="4">
                  <ShopData
                    title={t("translation.txtFeatures")}
                    data={shop.features}
                  />
                </Col>
                <Col lg="4">
                  <ShopData
                    title={t("translation.txtSpecialTools")}
                    data={shop.application.special_tools}
                  />
                </Col>
                <Col lg="4">
                  <ShopData
                    title={t("translation.txtAmenities")}
                    data={shop.amenities}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              {showEdit ? (
                <div>
                  {profileItems.length !== 0 && (
                    <AlertMessages
                      infoMessages={[
                        {
                          message:
                            "Complete profile to enable activation requirements submission."
                        }
                      ]}
                    />
                  )}
                  <ListCompletion
                    title={t("translation.txtProfileCompletion")}
                    list={shopProfileCompletion(shop)}
                    href={`/shop/${slug}/manage`}
                  />
                  <ListCompletion
                    subTitle="Your activation requirements will be verified"
                    title={t("translation.txtActivationRequirements")}
                    list={shopActivationRequirements(shop.application)}
                    points={shop.completion ? shop.completion * 100 : 0}
                    totalPoints={100}
                    href={`/shop/${slug}/documents`}
                    enabled={profileItems.length !== 0}
                  />
                </div>
              ) : (
                <ShopMap shop={shop} />
              )}
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  shop: state.shopsReducer.shop
});

export default withTranslation()(
  connect(mapStateToProps, { getShopDetails })(Shop)
);
