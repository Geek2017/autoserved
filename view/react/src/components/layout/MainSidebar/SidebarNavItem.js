import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "shards-react";

import { actions as menuActions } from "../MainNavbar";
const { toggleDropDownItem, toggleSidebar } = menuActions;

class SidebarNavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }

  _toggleDropdown = selectedItem => {
    selectedItem.open = !selectedItem.open;
    this.setState({ selectedItem });
  };

  render = () => {
    const { item, toggleSidebar } = this.props;
    const hasSubItems = item.items && item.items.length;
    const classNames =
      (hasSubItems && "dropdown-toggle") ||
      (item.disabled && "text-muted") ||
      "";
    return (
      <NavItem style={{ position: "relative" }}>
        <NavLink
          disabled={item.disabled}
          className={`${classNames} ${item.classData}`}
          tag={item.href ? "a" : RouteNavLink}
          to={item.to !== null ? (hasSubItems ? "#" : item.to) : null}
          href={item.href}
          target={item.href ? "__blank" : ""}
          onClick={e => {
            if (hasSubItems) {
              e.preventDefault();
            } else {
              toggleSidebar(false);
            }

            this._toggleDropdown(item);
          }}
        >
          {item.htmlBefore && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
            />
          )}
          {item.title && <span>{item.title}</span>}
          {item.htmlAfter && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>
        {hasSubItems && (
          <Collapse
            tag={DropdownMenu}
            small
            open={item.open}
            style={{ top: 0 }}
          >
            {item.items.map((subItem, idx) => (
              <DropdownItem
                toggle={item.open}
                key={idx}
                tag={RouteNavLink}
                to={subItem.to}
                onClick={() => {
                  toggleSidebar(false);
                }}
              >
                {subItem.title}
              </DropdownItem>
            ))}
          </Collapse>
        )}
      </NavItem>
    );
  };
}

SidebarNavItem.propTypes = {
  item: PropTypes.object
};

const mapStateToProps = state => ({
  visibleDropDownItem: state.menuReducer.visibleDropDownItem
});

export default connect(mapStateToProps, { toggleSidebar, toggleDropDownItem })(
  SidebarNavItem
);
