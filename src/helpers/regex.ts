const regex = {
  password: /^(?=.*[0-9])(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[!@#])[a-zA-Z0-9!@#]{8,64}$/,
  mobileIran: /^09[0-9]{9}$/i,
  mobilePersian: /^[\u06F0][\u06F0-\u06F9]{3}[\u06F0-\u06F9]{3}[\u06F0-\u06F9]{4}/,
  nationalId: /^[0-9]{10}$/g,
  // phone: '',
  activateCode: /^[0-6]*$/i,
  number: /^-?\d*(\.\d+)?$/,
  integer: /^\d+$/,
  mobile: /^((\+|00)?\d{1,3})?[1-9][0-9]{9}$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
  website:
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
  zipCode: '',
  smsCode: /^\d{6}$/,
  email:
    /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+.{0,1})+[^<>().,;:\s@"]{2,})$/,
};
export default regex;
