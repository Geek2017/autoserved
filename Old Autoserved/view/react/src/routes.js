import React from "react";
import { Redirect } from "react-router-dom";
import { DefaultLayout, EmptyLayout } from "./layouts";

import ErrorPage from "./pages/ErrorPage";
import Maintenance from "./pages/Maintenance";

// Authentication Pages
import Login from "./modules/authentication/pages/Login";
import ForgotPassword from "./modules/authentication/pages/ForgotPassword";
import PasswordReset from "./modules/authentication/pages/PasswordReset";
import CustomerRegistration from "./modules/authentication/pages/CustomerRegistration";
import ShopRegistration from "./modules/authentication/pages/ShopRegistration";
import FleetRegistration from "./modules/authentication/pages/FleetRegistration";
import FleetMemberRegistration from "./modules/authentication/pages/FleetMemberRegistration";

// Global Pages
import Profile from "./modules/user/profile/pages/Profile";
import ManageProfile from "./modules/user/profile/pages/ManageProfile";
import TopUp from "./modules/user/profile/pages/TopUp";
import Dashboard from "./modules/user/dashboard/pages/Dashboard";
import Requests from "./modules/user/requests/pages/Requests";
import Estimates from "./modules/user/estimates/pages/Estimates";
import Appointments from "./modules/user/appointments/pages/Appointments";
import Shops from "./modules/vendor/shops/pages/Shops";
import Shop from "./modules/vendor/shops/pages/Shop";
import ManageShop from "./modules/vendor/shops/pages/ManageShop";
import ShopDocuments from "./modules/vendor/shops/pages/ShopDocuments";
import CorrectiveServices from "./modules/vendor/services/pages/CorrectiveServices";
import PreventiveServices from "./modules/vendor/services/pages/PreventiveServices";
import ManagePreventiveServices from "./modules/vendor/services/pages/ManagePreventiveServices";
import CarProfiles from "./modules/customer/car-profiles/pages/CarProfiles";
import CarRegistration from "./modules/customer/car-profiles/pages/CarRegistration";
import CarSchedules from "./modules/customer/car-profiles/pages/CarSchedules";

// Public Pages
// import EstimateWizard from './modules/customer/estimate-wizard/pages/EstimateWizard';

// System Pages
import ShopsManagement from "./modules/admin/shops/pages/ShopsManagement";
import ShopDocumentsManagement from "./modules/admin/shops/pages/ShopDocumentsManagement";
import UsersManagement from "./modules/admin/users/pages/UsersManagement";
import ManageOtherServices from "./modules/vendor/services/pages/ManageOtherServices";
import AllNotifications from "./modules/user/dashboard/pages/AllNotifications";
import Appointment from "./modules/user/appointments/pages/Appointment";

const routes = [
  {
    path: "/",
    protected: true,
    layout: EmptyLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/logout",
    protected: true,
    layout: EmptyLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/forgot-password",
    protected: false,
    layout: EmptyLayout,
    component: ForgotPassword
  },
  {
    path: "/password-reset",
    protected: false,
    layout: EmptyLayout,
    component: PasswordReset
  },
  {
    path: "/customer-registration",
    protected: false,
    layout: EmptyLayout,
    component: CustomerRegistration
  },
  {
    path: "/shop-registration",
    protected: false,
    layout: EmptyLayout,
    component: ShopRegistration
  },
  {
    path: "/fleet-registration",
    protected: false,
    layout: EmptyLayout,
    component: FleetRegistration
  },
  {
    path: "/login",
    protected: false,
    layout: EmptyLayout,
    component: Login
  },
  {
    path: "/f/register",
    protected: false,
    layout: EmptyLayout,
    component: FleetMemberRegistration
  },
  {
    path: "/profile",
    protected: true,
    layout: DefaultLayout,
    component: Profile
  },
  {
    path: "/notifications",
    protected: true,
    layout: DefaultLayout,
    component: AllNotifications
  },
  {
    path: "/top-up",
    protected: true,
    layout: DefaultLayout,
    component: TopUp
  },
  {
    path: "/settings",
    protected: true,
    layout: DefaultLayout,
    component: ManageProfile
  },
  {
    path: "/dashboard",
    protected: true,
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/appointments",
    protected: true,
    layout: DefaultLayout,
    component: Appointments
  },
  {
    path: "/appointment/:id",
    protected: true,
    layout: DefaultLayout,
    component: Appointment
  },
  {
    path: "/requests",
    protected: true,
    layout: DefaultLayout,
    component: Requests
  },
  {
    path: "/estimates",
    protected: true,
    layout: DefaultLayout,
    component: Estimates
  },
  {
    path: "/shops",
    protected: true,
    layout: DefaultLayout,
    component: Shops
  },
  {
    path: "/shop/:slug",
    protected: true,
    layout: DefaultLayout,
    component: Shop
  },
  {
    path: "/shop/:slug/manage",
    protected: true,
    layout: DefaultLayout,
    component: ManageShop
  },
  {
    path: "/shop/:slug/documents",
    protected: true,
    layout: DefaultLayout,
    component: ShopDocuments
  },
  {
    path: "/services/corrective",
    protected: true,
    layout: DefaultLayout,
    component: CorrectiveServices
  },
  {
    path: "/services/preventive",
    protected: true,
    layout: DefaultLayout,
    component: PreventiveServices
  },
  {
    path: "/services/preventive/mileage-:mileage",
    protected: true,
    layout: DefaultLayout,
    component: ManagePreventiveServices
  },
  {
    path: "/services/preventive/service-:type",
    protected: true,
    layout: DefaultLayout,
    component: ManageOtherServices
  },
  {
    path: "/cars",
    protected: true,
    layout: DefaultLayout,
    component: CarProfiles
  },
  {
    path: "/cars/new",
    protected: true,
    layout: DefaultLayout,
    component: CarRegistration
  },
  {
    path: "/car/:id/schedule",
    protected: true,
    layout: DefaultLayout,
    component: CarSchedules
  },
  {
    path: "/members",
    protected: true,
    layout: DefaultLayout,
    component: UsersManagement
  },
  {
    path: "/system/users",
    protected: true,
    layout: DefaultLayout,
    component: UsersManagement
  },
  {
    path: "/system/shops",
    protected: true,
    layout: DefaultLayout,
    component: ShopsManagement
  },
  {
    path: "/system/shop/:slug/requirements",
    protected: true,
    layout: DefaultLayout,
    component: ShopDocumentsManagement
  },
  {
    path: "/system/reports",
    protected: true,
    layout: DefaultLayout,
    component: Maintenance
  },
  {
    path: "/loyalty",
    protected: true,
    layout: DefaultLayout,
    component: Maintenance
  },
  {
    path: "/promotions",
    protected: true,
    layout: DefaultLayout,
    component: Maintenance
  },
  {
    path: "/referrals",
    protected: true,
    layout: DefaultLayout,
    component: Maintenance
  },
  {
    // 404 - error page
    path: null,
    layout: EmptyLayout,
    component: ErrorPage
  }
];

export default routes;
