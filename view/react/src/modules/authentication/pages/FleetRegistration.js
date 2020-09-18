import React from 'react';
import { Container, Row, Col } from 'shards-react';

import RegistrationCard from '../../../components/registration/RegistrationCard';
import FleetForms from '../../../components/registration/FleetForms';

const FleetRegistration = () => (
  <Container fluid className="main-content-container my-4 h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="6" className="mx-auto my-auto">
        <RegistrationCard>
          <FleetForms />
        </RegistrationCard>
      </Col>
    </Row>
  </Container>
);

export default FleetRegistration;
