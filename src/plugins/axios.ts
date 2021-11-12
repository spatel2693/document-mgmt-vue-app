import axios from 'axios';
import Vue from 'vue';
import { config } from 'vue/types/umd';

// import AppStore from '@/store/modules/app/app';
// import AuthStore from '@/store/modules/auth/auth';
// import { getBaseURL } from '@/helpers';

const api = axios.create({
  baseURL: 'http://localhost:8090/api/',
});

/* REQUEST HANDLER */
api.interceptors.request.use(
  (req) => {
    // const token = AuthStore.getAccessToken;
    // if (req.url) {
    // }
    // if (token) {
    //   req.headers.authorization = `Bearer ${token}`;
    //   req.headers['content-type'] = 'application/json';
    // }
    return req;
  },
  (error) => Promise.reject(error),
);

/* RESPONSE HANDLER */
api.interceptors.response.use(
  (res) => {
    // if (res.config && res.config.url) {
    //   const loaderKey = `${res.config.method}_${res.config.url.split('/')[1]}${
    //     res.config.url.split('/')[2] && res.config.url.split('/')[2].length < 15
    //       ? `${'_'}` + res.config.url.split('/')[2]
    //       : ''
    //   }`;
    //   if (loaderKey === 'put_shoppingcart') {
    //     AppStore.setLoaderMap({ loaderKey: 'shoppingcart_loader', val: false });
    //   }
    //   AppStore.setLoaderMap({ loaderKey, val: false });
    // }
    return res;
  },
  (error) => {
    console.log(`Response ========== ${JSON.stringify(error)} ====`);
    // if (error.response && error.response.status === 401) {
    //   AuthStore.logout();
    //   // TODO: toast error here with exit status
    //   AuthStore.setExitStatus('Your login has expired, please login again to continue.');
    // }
    return Promise.reject(error);
  },
);

Vue.prototype.api = api;
export default api;
