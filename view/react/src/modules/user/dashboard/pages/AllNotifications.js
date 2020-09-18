import React, { Component } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardHeader } from "shards-react";

import PageTitle from "../../../../components/common/PageTitle";
import { actions as menuActions } from "../../../../components/layout/MainNavbar";

const { getAllNotifications, readAllNotifications } = menuActions;

class AllNotifications extends Component {
  componentDidMount = () => {
    const { getAllNotifications, readAllNotifications } = this.props;
    readAllNotifications()
      .then(() => {
        getAllNotifications().catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  render = () => {
    const { allNotifications } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={"Notifications"}
            subtitle={"Application"}
            className="page-header__text text-sm-left"
          />
        </Row>
        <Row className="page-body">
          <Col lg="12">
            <Card small className="carlist-container mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Notifications List</h6>
              </CardHeader>
              <CardBody>
                <Container fluid>
                  <div className="datatable datatable--plain">
                    {allNotifications.map(
                      ({ data: item, read_at, created_at }, index) => {
                        return (
                          <Link to={item.href} key={index}>
                            <div className="notification__content position-relative border-bottom p-3">
                              <span className="mb-0 notification__category text-capitalize">
                                {item.request !== undefined &&
                                  `new ${item.request.type} request`}
                                {item.estimate !== undefined && `estimation`}
                                {item.appointment !== undefined &&
                                  `new appointment`}
                                {item.application !== undefined &&
                                  `activation requirements`}
                              </span>
                              <p className="mb-0 text-muted">
                                <small>{moment(created_at).fromNow()}</small>
                              </p>
                              <p className="mb-0 text-secondary">
                                {item.message}
                              </p>
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  allNotifications: state.menuReducer.allNotifications
});

export default withTranslation()(
  connect(mapStateToProps, { getAllNotifications, readAllNotifications })(
    AllNotifications
  )
);
