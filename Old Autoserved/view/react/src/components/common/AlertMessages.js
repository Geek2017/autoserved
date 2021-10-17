import React from "react";
import PropTypes from "prop-types";
import { Alert } from "shards-react";

const AlertMessages = ({
  errorMessages,
  successMessages,
  infoMessages,
  warningMessages
}) => (
  <div>
    {successMessages.map((success, index) => (
      <Alert
        key={index}
        fade
        theme="success"
        className="outline-success rounded"
      >
        <p className="mb-0">{success.message}</p>
      </Alert>
    ))}
    {errorMessages.map((error, index) => (
      <Alert key={index} fade theme="danger" className="outline-danger rounded">
        <p className="mb-0">{error.message}</p>
      </Alert>
    ))}
    {warningMessages.map((warning, index) => (
      <Alert
        key={index}
        fade
        theme="warning"
        className="outline-warning rounded"
      >
        <p className="mb-0">{warning.message}</p>
      </Alert>
    ))}
    {infoMessages.map((info, index) => (
      <Alert key={index} fade theme="info" className="outline-info rounded">
        <p className="mb-0">{info.message}</p>
      </Alert>
    ))}
  </div>
);

AlertMessages.defaultProps = {
  errorMessages: [],
  successMessages: [],
  infoMessages: [],
  warningMessages: []
};

AlertMessages.propTypes = {
  errorMessages: PropTypes.array,
  successMessages: PropTypes.array,
  infoMessages: PropTypes.array,
  warningMessages: PropTypes.array
};

export default AlertMessages;
