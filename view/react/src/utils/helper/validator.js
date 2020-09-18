import { isEmail, isNumeric, matches } from 'validator';
import { MIN_PASSWORD_LENGTH, REGEX_SHOP_NAME_MATCH } from '../constants';

const isValidEmail = email => email !== null && isEmail(email);

const isValidMobileNumber = mobileNumber =>
  mobileNumber !== undefined &&
  mobileNumber !== null &&
  mobileNumber.length === 10 &&
  isNumeric(mobileNumber);

const isValidName = name => name !== null && name.length > 0;

const isValidPassword = (password, confirmPassword) =>
  password !== null &&
  confirmPassword !== null &&
  password === confirmPassword &&
  password.length >= MIN_PASSWORD_LENGTH;

const isValidPreferredSchedules = preferredSchedules => {
  let validated = true;

  for (let i = 0; validated && i < preferredSchedules.length; i++) {
    const { date, time } = preferredSchedules[i];
    validated = date !== undefined && time !== undefined;
  }

  return validated;
};

const isValidReplacementTypes = (replacements, replacementTypes) => {
  let validated = true;

  for (let i = 0; validated && i < replacements.length; i++) {
    validated = replacementTypes[replacements[i]] !== undefined;
  }

  return validated;
};

const isValidCompanyName = shopName =>
  (shopName =
    shopName !== undefined &&
    shopName !== null &&
    matches(shopName, REGEX_SHOP_NAME_MATCH));

export default {
  isValidEmail,
  isValidMobileNumber,
  isValidName,
  isValidPassword,
  isValidPreferredSchedules,
  isValidReplacementTypes,
  isValidCompanyName
};
