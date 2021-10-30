export interface IapiResponse<T> {
  data: { code: number; data: T; msg: string; status: number };
}

export interface IapiResponseWithoutData<T> {
  code: number;
  data: T;
  msg: string;
  status: number;
  message?: string;
}

export interface IapiResponsecaptcha<T> {
  data: T
}