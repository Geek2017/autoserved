import React from 'react';
import { Container, Row, Col } from 'shards-react';

import RegistrationCard from '../../../components/registration/RegistrationCard';
import CustomerForms from '../../../components/registration/CustomerForms';

const CustomerRegistration = () => (
  <Container fluid className="main-content-container my-4 h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="6" className="mx-auto my-auto">
        <RegistrationCard>
          <CustomerForms />
        </RegistrationCard>
      </Col>
    </Row>
  </Container>
);

export default CustomerRegistration;
