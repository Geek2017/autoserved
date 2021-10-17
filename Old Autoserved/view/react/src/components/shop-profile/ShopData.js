import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, CardBody, CardHeader } from 'shards-react';

const ShopData = ({ title, data }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <div className="user-details__tags p-4">
        {data
          ? data.map((tag, idx) => (
              <Badge
                pill
                theme="light"
                className="text-light text-uppercase mb-2 border mr-1"
                key={idx}
              >
                {tag}
              </Badge>
            ))
          : '-'}
      </div>
    </CardBody>
  </Card>
);

ShopData.defaultProps = {
  data: []
};

ShopData.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array
};

export default ShopData;
