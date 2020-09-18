import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'shards-react';

const TopUpOption = ({ getAmount, items, defaultSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

  return (
    <div className="w-100">
      <Row>
        {items.map((item, i) => (
          <Col
            key={`topup-times-${i}`}
            onClick={() => {
              setSelectedIndex(i);
              getAmount(item.amount);
            }}
          >
            <Card small className="ml-1 mr-2 mb-4 topup-options">
              <CardBody className="m-1">
                <div
                  className={
                    i === selectedIndex
                      ? `border border-success rounded-sm`
                      : 'border border-clear rounded-sm'
                  }
                  style={{ borderWidth: '5px !important' }}
                >
                  <div className="d-flex justify-content-end">
                    <div
                      className="pl-1"
                      style={{
                        backgroundColor:
                          i === selectedIndex ? '#17c671' : '#fff'
                      }}
                    >
                      <i
                        style={{ color: '#fff' }}
                        className="material-icons mr-1"
                      >
                        check
                      </i>
                    </div>
                  </div>
                  <div className="text-center p-2">
                    <h3 className="font-weight-bold">₱{item.amount}</h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

TopUpOption.defaultProps = {
  getAmount: () => {},
  items: [],
  defaultSelected: 2
};

TopUpOption.propTypes = {
  getAmount: PropTypes.func,
  items: PropTypes.array
};

export default TopUpOption;
