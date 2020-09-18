import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import HowTo from "./HowTo";

const NavbarNav = () => (
  <Nav navbar className="border-left flex-row">
    <Notifications />
    <HowTo />
    <UserActions />
  </Nav>
);

export default NavbarNav;
