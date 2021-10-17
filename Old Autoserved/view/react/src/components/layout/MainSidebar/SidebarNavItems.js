import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'shards-react';

import SidebarNavItem from './SidebarNavItem';

const SidebarNavItems = ({ items }) => (
  <div className="nav-wrapper">
    {items.map((nav, index) => (
      <div key={index}>
        <h6 className="main-sidebar__nav-title">{nav.title}</h6>
        {nav.items && nav.items.length && (
          <Nav className="nav--no-borders flex-column">
            {nav.items.map((item, index) => (
              <SidebarNavItem key={index} item={item} />
            ))}
          </Nav>
        )}
      </div>
    ))}
  </div>
);

SidebarNavItems.defaultProps = {
  items: []
};

SidebarNavItems.propTypes = {
  items: PropTypes.array
};

export default SidebarNavItems;
