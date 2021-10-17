import axios from 'axios';

import { APP_API_BASE_URL, APP_API_TIMEOUT } from '../constants';

axios.defaults.baseURL = APP_API_BASE_URL;
axios.defaults.headers.common['Accept'] = APP_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = APP_API_BASE_URL;
axios.defaults.timeout = APP_API_TIMEOUT;

export default axios;
