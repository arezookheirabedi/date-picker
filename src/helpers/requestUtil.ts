import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import {ILogin} from 'src/models/authentication.model';
import authenticateService from 'src/services/authentication.service';
import {getToken, setRequestConfig, setToken} from './utils';

let isRefreshing: boolean = false;
let failedQueue: Array<any> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const instance: AxiosInstance = axios.create({
  timeout: 60000,
  headers: {
    'Accept-Language': 'fa',
  },
});

interface IRequest {
  baseUrl: string;
  headers?: {};
}

class Request {
  private readonly self: IRequest;

  constructor(baseUrl: string, headers?: {}) {
    this.self = {
      baseUrl,
      headers,
    };
  }

  post: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return instance({
      url,
      data,
      method: 'POST',
      headers: this.self.headers,
    });
  };

  get: (endpoint: string, params?: any, config?: any) => AxiosPromise<any> = (endpoint, params, config) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return instance({
      url,
      params,
      method: 'GET',
      headers: this.self.headers,
      ...config
    });
  };

  put: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return instance({
      url,
      data,
      method: 'PUT',
      headers: this.self.headers,
    });
  };

  patch: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return instance({
      url,
      data,
      method: 'PATCH',
      headers: this.self.headers,
    });
  };

  delete: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return instance({
      url,
      data,
      method: 'DELETE',
      headers: this.self.headers,
    });
  };
}

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const tokens = getToken();
    const {url} = config;

    const newConfig: AxiosRequestConfig = config;
    if (url?.startsWith("/api") || url?.startsWith(`${process.env.REACT_APP_BASE_URL}/api`)) {
      if (!tokens) window.location.href = '/';

      newConfig.headers.Authorization = `Bearer ${tokens!.access_token}`;
      setRequestConfig({
        headers: {Authorization: `Bearer ${tokens!.access_token}`},
      });
    } else if (url?.startsWith("/oauth") || url?.startsWith(`${process.env.REACT_APP_BASE_URL}/oauth`)) {
      setRequestConfig({
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
          )}`,
        },
      });
      newConfig.headers.Authorization = `Basic ${btoa(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
      )}`;
    }

    return newConfig;
    // Do something before request is sent
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    response,
  error => {

    const newConfig = error.config;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error


    if (axios.isCancel(error)) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        reject({
          errors: null,
          fingerPrint: null,
          message: 'cancel',
        });
      });
    }


    if (!error.response) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        reject({
          errors: null,
          fingerPrint: null,
          message: 'خطا در ارتباط با سرور',
        });
      });
    }


    if (newConfig.url?.startsWith(`${process.env.REACT_APP_BASE_URL}/public`) || (error.response && error.response.status !== 401)) {
      return new Promise((resolve, reject) => {
        if (error.response.data) reject(error.response.data);
        else {
          // eslint-disable-next-line
          reject({
            errors: null,
            fingerPrint: null,
            message: error.response.statusText,
          });
        }
      });
    }

    // Return any error which is not due to authentication back to the calling service
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject});
      })
        .then(token => {
          newConfig.headers.Authorization = `Bearer ${token}`;
          return axios(newConfig);
        })
        .catch(err => Promise.reject(err));
    }

    newConfig.retry = true;
    isRefreshing = true;

    const tokens: ILogin | null = getToken();


    if (!tokens!.refresh_token) {
      authenticateService.logout();
      return Promise.reject(error);
    }
    return authenticateService
      .token({
        scope: tokens!.scope,
        refresh_token: tokens!.refresh_token,
        grant_type: 'refresh_token',
      })
      .then((res: any) => {
        setToken(res.data);
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
        newConfig.headers.Authorization = `Bearer ${res.data.access_token}`;
        processQueue(null, res.data.access_token);
        return new Promise((resolve, reject) => {
          axios
            .request(newConfig)
            .then(response => {
              resolve(response);
            })
            .catch(err => {
              reject(err);
            });
        })
          .catch(err => {
            processQueue(err, null);
          })
          .finally(() => {
            isRefreshing = false;
          });
      })
      .catch(() => {
        authenticateService.logout();
      });
  }
);

export default Request;
