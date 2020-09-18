import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import TagsInput from 'react-tagsinput';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormInput,
  Row
} from 'shards-react';

import { actions as shopActions } from '../index';
import PageTitle from '../../../../components/common/PageTitle';
import getFileManagerColumns from '../../../../utils/columns/file-manager';

const { getShopDetails, updateApplication, uploadFile } = shopActions;

class ShopDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Application data
      application: null,
      applicationUpdates: null,
      // Error messages
      errorMessages: [],
      // Success messages
      successMessages: [],
      // Shop data
      shop: null,
      txtCertification: [],
      txtSpecialTools: [],
      // Required files
      files: [
        {
          name: 'BIR Certificate of Registration',
          size: 0,
          path: null,
          handler: this._handleBirCertificate
        },
        {
          name: "Mayor's Permit",
          size: 0,
          path: null,
          handler: this._handleBusinessPermit
        },
        {
          name: 'SEC/DTI Certificate of Registration',
          size: 0,
          path: null,
          handler: this._handleBusinessRegistration
        }
      ]
    };
  }

  componentWillMount = () => {
    const { match } = this.props;
    // Get shop with the given ID
    this._getShopDetails(match.params.slug);
  };

  _getShopDetails = slug => {
    const { getShopDetails } = this.props;
    getShopDetails(slug)
      .then(shop => {
        if (shop) {
          const { application } = shop;
          const { bir, business_permit, registration } = application;
          const { files } = this.state;

          if (bir) {
            files[0].size = bir.size;
            files[0].path = bir.path;
            files[0].updated_at = bir.updated_at;
            files[0].filename = bir.filename;
          }

          if (business_permit) {
            files[1].size = business_permit.size;
            files[1].path = business_permit.path;
            files[1].updated_at = business_permit.updated_at;
            files[1].filename = business_permit.filename;
          }

          if (registration) {
            files[2].size = registration.size;
            files[2].path = registration.path;
            files[2].updated_at = registration.updated_at;
            files[2].filename = registration.filename;
          }

          this.setState({
            shop,
            application,
            files,
            applicationUpdates: application,
            txtCertification: application.merch_cert || [],
            txtSpecialTools: application.special_tools || []
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleCertificationTag = txtCertification => {
    this.setState({ txtCertification });
  };

  _handleSpecialToolsTag = txtSpecialTools => {
    this.setState({ txtSpecialTools });
  };

  _handleShopSize = event => {
    const { applicationUpdates } = this.state;
    applicationUpdates.shop_size = event.target.value;
    this.setState({ applicationUpdates });
  };

  _handleBirCertificate = event => {
    event.preventDefault();
    const { match, t, uploadFile } = this.props;
    const { files, shop } = this.state;
    const file = event.target.files.length ? event.target.files[0] : null;
    let successMessages = [];
    let errorMessages = [];

    if (file) {
      uploadFile('application/bir-certificate', shop.application.id, file)
        .then(result => {
          if (result) {
            successMessages.push({
              message: t('translation.successUpload')
            });
            files[0].size = result.size;
            files[0].path = result.path;
            files[0].updated_at = result.updated_at;
            files[0].filename = result.filename;
            this.setState({ files, successMessages }, () => {
              this._getShopDetails(match.params.slug);
            });
          }
        })
        .catch(() => {
          errorMessages.push({ message: t('translation.generalError') });
          this.setState({ errorMessages });
        });
    }
  };

  _handleBusinessPermit = event => {
    event.preventDefault();
    const { match, t, uploadFile } = this.props;
    const { files, shop } = this.state;
    const file = event.target.files.length ? event.target.files[0] : null;
    let successMessages = [];
    let errorMessages = [];

    if (file) {
      uploadFile('application/business-permit', shop.application.id, file)
        .then(result => {
          if (result) {
            successMessages.push({
              message: t('translation.successUpload')
            });
            files[1].size = result.size;
            files[1].path = result.path;
            files[1].updated_at = result.updated_at;
            files[1].filename = result.filename;
            this.setState({ files, successMessages }, () => {
              this._getShopDetails(match.params.slug);
            });
          }
        })
        .catch(() => {
          errorMessages.push({ message: t('translation.generalError') });
          this.setState({ errorMessages });
        });
    }
  };

  _handleBusinessRegistration = event => {
    event.preventDefault();
    const { match, t, uploadFile } = this.props;
    const { files, shop } = this.state;
    const file = event.target.files.length ? event.target.files[0] : null;
    let successMessages = [];
    let errorMessages = [];

    if (file) {
      uploadFile('application/business-registration', shop.application.id, file)
        .then(result => {
          if (result) {
            successMessages.push({
              message: t('translation.successUpload')
            });
            files[2].size = result.size;
            files[2].path = result.path;
            files[2].updated_at = result.updated_at;
            files[2].filename = result.filename;
            this.setState({ files, successMessages }, () => {
              this._getShopDetails(match.params.slug);
            });
          }
        })
        .catch(() => {
          errorMessages.push({ message: t('translation.generalError') });
          this.setState({ errorMessages });
        });
    }
  };

  _handleLifters = event => {
    const { applicationUpdates } = this.state;
    applicationUpdates.lifters = Number(event.target.value);
    this.setState({ applicationUpdates });
  };

  _submit = event => {
    event.preventDefault();
    const { t, updateApplication } = this.props;
    const {
      applicationUpdates,
      txtCertification,
      txtSpecialTools
    } = this.state;
    applicationUpdates.merch_cert = txtCertification;
    applicationUpdates.special_tools = txtSpecialTools;
    let successMessages = [];
    let errorMessages = [];

    updateApplication(applicationUpdates.id, applicationUpdates)
      .then(application => {
        successMessages.push({
          message: t('translation.successUpdateApplication')
        });
        this.setState({ application, successMessages });
        window.scrollTo(0, 0);
      })
      .catch(() => {
        errorMessages.push({ message: t('translation.generalError') });
        this.setState({ errorMessages });
      });
  };

  render = () => {
    const { match, t } = this.props;
    const {
      application,
      applicationUpdates,
      errorMessages,
      files,
      successMessages,
      txtCertification,
      txtSpecialTools
    } = this.state;
    const tableColumns = getFileManagerColumns(t);
    return application ? (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="8"
            title="Activation Requirements"
            subtitle="Shop"
            className="text-sm-left mb-3"
          />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Link
              className="btn btn-white mx-auto ml-sm-auto mr-sm-0"
              to={`/shop/${match.params.slug}`}
            >
              &larr; Go Back
            </Link>
          </Col>
        </Row>
        <Row noGutters className="page-header pt-2 pb-4">
          <Col lg="12">
            {successMessages.map((success, index) => (
              <Alert
                key={index}
                fade
                theme="success"
                className="outline-success mb-0 rounded mt-4"
              >
                <p className="mb-0">{success.message}</p>
              </Alert>
            ))}
            {errorMessages.map((error, index) => (
              <Alert
                key={index}
                fade
                theme="danger"
                className="outline-danger mb-0 rounded mt-4"
              >
                <p className="mb-0">{error.message}</p>
              </Alert>
            ))}
            <Card className="file-manager file-manager-list p-0">
              <CardHeader className="text-center p-3 border-bottom" />
              <CardBody className="p-0 border-bottom">
                <ReactTable
                  columns={tableColumns}
                  data={files}
                  pageSize={files.length}
                  showPagination={false}
                  resizable={false}
                  sortable={false}
                />
              </CardBody>
              <CardFooter className="text-right p-3">
                <small className="text-light mb-0 font-italic px-3">
                  Maximum file size per file: 5MB - (JPEG, PNG, PDF, DOCX)
                </small>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="page-header pt-2 pb-4">
          <Col lg="12">
            <Card className="file-manager file-manager-list p-0">
              <CardHeader className="p-3 border-bottom">
                <h6 className="m-0">Additional Information</h6>
              </CardHeader>
              <CardBody className="p-4 border-bottom">
                <Row form>
                  <Col lg="6" className="form-group">
                    <label htmlFor="txtLifters"># of Lifters</label>
                    <FormInput
                      id="txtLifters"
                      value={applicationUpdates.lifters || 0}
                      onChange={this._handleLifters}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col lg="6" className="form-group">
                    <label htmlFor="txtCertification">Certification</label>
                    <TagsInput
                      value={txtCertification}
                      onChange={this._handleCertificationTag}
                      inputProps={{
                        id: 'txtCertification',
                        placeholder: 'Add entries'
                      }}
                    />
                  </Col>
                  <Col lg="6" className="form-group">
                    <label htmlFor="txtSpecialTools">Special Tools</label>
                    <TagsInput
                      value={txtSpecialTools}
                      onChange={this._handleSpecialToolsTag}
                      inputProps={{
                        id: 'txtSpecialTools',
                        placeholder: 'Add entries'
                      }}
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-center p-3">
                <Button
                  size="sm"
                  theme="success"
                  className="ml-auto mr-3 float-right"
                  onClick={this._submit}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    ) : null;
  };
}

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  shop: state.shopsReducer.shop
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getShopDetails, updateApplication, uploadFile }
  )(ShopDocuments)
);
