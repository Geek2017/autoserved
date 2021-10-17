import adminSidebar from "../menu/system-sidebar";
import userSidebar from "../menu/customer-sidebar";
import vendorSidebar from "../menu/vendor-sidebar";
import fleetAdminSidebar from "../menu/fleet-admin-sidebar";

export default (t, type) => {
  const menu = {
    admin: adminSidebar,
    customer: userSidebar,
    fleet_admin: fleetAdminSidebar,
    vendor: vendorSidebar
  };

  return type ? menu[type](t) : [];
};
