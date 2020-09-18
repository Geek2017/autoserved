import { APP_API_JSON_TYPE } from '../constants';

export default token => {
  let headerData = {
    Accept: APP_API_JSON_TYPE,
    'Content-Type': APP_API_JSON_TYPE
  };

  if (token) {
    headerData = {
      ...headerData,
      Authorization: `Bearer ${token}`
    };
  }

  return headerData;
};
