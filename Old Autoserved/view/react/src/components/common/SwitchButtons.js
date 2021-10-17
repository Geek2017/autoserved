import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup } from 'shards-react';

const SwitchButtons = ({ items, theme }) => (
  <ButtonGroup size="sm" className="mb-4 mx-auto">
    {items.map((item, index) => (
      <Button key={index} theme={theme} tag={NavLink} to={item.link}>
        {item.title}
      </Button>
    ))}
  </ButtonGroup>
);

SwitchButtons.defaultProps = {
  items: [],
  theme: 'white'
};

SwitchButtons.propTypes = {
  items: PropTypes.array,
  theme: PropTypes.string
};

export default SwitchButtons;
