import qs from 'qs';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import request from 'src/helpers/request';
import {removeToken} from 'src/helpers/utils';
import {History} from 'history';
// import EPUBLICROUTE from 'src/constants/PublicRoute.enum';

import {IapiResponsecaptcha} from 'src/models/service.model';
import {ILogin} from '../models/authentication.model';

// import { IResponseCaptcha } from '../models/captcha.model';

function captcha(): Promise<IapiResponsecaptcha<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/public/v1/fs/captcha?lang=fa`);
}

function login(params: any): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/x-www-form-urlencoded;utf-8'})
    .build()
    .post(`/public/v1/fs/token?lang=fa`, qs.stringify(params));
}

function token(params: any): Promise<AxiosResponse<ILogin>> {
  return request
    .withHeaders({'Content-Type': 'application/x-www-form-urlencoded;utf-8'})
    .build()
    .post(`/oauth/token?lang=fa`, qs.stringify(params));
}
function resetPassword(params: any): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/fs/users/reset-password/request/self?lang=fa`, params);
}
function confirmPassword(params: any): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/fs/users/reset-password/confirm/self?lang=fa`, params);
}

const logout: (history?: History) => void = () => {
  try {
    removeToken();
  } catch (e: any) {
    // console.log(e);
    window.location.href = '/';
  } finally {
    window.location.href = '/';
  }
};

function rolePermision(params: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/fs/report-viewers/role-permissions`, params, {...config});
}

function getResources(params: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/fs/resource-views`, params, {...config});
}

function users(params: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/fs/users`, params, {...config});
}
export default {
  captcha,
  logout,
  login,
  token,
  resetPassword,
  confirmPassword,
  rolePermision,
  getResources,
  users,
};
