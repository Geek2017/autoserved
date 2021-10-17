import React from 'react';
import { Container, Button } from 'shards-react';
import { Link } from 'react-router-dom';

const MaintenancePage = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>This feature is currently unavailable</h2>
        <h3>This functionality will be ready soon!</h3>
        <p>
          Our developers are working hard to provide you with better solutions.
        </p>
        <Link to="/">
          <Button pill>&larr; Go Back</Button>
        </Link>
      </div>
    </div>
  </Container>
);

export default MaintenancePage;
