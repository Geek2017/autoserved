import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import moment from "moment";
import {} from "pusher-js";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import UIfx from "uifx";

import { actions as menuActions } from "../index";
import { PUSHER_CLUSTER, PUSHER_KEY } from "../../../../utils/constants";

const { getNotifications } = menuActions;

const notificationFx = new UIfx({
  asset: "../../../../sounds/notification.mp3"
});
const echo = new Echo({
  broadcaster: "pusher",
  key: PUSHER_KEY,
  cluster: PUSHER_CLUSTER,
  forceTLS: true
});

const Notifications = ({ user, getNotifications, notifications }) => {
  const [unread, setUnread] = useState(0);
  const [visible, toggleVisibility] = useState(false);

  const _toggleVisibility = () => {
    toggleVisibility(!visible);

    if (!visible) {
      if (notifications.length > 5) {
        notifications.splice(5, notifications.length - 1);
      }

      setUnread(notifications.filter(item => !item.read_at).length);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    if (notifications.length > 5) {
      notifications.splice(5, notifications.length - 1);
    }

    setUnread(notifications.filter(item => !item.read_at).length);
  }, [notifications]);

  useEffect(() => {
    const { user_type, id } = user;

    if (user_type !== undefined && id !== undefined) {
      const notificationCallback = () => {
        getNotifications();
        notificationFx.play();
      };
      const requestsChannel = echo.channel(`service-requests.${user_type}`);
      requestsChannel.listen(".new-request", notificationCallback);
      const notificationsChannel = echo.channel(`notification.${id}`);
      notificationsChannel.listen(".notification", notificationCallback);
    }
  }, [getNotifications, user]);

  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="btn nav-link-icon text-center"
        onClick={_toggleVisibility}
      >
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">notifications</i>
          <Badge pill theme={unread > 0 ? "danger" : "info"}>
            {unread}
          </Badge>
        </div>
      </NavLink>
      <Collapse open={visible} className="dropdown-menu dropdown-menu-small">
        {notifications.length ? (
          notifications.map(({ data: item, read_at, created_at }, index) => {
            return (
              <DropdownItem href={item.href} key={index}>
                <div className="notification__icon-wrapper">
                  <div className="notification__icon">
                    <i className="material-icons">{item.icon}</i>
                  </div>
                </div>
                <div className="notification__content position-relative">
                  <span className="mb-0 notification__category text-capitalize">
                    {item.request !== undefined &&
                      `new ${item.request.type} request`}
                    {item.estimate !== undefined && `estimation`}
                    {item.appointment !== undefined && `new appointment`}
                    {item.application !== undefined &&
                      `activation requirements`}
                  </span>
                  <p className="mb-0 text-muted">
                    <small>{moment(created_at).fromNow()}</small>
                  </p>
                  {!read_at && (
                    <div
                      className="rounded-circle p-1 bg-primary position-absolute"
                      style={{ right: 10, top: 10 }}
                    ></div>
                  )}
                  <p>{item.message}</p>
                </div>
              </DropdownItem>
            );
          })
        ) : (
          <DropdownItem>
            <div className="notification__content">
              <p>No notifications received</p>
            </div>
          </DropdownItem>
        )}
        <DropdownItem
          href="/notifications"
          className="notification__all text-center text-primary"
        >
          View all Notifications
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};

const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  notifications: state.menuReducer.notifications
});

export default withTranslation()(
  connect(mapStateToProps, { getNotifications })(Notifications)
);
