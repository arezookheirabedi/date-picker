export interface ILogin {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}
export interface IInitialLogin {
  data: any
}

export interface IInitialLoginForm {
  captcha: {
    code: string;
    id: string;
  },
  mobileNumber: string;
  nationalId: string;
}
export interface ISendActivat {
  activationCode: string;
  mobileNumber: string
}

export interface IProfile {
  birthday: string
  categoryId: string
  firstName: string
  guildCode: string
  id: string
  lastName: string
  nationalId: string
  qrCode: string
}