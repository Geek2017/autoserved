import React from 'react';
import moment from 'moment';
import prettysize from 'prettysize';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row
} from 'shards-react';

const ActivationRequirements = ({ id, requirements, verify }) => {
  return (
    <Row noGutters className="page-header pt-2 pb-4">
      <Col lg="12">
        <Card className="file-manager file-manager-list p-0">
          <CardHeader className="text-center p-3 border-bottom" />
          <CardBody className="p-0 border-bottom">
            <Container fluid className="px-0">
              <table className="table lo-stats mb-0">
                <thead className="py-1 bg-light text-semibold border-bottom">
                  <tr>
                    <th />
                    <th>
                      <small>Name</small>
                    </th>
                    <th className="text-center">
                      <small>Size</small>
                    </th>
                    <th className="text-center">
                      <small>File Name / Value</small>
                    </th>
                    <th className="text-center">
                      <small>Status</small>
                    </th>
                    <th className="text-center">
                      <small>Actions</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">insert_drive_file</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">
                        BIR Certificate of Registration (25)
                      </h6>
                      <span className="file-manager__item-meta">
                        {requirements.bir
                          ? `Last updated ${moment(
                              requirements.bir.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">
                      {prettysize(requirements.bir ? requirements.bir.size : 0)}
                    </td>
                    <td className="text-center">
                      <a
                        href={requirements.bir ? requirements.bir.path : '#'}
                        rel="noopener noreferrer"
                        target={requirements.bir ? '_blank' : null}
                      >
                        {requirements.bir ? requirements.bir.filename : '-'}
                      </a>
                    </td>
                    <td className="text-center">
                      {requirements.verified_bir_cert ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.bir === null ||
                          requirements.verified_bir_cert
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'bir_cert')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">insert_drive_file</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">Mayor's Permit (25)</h6>
                      <span className="file-manager__item-meta">
                        {requirements.business_permit
                          ? `Last updated ${moment(
                              requirements.business_permit.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">
                      {prettysize(
                        requirements.business_permit
                          ? requirements.business_permit.size
                          : 0
                      )}
                    </td>
                    <td className="text-center">
                      <a
                        href={
                          requirements.business_permit
                            ? requirements.business_permit.path
                            : '#'
                        }
                        rel="noopener noreferrer"
                        target={requirements.business_permit ? '_blank' : null}
                      >
                        {requirements.business_permit
                          ? requirements.business_permit.filename
                          : '-'}
                      </a>
                    </td>
                    <td className="text-center">
                      {requirements.verified_permit ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.business_permit === null ||
                          requirements.verified_permit
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'permit')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">insert_drive_file</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">
                        SEC/DTI Certificate of Registration (25)
                      </h6>
                      <span className="file-manager__item-meta">
                        {requirements.registration
                          ? `Last updated ${moment(
                              requirements.registration.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">
                      {prettysize(
                        requirements.registration
                          ? requirements.registration.size
                          : 0
                      )}
                    </td>
                    <td className="text-center">
                      <a
                        href={
                          requirements.registration
                            ? requirements.registration.path
                            : '#'
                        }
                        rel="noopener noreferrer"
                        target={requirements.registration ? '_blank' : null}
                      >
                        {requirements.registration
                          ? requirements.registration.filename
                          : '-'}
                      </a>
                    </td>
                    <td className="text-center">
                      {requirements.verified_biz_reg ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.registration === null ||
                          requirements.verified_biz_reg
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'biz_reg')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">vertical_align_top</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">Lifters (5)</h6>
                      <span className="file-manager__item-meta">
                        {requirements
                          ? `Last updated ${moment(
                              requirements.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">-</td>
                    <td className="text-center">
                      {requirements.lifters ? requirements.lifters : '-'}
                    </td>
                    <td className="text-center">
                      {requirements.verified_lifters ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.lifters === null ||
                          requirements.verified_lifters
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'lifters')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">note</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">Merchant Certifications (10)</h6>
                      <span className="file-manager__item-meta">
                        {requirements
                          ? `Last updated ${moment(
                              requirements.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">-</td>
                    <td className="text-center">
                      {requirements.merch_cert &&
                      requirements.merch_cert.length > 0
                        ? requirements.merch_cert.join(', ')
                        : '-'}
                    </td>
                    <td className="text-center">
                      {requirements.verified_merch_cert ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.merch_cert === null ||
                          requirements.merch_cert.length === 0 ||
                          requirements.verified_merch_cert
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'merch_cert')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="file-manager__item-icon">
                        <div>
                          <i className="material-icons">build</i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0">Special Tools (10)</h6>
                      <span className="file-manager__item-meta">
                        {requirements
                          ? `Last updated ${moment(
                              requirements.updated_at
                            ).fromNow()}`
                          : '-'}
                      </span>
                    </td>
                    <td className="text-center">-</td>
                    <td className="text-center">
                      {requirements.special_tools &&
                      requirements.special_tools.length > 0
                        ? requirements.special_tools.join(', ')
                        : '-'}
                    </td>
                    <td className="text-center">
                      {requirements.verified_special_tools ? (
                        <Badge pill size="sm" theme="success">
                          Verified
                        </Badge>
                      ) : (
                        <Badge pill size="sm" theme="danger">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        disabled={
                          requirements.special_tools === null ||
                          requirements.special_tools.length === 0 ||
                          requirements.verified_special_tools
                            ? true
                            : false
                        }
                        onClick={() => verify(id, 'special_tools')}
                        size="sm"
                        theme="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Container>
          </CardBody>
          <CardFooter className="text-right p-3"></CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

ActivationRequirements.propTypes = {
  requirements: PropTypes.object.isRequired,
  verify: PropTypes.func.isRequired
};

export default withTranslation()(ActivationRequirements);
