import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col } from "shards-react";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col className={classes} {...attrs}>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title text-capitalize">{title}</h3>
    </Col>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default PageTitle;
