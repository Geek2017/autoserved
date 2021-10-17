import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'shards-react';

const FormSectionTitle = ({ description, title }) => (
  <Row form className="mx-4">
    <Col className="mb-3">
      <h6 className="form-text m-0">{title}</h6>
      <p className="form-text text-muted m-0">{description}</p>
    </Col>
  </Row>
);

FormSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FormSectionTitle;
