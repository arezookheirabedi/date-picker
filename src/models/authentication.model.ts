export interface ILogin {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}
export interface ILoginForm {
  captchaCode: string;
  username: string;
  password: string;
}
export interface IProfile{
  birthday: string
  categoryId: string
  firstName: string
  guildCode: string
  id: string
  lastName: string
  nationalId: string
  qrCode: string
  roles: string[]
}