import { AxiosRequestConfig } from 'axios';
import Setup from 'src/config/setup';
import EHEADER from 'src/constants/headerRequest.enum';
import { ILogin, IProfile } from 'src/models/authentication.model';


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
  axiosRequestConfig = { ...axiosRequestConfig, ...config };

  return { ...axiosRequestConfig, ...config };
};

export const setMediaTypeConfig: (config: EHEADER) => void = config => {
  switch (config) {
    case EHEADER.HEADER_JSON:
      setRequestConfig({
        headers: { 'Content-Type': 'application/json;utf-8' },
      });
      break;
    case EHEADER.HEADER_MULTIPART:
      setRequestConfig({
        headers: { 'Content-Type': 'multipart/form-data;utf-8' },
      });
      break;
    case EHEADER.HEADER_URL_ENCODE:
      setRequestConfig({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;utf-8' },
      });
      break;
    default:
      setRequestConfig({
        headers: { 'Content-Type': 'application/json;utf-8' },
      });
      break;
  }
};


export const setLogin: (param: IProfile) => void = param => {
  localStorage.setItem('userinfo', JSON.stringify(param));
};

export const getToken: () => ILogin = () => {
  const token = localStorage.getItem('token');
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
  localStorage.setItem('token', newToken);
};

export const removeToken: () => void = () => {
  localStorage.removeItem('token');
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
  // const profileStr = localStorage.getItem('userinfo');
  const tokenStr = localStorage.getItem('token');
  const firstLogin = localStorage.getItem('ministers-first-login');
  if (tokenStr && firstLogin) {
    if (new Date().getTime() > (Number(firstLogin) + (24 * 60 * 60 * 1000))) {
      removeToken();
      // eslint-disable-next-line
      console.log('on day finished')
      return false;
    }
    const token: ILogin = JSON.parse(tokenStr);
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
      return 'سازمان های زیر نظر شهرداری';
    case 'GUILD_AGENCIES':
      return 'آژانس';
    case 'BUS_DRIVING':
      return 'انوبوسرانی';
    case 'BIKE_DELIVERY':
      return 'پیک موتوری';
    case 'SUBURBAN_TAXI':
      return 'تاکسی برون شهری';
    case 'IN_CITY_TAXI':
      return 'تاکسی درون شهری';
    case 'CARGO_FLEET':
      return 'ناوگان باربری';
    case 'ONLINE_TAXI':
      return 'تاکسی آنلاین';
    case 'SAMAS':
      return 'سماس';
    default:
      return null;
  }
};

export const getColorByServiceTypeName = (item: any) => {
  switch (item) {
    case 'PUBLIC':
      return '#4EC4F2';
    case 'TAXI_T':
      return '#9D19FA';
    case 'ONLINE':
      return '#049975';
    case 'MOTOR_PEYK':
      return '#ffc400';
    case 'SCHOOL_SERVICE':
      return '#ff00bf';
    default:
      return null;
  }
};

export const transportationTypes = [
  {
    name: 'کل حمل و نقل',
    enName: '',
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
    name: 'انوبوسرانی',
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
    name: 'تهران',
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