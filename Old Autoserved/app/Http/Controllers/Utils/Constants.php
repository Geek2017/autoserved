<?php
namespace App\Http\Controllers\Utils;

class Constants
{
    // Maps
    const GOOGLE_API_KEY = "";

    // Email subjects
    const EMAIL_REGISTRATION = "Welcome to AutoServed! Verify your account";
    const EMAIL_FORGOT_PASSWORD = "Forgot your password?";

    // Car Schedule
    const PMS_MAX_MONTHS_INTERVAL_FLEET = 3;
    const PMS_MAX_MONTHS_INTERVAL_CUSTOMER = 6;
    const PMS_MAX_MILEAGE = 100000;
    const PMS_INTERVAL_MILEAGE = 5000;

    // Shop Status
    const SHOP_STATUS_PENDING = "pending";
    const SHOP_STATUS_CONFIRMED = "confirmed";
    const SHOP_STATUS_VERIFIED3 = "verified3";
    const SHOP_STATUS_VERIFIED2 = "verified2";
    const SHOP_STATUS_VERIFIED1 = "verified1";

    // Request Type
    const REQUEST_TYPE_PMS = "preventive";
    const REQUEST_TYPE_SERVICES = "corrective";
    const REQUEST_TYPE_OTHER_SERVICES = "other services";

    // Request Job Status
    const REQUEST_STATUS_OPEN = "open";
    const REQUEST_STATUS_CLOSED = "closed";
    const REQUEST_STATUS_ACCEPTED = "accepted";

    // Document Types
    const DOCUMENT_TYPE_AVATAR = 'avatar';
    const DOCUMENT_TYPE_BANNER = 'banner';
    const DOCUMENT_TYPE_BIR_CERTIFICATE = 'bir_cert';
    const DOCUMENT_TYPE_BUSINESS_PERMIT = 'permit';
    const DOCUMENT_TYPE_BUSINESS_REGISTRATION = 'biz_reg';

    // Shop Activation requirements
    const SHOP_ACTIVATION_REQ_BIZ_REG = 'biz_reg';
    const SHOP_ACTIVATION_REQ_BIZ_PERMIT = 'permit';
    const SHOP_ACTIVATION_REQ_BIR_CERT = 'bir_cert';
    const SHOP_ACTIVATION_REQ_MERCH_CERT = 'merch_cert';
    const SHOP_ACTIVATION_REQ_SHOP_SIZE = 'shop_size';
    const SHOP_ACTIVATION_REQ_LIFTERS = 'lifters';
    const SHOP_ACTIVATION_REQ_SPECIAL_TOOLS = 'tools';

    // Shop Status
    const SHOP_STATUS_VERIFIED = 'Verified';
    const SHOP_STATUS_AUTHENTICATED = 'Authenticated';
    const SHOP_STATUS_DELETED = 'Deleted';

    // Shop points
    const SHOP_POINTS_VERIFIED = 100;
    const SHOP_POINTS_MIN_AUTH = 30;

    // Shop points
    const SHOP_POINTS_BUSINESS_REGISTRATION = 25;
    const SHOP_POINTS_BUSINESS_PERMIT = 25;
    const SHOP_POINTS_BIR_CERTIFICATE = 25;
    const SHOP_POINTS_MERCHANT_CERTIFICATE = 10;
    const SHOP_POINTS_LIFTERS = 5;
    const SHOP_POINTS_SPECIAL_TOOLS = 10;

    // Payment Methods
    const PAYMENT_METHOD_CASH = 'cash';
    const PAYMENT_METHOD_CARD = 'credit card';

    // ---- ESTIMATES ----
    const ESTIMATE_TIMER_DURATION_IN_MINUTES = 10;
    const ESTIMATE_AMOUNT_MULTIPLER = 1;

    // database formats
    const DATE_FORMAT = "Y-m-d";
    const DATETIME_FORMAT = "Y-m-d H:i:s";

    // payment gateway
    const PAYMENT_GATEWAY_PAYPAL = 'paypal';
    const PAYMENT_GATEWAY_DRAGONPAY = 'dragonpay';

    // ---- MESSAGES ----
    const INFO_MSG_SERVICE_EXISTS = "Service already exists.";
    const INFO_MSG_LIST_EMPTY = "No records found.";

    const ERROR_MSG_SQL_EXCEPTION_DELETE = "Unable to delete record.";
    const ERROR_MSG_SQL_EXCEPTION_SAVE = "Error saving into the database.";
    const ERROR_MSG_ACCESS_DENIED_VENDOR = "Access denied. Shop owners do not have access to his feature.";
    const ERROR_MSG_GENERIC = "An unexpected error has occurred. Please try again later.";
    const ERROR_MSG_INVALID_PARAMS = "Invalid parameters provided. Please try again later.";
    const ERROR_MSG_NO_ACCESS = "You are not allowed to access this resource.";
}
