import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormCheckbox,
  ListGroup,
  ListGroupItem,
  Progress,
  Row
} from "shards-react";

const ListCompletion = ({
  href,
  list,
  points,
  subTitle,
  totalPoints,
  t,
  theme,
  title,
  enabled
}) => {
  const completedItems = list.filter(item => item.done);
  const shouldUsePoints = points || totalPoints;
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
        <small>{subTitle}</small>
      </CardHeader>
      <CardBody className="p-0">
        <Row className="mx-1">
          <Col sm="12" md="12" lg="12" className="p-3">
            <div className="progress-wrapper">
              <div className="progress-label">
                {t("translation.txtProgress")} ({completedItems.length}/
                {list.length})
              </div>
              <Progress
                className="progress-sm"
                value={
                  shouldUsePoints
                    ? points
                    : completedItems.length
                    ? (completedItems.length / list.length) * 100
                    : 0
                }
                striped
                theme={theme}
              >
                <span className="progress-value">
                  {shouldUsePoints
                    ? `${points} point(s)`
                    : `${
                        completedItems.length
                          ? (completedItems.length / list.length) * 100
                          : 0
                      } %`}
                </span>
              </Progress>
            </div>
          </Col>
        </Row>
        <ListGroup flush>
          <ListGroupItem className="px-3 pb-2">
            {list.map((item, index) => {
              return (
                <FormCheckbox
                  key={index}
                  className="mb-1"
                  value={item.title}
                  defaultChecked={item.done}
                  disabled
                >
                  {item.done ? (
                    <strong className="text-primary">
                      <del>{item.title}</del>
                    </strong>
                  ) : (
                    item.title
                  )}
                </FormCheckbox>
              );
            })}
          </ListGroupItem>
        </ListGroup>
      </CardBody>
      {!enabled && (
        <CardFooter className="border-top">
          <Row>
            <Col className="text-right view-report">
              <Link to={href}>{t("translation.txtCompleteItems")} &rarr;</Link>
            </Col>
          </Row>
        </CardFooter>
      )}
    </Card>
  );
};

ListCompletion.defaultProps = {
  href: "#",
  list: [],
  theme: "primary",
  enabled: false
};

ListCompletion.propTypes = {
  href: PropTypes.string,
  list: PropTypes.array,
  points: PropTypes.number,
  subTitle: PropTypes.string,
  totalPoints: PropTypes.number,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  enabled: PropTypes.bool
};

export default withTranslation()(ListCompletion);
