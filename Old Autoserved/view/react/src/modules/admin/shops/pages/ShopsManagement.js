import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Col,
  Container,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'shards-react';
import Fuse from 'fuse.js';

import { actions as shopActions } from '../../../vendor/shops';
import AlertMessages from '../../../../components/common/AlertMessages';
import PageTitle from '../../../../components/common/PageTitle';
import ManageShopsList from '../../../../components/shops/ManageShopsList';

const { getShops } = shopActions;

class ShopsManagement extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.searcher = null;
    this.state = {
      isFetchingShops: true,
      shops: []
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const { getShops } = this.props;

    if (this._isMounted) {
      getShops()
        .then(shops => {
          this.searcher = new Fuse(shops, {
            shouldSort: true,
            keys: ['name']
          });
          this.setState({ isFetchingShops: false, shops });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _handleSearch = event => {
    const { value } = event.target;
    const { shops: allShops } = this.props;
    const shops = value.length === 0 ? allShops : this.searcher.search(value);
    this.setState({ shops });
  };

  render = () => {
    const { t } = this.props;
    const { errorMessages, isFetchingShops, shops } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={t('translation.ttlShops')}
            subtitle="All"
            className="text-sm-left"
          />
          <Col sm="4" className="d-flex ml-auto my-auto form-group">
            <InputGroup seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <i className="material-icons">search</i>
                </InputGroupText>
              </InputGroupAddon>
              <FormInput
                placeholder="Search by shop name"
                onChange={this._handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row form>
          <Col lg="12">
            <AlertMessages errorMessages={errorMessages} />
            <ManageShopsList isFetching={isFetchingShops} shops={shops} />
          </Col>
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  shops: state.shopsReducer.shops
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getShops }
  )(ShopsManagement)
);
