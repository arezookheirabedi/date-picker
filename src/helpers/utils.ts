import Axios, {AxiosRequestConfig, CancelTokenSource} from 'axios';
import dayjs from 'dayjs';
import Setup from 'src/config/setup';
import EHEADER from 'src/constants/headerRequest.enum';
import {ILogin, IProfile} from 'src/models/authentication.model';

const baseUrl = Setup.endpoint;

let axiosRequestConfig: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json;utf-8',
  },
};

export const setRequestConfig: (config: AxiosRequestConfig) => AxiosRequestConfig = config => {
  let newHeader = config.headers;
  if (newHeader) {
    newHeader = {
      ...axiosRequestConfig.headers,
      ...config.headers,
    };
  }
  axiosRequestConfig = {...axiosRequestConfig, ...config};

  return {...axiosRequestConfig, ...config};
};

export const setMediaTypeConfig: (config: EHEADER) => void = config => {
  switch (config) {
    case EHEADER.HEADER_JSON:
      setRequestConfig({
        headers: {'Content-Type': 'application/json;utf-8'},
      });
      break;
    case EHEADER.HEADER_MULTIPART:
      setRequestConfig({
        headers: {'Content-Type': 'multipart/form-data;utf-8'},
      });
      break;
    case EHEADER.HEADER_URL_ENCODE:
      setRequestConfig({
        headers: {'Content-Type': 'application/x-www-form-urlencoded;utf-8'},
      });
      break;
    default:
      setRequestConfig({
        headers: {'Content-Type': 'application/json;utf-8'},
      });
      break;
  }
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const setLogin: (param: IProfile) => void = param => {
  localStorage.setItem('ministers-userinfo', JSON.stringify(param));
};

export const getToken: () => ILogin = () => {
  const token = localStorage.getItem('ministers-token');
  const tokenObj = JSON.parse(token!);
  return tokenObj;
};

export const setToken: (token: ILogin) => void = token => {
  const newToken = JSON.stringify({
    access_token: token.access_token,
    expire: token.expires_in,
    refresh_token: token.refresh_token,
    expires_in: token.expires_in,
    scope: token.scope,
  });
  localStorage.setItem('ministers-token', newToken);
};

export const removeToken: () => void = () => {
  localStorage.removeItem('ministers-token');
  localStorage.removeItem('ministers-userinfo');
};

export const msgRequestCanceled = 'Operation canceled by the user.';
export const cancelTokenSource = (): CancelTokenSource => {
  return Axios.CancelToken.source();
};

export const convertGregorianDateToObjectDate = (date: any, calendar?: 'gregory' | 'jalali') => {
  if (!date) return null;
  const d = dayjs(new Date(date));

  return {
    year: Number(d.calendar(calendar || 'jalali').format('YYYY')),
    month: Number(d.calendar(calendar || 'jalali').format('MM')),
    day: Number(d.calendar(calendar || 'jalali').format('DD')),
  };
};

export const convertGregorianDateToJalaliDate = (date: any) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const onPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  let mainKey = event.key;
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (persianNumbers.includes(mainKey)) {
    mainKey = persianNumbers.indexOf(mainKey).toString();
  }
  if (!keys.includes(mainKey)) {
    event.preventDefault();
  } else {
    // const englishNumber = persianNumbers.includes(mainKey)
    //   ? persianNumbers.indexOf(mainKey)
    //   : mainKey;
    return mainKey;
  }
  return false;
};

export const fixNumbers = (e: any) => {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  let str = e.value;
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i += 1) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }

  return str;
};

export const toPersianDigit = (str: any) => {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w: any) => id[+w]);
};

export function isLogin() {
  const profileStr = localStorage.getItem('ministers-userinfo');
  const tokenStr = localStorage.getItem('ministers-token');
  const firstLogin = localStorage.getItem('ministers-first-login');
  if (tokenStr && firstLogin) {
    if (new Date().getTime() > Number(firstLogin) + 24 * 60 * 60 * 1000) {
      removeToken();
      // eslint-disable-next-line
      console.log('on day finished');
      return false;
    }
    const token: ILogin = JSON.parse(tokenStr);

    if (token.access_token) {
      const profile = JSON.parse(profileStr || '{}');
      // eslint-disable-next-line
      const payload = parseJwt(token.access_token);
      localStorage.setItem(
        'ministers-userinfo',
        JSON.stringify({...profile, roles: payload.authorities || []})
        // JSON.stringify({...profile, roles: ["ROLE_ADMIN_HEALTH"] || []})
      );
    }

    if (token && token.access_token.length > 0) {
      return true;
    }
  }
  return false;
}

