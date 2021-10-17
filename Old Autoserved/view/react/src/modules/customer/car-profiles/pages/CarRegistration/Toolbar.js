import React from "react";
import PageTitle from "../../../../../components/common/PageTitle";

import { Col, Row } from "shards-react";

export default function HeaderToolbar(props) {
  const {
    toolbarActions,
    grid = {
      sm: 4
    }
  } = props;
  return (
    <Row noGutters className="row__main-title page-header py-4">
      <PageTitle
        {...grid}
        title="Let's create your car!"
        subtitle="New Car"
        className="text-sm-left"
      />
      {toolbarActions && (
        <Col sm="4" className="d-flex ml-auto my-auto">
          {toolbarActions()}
        </Col>
      )}
    </Row>
  );
}
