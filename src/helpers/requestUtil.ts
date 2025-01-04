import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ILogin } from 'src/models/authentication.model';
import { getToken, setRequestConfig, setToken } from './utils';

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

export const instanceMock: AxiosInstance = axios.create({
  timeout: 60000,
  headers: {
    'Accept-Language': 'fa',
  },
});

export const instanceMockAdapter = new AxiosMockAdapter(instanceMock, { delayResponse: 3000 });

interface IRequest {
  baseUrl: string;
  headers?: {};
  instance: AxiosInstance;
}

class Request {
  private readonly self: IRequest;

  constructor(baseUrl: string, headers?: {}, axiosInstance?: AxiosInstance) {
    this.self = {
      baseUrl,
      headers,
      instance: axiosInstance || instance
    };
  }

  post: (endpoint: string, data?: any, config?: any) => AxiosPromise<any> = (endpoint, data, config) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return this.self.instance({
      url,
      data,
      method: 'POST',
      headers: this.self.headers,
      ...config

    });
  };

  get: (endpoint: string, params?: any, config?: any) => AxiosPromise<any> = (endpoint, params, config) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return this.self.instance({
      url,
      params,
      method: 'GET',
      headers: this.self.headers,
      ...config
    });
  };

  put: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return this.self.instance({
      url,
      data,
      method: 'PUT',
      headers: this.self.headers,
    });
  };

  patch: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return this.self.instance({
      url,
      data,
      method: 'PATCH',
      headers: this.self.headers,
    });
  };

  delete: (endpoint: string, data?: any) => AxiosPromise<any> = (endpoint, data) => {
    const url = `${this.self.baseUrl}${endpoint}`;
    return this.self.instance({
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
    const { url } = config;

    const newConfig: AxiosRequestConfig = config;
    if (url?.startsWith("/api") || url?.startsWith(`${process.env.REACT_APP_BASE_URL}/api`)) {
      if (!tokens) window.location.href = '/';

      newConfig.headers.Authorization = `Bearer ${tokens!.access_token}`;
      setRequestConfig({
        headers: { Authorization: `Bearer ${tokens!.access_token}` },
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
        failedQueue.push({ resolve, reject });
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
      return Promise.reject(error);
    }
 
         
     return"dddd"
    
  }
);

export default Request;