export const getBgColorGradientByStatus = (status: string) => {
  let bg = 'linear-gradient(217deg, #B2B2B2 0%, #D5D5D5 100%)';
  if (status === 'DISQUALIFIED') {
    bg = 'linear-gradient(217deg, #8F0001 0%,  #CB0002 100%)';
  } else if (status === 'CONDITIONAL_QUALIFIED') {
    bg = 'linear-gradient(217deg, #E96F04 0%, #FF983E 100%)';
  } else if (status === 'QUALIFIED') {
    bg = 'linear-gradient(217deg, #039572 0%, #49C9AB 100%)';
  }

  return bg;
};

export const getServiceTypeName = (item: any) => {
  switch (item) {
    case 'PUBLIC':
      return 'تاکسی پلاک ع';
    case 'TAXI_T':
      return 'تاکسی پلاک ت';
    case 'ONLINE':
      return 'تاکسی آنلاین';
    case 'MOTOR_PEYK':
      return 'موتور سیکلت';
    case 'SCHOOL_SERVICE':
      return 'سرویس مدارس';
    case 'AGENCIES_UNDER_THE_SUPERVISION_OF_THE_MUNICIPALITY':
      return 'آژانس های تحت نظارت شهرداری';
    case 'GUILD_AGENCIES':
      return 'آژانس های صنفی';
    case 'BUS_DRIVING':
      return 'اتوبوسرانی';
    case 'BIKE_DELIVERY':
      return 'پیک موتوری';
    case 'SUBURBAN_TAXI':
      return 'تاکسی برون شهری';
    case 'IN_CITY_TAXI':
      return 'تاکسی درون شهری';
    case 'CARGO_FLEET':
      return 'ناوگان باری';
    case 'ONLINE_TAXI':
      return 'تاکسی اینترنتی';
    case 'SAMAS':
      return 'سماس';
    default:
      return null;
  }
};

export const getColorByServiceTypeName = (item: any) => {
  switch (item) {
    case 'تاکسی اینترنتی':
      return '#4EC4F2';
    case 'ناوگان باری':
      return '#9D19FA';
    case 'تاکسی درون شهری':
      return '#049975';
    case 'آژانس های صنفی':
      return '#ffc400';
    case 'سرویس مدارس':
      return '#ff2a00';
    case 'آژانس های تحت نظارت شهرداری':
      return '#9696ff';
    case 'پیک موتوری':
      return '#00fff7';
    case 'تاکسی برون شهری':
      return '#00bd13';
    case 'اتوبوسرانی':
      return '#9e967d';
    default:
      return 'brown';
  }
  // switch (item) {
  //   case 'AGENCIES_UNDER_THE_SUPERVISION_OF_THE_MUNICIPALITY':
  //     return '#4EC4F2';
  //   case 'GUILD_AGENCIES':
  //     return '#9D19FA';
  //   case 'BUS_DRIVING':
  //     return '#049975';
  //   case 'BIKE_DELIVERY':
  //     return '#ffc400';
  //   case 'SUBURBAN_TAXI':
  //     return '#ff2a00';
  //   case 'IN_CITY_TAXI':
  //     return '#9696ff';
  //   case 'CARGO_FLEET':
  //     return '#00fff7';
  //   case 'ONLINE_TAXI':
  //     return '#00bd13';
  //   case 'SAMAS':
  //     return '#9e967d';
  //   case 'SCHOOL_SERVICE':
  //     return '#ff00bf';
  //   default:
  //     return 'brown';
  // }
};

export const transportationTypes = [
  {
    name: 'کل حمل و نقل',
    enName: null,
  },
  {
    name: 'تاکسی آنلاین',
    enName: 'ONLINE',
  },
  {
    name: 'تاکسی پلاک ع',
    enName: 'PUBLIC',
  },
  {
    name: 'تاکسی پلاک ت',
    enName: 'TAXI_T',
  },
  {
    name: 'پیک موتوری',
    enName: 'MOTOR_PEYK',
  },
  {
    name: 'سرویس مدارس',
    enName: 'SCHOOL_SERVICE',
  },
  {
    name: 'آژانس',
    enName: 'GUILD_AGENCIES',
  },
  {
    name: 'اتوبوسرانی',
    enName: 'BUS_DRIVING',
  },
  {
    name: 'پیک موتوری',
    enName: 'BIKE_DELIVERY',
  },
  {
    name: 'تاکسی برون شهری',
    enName: 'SUBURBAN_TAXI',
  },
  {
    name: 'تاکسی درون شهری',
    enName: 'IN_CITY_TAXI',
  },
  {
    name: 'ناوگان باربری',
    enName: 'CARGO_FLEET',
  },
  {
    name: 'تاکسی آنلاین',
    enName: 'ONLINE_TAXI',
  },
  {
    name: 'سماس',
    enName: 'SAMAS',
  },
  {
    name: 'سازمان های زیر نظر شهرداری',
    enName: 'AGENCIES_UNDER_THE_SUPERVISION_OF_THE_MUNICIPALITY',
  },
];

