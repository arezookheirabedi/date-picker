import qs from 'qs';
import {AxiosResponse} from 'axios';
import request from 'src/helpers/request';
import {removeToken} from 'src/helpers/utils';
import {History} from 'history';
// import EPUBLICROUTE from 'src/constants/PublicRoute.enum';

import {IapiResponsecaptcha} from 'src/models/service.model';
import {ILogin} from '../models/authentication.model';

// import { IResponseCaptcha } from '../models/captcha.model';


function captcha(): Promise<IapiResponsecaptcha<any>> {
  return request
    .withHeaders({"Content-Type": "application/json;utf-8"})
    .build().post(`/public/v1/fs/captcha?lang=fa`);
}

function login(params: any): Promise<AxiosResponse<any>> {
  return request.withHeaders({"Content-Type": "application/x-www-form-urlencoded;utf-8"}).build().post(`/public/v1/fs/token?lang=fa`, qs.stringify(params));
}

function token(params: any): Promise<AxiosResponse<ILogin>> {
  return request
    .withHeaders({"Content-Type": "application/x-www-form-urlencoded;utf-8"})
    .build().post(`/oauth/token?lang=fa`, qs.stringify(params));
}


const logout: (history?: History) => void = () => {
  try {
    removeToken();
  } catch (e: any) {
    // console.log(e);
    window.location.href = "/";
  } finally {
    window.location.href = "/";
  }
};

export default {
  captcha,
  logout,
  login,
  token
};
