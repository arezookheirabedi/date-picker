import qs from 'qs';
import { AxiosResponse } from 'axios';
import { History } from 'history';
import EPUBLICROUTE from 'src/constants/PublicRoute.enum';
import request from 'src/helpers/request';
import { removeToken } from 'src/helpers/utils';
import { IapiResponsecaptcha } from 'src/models/service.model';
import { IInitialLogin, ILogin } from '../models/authentication.model';
import { IResponseCaptcha } from '../models/captcha.model';


function captcha(): Promise<IapiResponsecaptcha<IResponseCaptcha>> {
  return request
    .forFastUrl()
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().post(`/public/v1/fs/captcha?lang=fa`);
}

function login(params: any): Promise<AxiosResponse<IInitialLogin>> {
  return request.forFastUrl()
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().post(`/public/v1/fs/users/registration/init/guild-owner?lang=fa`, params);
}

function token(params: any): Promise<AxiosResponse<ILogin>> {
  return request.forFastUrl()
    .withHeaders({ "Content-Type": "application/x-www-form-urlencoded;utf-8" })
    .build().post(`/oauth/token?lang=fa`, qs.stringify(params));
}

function sendActivateCode(params: any): Promise<AxiosResponse<ILogin>> {
  return request.forFastUrl()
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().post(`/public/v1/fs/users/registration/finalize/guild-owner?lang=fa`, params);
}


const logout: (history?: History) => void = history => {
  removeToken();
  localStorage.removeItem('userinfo');

  if (history) history.push(EPUBLICROUTE.REGISTER);
};

export default {
  captcha,
  logout,
  login,
  token,
  sendActivateCode,
};