export const sideCities = [
  {
    name: 'تهران',
    color: '#FBE186',
  },
  {
    name: 'هرمزگان',
    color: '#FBE186',
  },
  {
    name: 'بوشهر',
    color: '#FBE186',
  },
  {
    name: 'کهگیلویه و بویراحمد',
    color: '#FBE186',
  },
  {
    name: 'فارس',
    color: '#FBE186',
  },
  {
    name: 'اصفهان',
    color: '#FBE186',
  },
  {
    name: 'سمنان',
    color: '#FBE186',
  },
  {
    name: 'گلستان',
    color: '#FBE186',
  },
  {
    name: 'مازندران',
    color: '#FBE186',
  },
  {
    name: 'مرکزی',
    color: '#FBE186',
  },
  {
    name: 'یزد',
    color: '#FBE186',
  },
  {
    name: 'چهارمحال و بختیاری',
    color: '#FBE186',
  },
  {
    name: 'خوزستان',
    color: '#FBE186',
  },
  {
    name: 'لرستان',
    color: '#FBE186',
  },
  {
    name: 'ایلام',
    color: '#FBE186',
  },
  {
    name: 'اردبیل',
    color: '#FBE186',
  },
  {
    name: 'قم',
    color: '#FBE186',
  },
  {
    name: 'همدان',
    color: '#FBE186',
  },
  {
    name: 'زنجان',
    color: '#FBE186',
  },
  {
    name: 'قزوین',
    color: '#FBE186',
  },
  {
    name: 'آذربایجان غربی',
    color: '#FBE186',
  },
  {
    name: 'آذربایجان شرقی',
    color: '#FBE186',
  },
  {
    name: 'کرمانشاه',
    color: '#FBE186',
  },
  {
    name: 'گیلان',
    color: '#FBE186',
  },
  {
    name: 'کردستان',
    color: '#FBE186',
  },
  {
    name: 'خراسان جنوبی',
    color: '#FBE186',
  },
  {
    name: 'خراسان رضوی',
    color: '#FBE186',
  },
  {
    name: 'خراسان شمالی',
    color: '#FBE186',
  },
  {
    name: 'سیستان و بلوچستان',
    color: '#FBE186',
  },
  {
    name: 'کرمان',
    color: '#FBE186',
  },
  {
    name: 'البرز',
    color: '#FBE186',
  },
];

export const sidesCities = [
  {
    name: 'همه',
    color: '#ccc',
  },
  {
    name: 'تهران',
    color: '#ccc',
  },
  {
    name: 'هرمزگان',
    color: '#ccc',
  },
  {
    name: 'بوشهر',
    color: '#ccc',
  },
  {
    name: 'کهگیلویه و بویراحمد',
    color: '#ccc',
  },
  {
    name: 'فارس',
    color: '#ccc',
  },
  {
    name: 'اصفهان',
    color: '#ccc',
  },
  {
    name: 'سمنان',
    color: '#ccc',
  },
  {
    name: 'گلستان',
    color: '#ccc',
  },
  {
    name: 'مازندران',
    color: '#ccc',
  },
  {
    name: 'مرکزی',
    color: '#ccc',
  },
  {
    name: 'یزد',
    color: '#ccc',
  },
  {
    name: 'چهارمحال و بختیاری',
    color: '#ccc',
  },
  {
    name: 'خوزستان',
    color: '#ccc',
  },
  {
    name: 'لرستان',
    color: '#ccc',
  },
  {
    name: 'ایلام',
    color: '#ccc',
  },
  {
    name: 'اردبیل',
    color: '#ccc',
  },
  {
    name: 'قم',
    color: '#ccc',
  },
  {
    name: 'همدان',
    color: '#ccc',
  },
  {
    name: 'زنجان',
    color: '#ccc',
  },
  {
    name: 'قزوین',
    color: '#ccc',
  },
  {
    name: 'آذربایجان غربی',
    color: '#ccc',
  },
  {
    name: 'آذربایجان شرقی',
    color: '#ccc',
  },
  {
    name: 'کرمانشاه',
    color: '#ccc',
  },
  {
    name: 'گیلان',
    color: '#ccc',
  },
  {
    name: 'کردستان',
    color: '#ccc',
  },
  {
    name: 'خراسان جنوبی',
    color: '#ccc',
  },
  {
    name: 'خراسان رضوی',
    color: '#ccc',
  },
  {
    name: 'خراسان شمالی',
    color: '#ccc',
  },
  {
    name: 'سیستان و بلوچستان',
    color: '#ccc',
  },
  {
    name: 'کرمان',
    color: '#ccc',
  },
  {
    name: 'البرز',
    color: '#ccc',
  },
];
