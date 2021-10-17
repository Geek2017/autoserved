import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button,
  ButtonGroup,
  FormSelect
} from 'shards-react';

import { LOGO } from '../../../utils/constants';

const MechanicRegistration = () => (
  <Container fluid className="main-content-container my-4 h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="auth-form mx-auto my-auto">
        <Card>
          <CardBody>
            {/* Logo */}
            <img
              className="d-table mx-auto mb-3"
              src={LOGO}
              alt="AutoServed Logo"
            />

            {/* Title */}
            <h5 className="auth-form__title text-center mb-4">
              Create New Account
            </h5>

            <Col className="col d-flex align-items-center mx-auto mb-3">
              <ButtonGroup
                size="sm"
                className="d-inline-flex mb-4 mb-sm-0 mx-auto"
              >
                <Button theme="white" tag={NavLink} to="/customer-registration">
                  Customer
                </Button>
                <Button theme="white" tag={NavLink} to="/shop-registration">
                  Shop
                </Button>
                <Button theme="white" tag={NavLink} to="/mechanic-registration">
                  Mechanic
                </Button>
              </ButtonGroup>
            </Col>

            {/* Form Fields */}
            <Form>
              <FormGroup>
                <label htmlFor="txtFullName">Full Name</label>
                <FormInput
                  type="text"
                  id="txtFullName"
                  placeholder="Enter full name"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="txtEmail">Email Address</label>
                <FormInput
                  type="email"
                  id="txtEmail"
                  placeholder="Enter email address"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="txtPassword">Password</label>
                <FormInput
                  type="password"
                  id="txtPassword"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="txtConfirmPassword">Confirm Password</label>
                <FormInput
                  type="password"
                  id="txtConfirmPassword"
                  placeholder="Confirm password"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="selCountry">Country</label>
                <FormSelect id="selCountry">
                  <option>Philippines</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormCheckbox>
                  I agree with the <a href="#!">Terms & Conditions</a>.
                </FormCheckbox>
              </FormGroup>
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                Create Account
              </Button>
            </Form>
          </CardBody>

          {/* Social Icons */}
          <CardFooter className="border-top">
            <ul className="auth-form__social-icons d-table mx-auto">
              <li>
                <a href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
            </ul>
          </CardFooter>
        </Card>

        {/* Meta Details */}
        <div className="auth-form__meta d-flex mt-4">
          <Link to="/forgot-password">Forgot your password?</Link>
          <Link to="/login" className="ml-auto">
            Sign In?
          </Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default MechanicRegistration;
