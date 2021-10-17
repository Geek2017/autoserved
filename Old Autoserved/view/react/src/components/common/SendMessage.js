import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormTextarea,
  Button,
  ListGroup,
  ListGroupItem
} from 'shards-react';

const SendMessage = ({ title, description }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody>
      <ListGroup flush>
        <ListGroupItem className="pt-0 pb-4 px-0">
          <small>{description}</small>
        </ListGroupItem>
      </ListGroup>
      <Form>
        <FormTextarea
          cols="30"
          rows="6"
          className="mb-3"
          placeholder="Ask a question"
        />
        <Button type="submit" size="sm" theme="accent">
          Send Message
        </Button>
      </Form>
    </CardBody>
  </Card>
);

SendMessage.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  description: PropTypes.string
};

SendMessage.defaultProps = {
  title: 'Explore Client Care Advice',
  description:
    'Get free advice from certified shop mechanics. We’re powered by a network of reputable certified shop mechanics who will come to your location to fix your car.'
};

export default SendMessage;
