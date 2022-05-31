import {instanceMockAdapter} from '../helpers/requestUtil';
import {res as data} from './bakery.data';

// eslint-disable-next-line
const mockRes: any[] = [
  {
    province: 'آذربایجان شرقی',
    numberOfTotalBakery: 8345,
    numberOfEnableBakery: 6121,
    numberOfDisableBakery: 56,
    numberOfBakeryBanned: 2168,
    numberOfSamt: 2840,
    numberOfSima: 8345,
    numberOfActivePos: 5541,
    numberOfAvgSupplyFlour: 36747775,
    numberOfBakeryWithoutPos: 1765,
    numberOfTransaction: 1000,
    numberOfTransactionPerDay: 565,
    numberOfPosActiveTime: 462,
  },
  {
    province: 'آذربایجان غربی',
    numberOfTotalBakery: 6445,
    numberOfEnableBakery: 4757,
    numberOfDisableBakery: 65,
    numberOfBakeryBanned: 1623,
    numberOfSamt: 573,
    numberOfSima: 6445,
    numberOfActivePos: 3781,
    numberOfAvgSupplyFlour: 31996760,
    numberOfBakeryWithoutPos: 1641,
    numberOfTransaction: 710,
    numberOfTransactionPerDay: 355,
    numberOfPosActiveTime: 268,
  },
  {
    province: 'اردبیل',
    numberOfTotalBakery: 3211,
    numberOfEnableBakery: 2651,
    numberOfDisableBakery: 21,
    numberOfBakeryBanned: 539,
    numberOfSamt: 2336,
    numberOfSima: 3211,
    numberOfActivePos: 2241,
    numberOfAvgSupplyFlour: 16919180,
    numberOfBakeryWithoutPos: 855,
    numberOfTransaction: 470,
    numberOfTransactionPerDay: 230,
    numberOfPosActiveTime: 181,
  },
  {
    province: 'اصفهان',
    numberOfTotalBakery: 5996,
    numberOfEnableBakery: 4581,
    numberOfDisableBakery: 52,
    numberOfBakeryBanned: 1363,
    numberOfSamt: 830,
    numberOfSima: 5996,
    numberOfActivePos: 5553,
    numberOfAvgSupplyFlour: 37224639,
    numberOfBakeryWithoutPos: 894,
    numberOfTransaction: 904,
    numberOfTransactionPerDay: 574,
    numberOfPosActiveTime: 442,
  },
  {
    province: 'البرز',
    numberOfTotalBakery: 2861,
    numberOfEnableBakery: 2361,
    numberOfDisableBakery: 10,
    numberOfBakeryBanned: 490,
    numberOfSamt: 6863,
    numberOfSima: 2861,
    numberOfActivePos: 2442,
    numberOfAvgSupplyFlour: 21362000,
    numberOfBakeryWithoutPos: 669,
    numberOfTransaction: 283,
    numberOfTransactionPerDay: 190,
    numberOfPosActiveTime: 135,
  },
  {
    province: 'ایلام',
    numberOfTotalBakery: 960,
    numberOfEnableBakery: 688,
    numberOfDisableBakery: 9,
    numberOfBakeryBanned: 263,
    numberOfSamt: 5317,
    numberOfSima: 960,
    numberOfActivePos: 731,
    numberOfAvgSupplyFlour: 6607693,
    numberOfBakeryWithoutPos: 173,
    numberOfTransaction: 137,
    numberOfTransactionPerDay: 89,
    numberOfPosActiveTime: 66,
  },
  {
    province: 'بوشهر',
    numberOfTotalBakery: 1112,
    numberOfEnableBakery: 857,
    numberOfDisableBakery: 15,
    numberOfBakeryBanned: 240,
    numberOfSamt: 730,
    numberOfSima: 1112,
    numberOfActivePos: 1031,
    numberOfAvgSupplyFlour: 9469880,
    numberOfBakeryWithoutPos: 205,
    numberOfTransaction: 183,
    numberOfTransactionPerDay: 92,
    numberOfPosActiveTime: 68,
  },
  {
    province: 'تهران',
    numberOfTotalBakery: 10949,
    numberOfEnableBakery: 9418,
    numberOfDisableBakery: 86,
    numberOfBakeryBanned: 1445,
    numberOfSamt: 9199,
    numberOfSima: 10949,
    numberOfActivePos: 9918,
    numberOfAvgSupplyFlour: 108581944,
    numberOfBakeryWithoutPos: 2469,
    numberOfTransaction: 1188,
    numberOfTransactionPerDay: 654,
    numberOfPosActiveTime: 394,
  },
  {
    province: 'چهارمحال و بختیاری',
    numberOfTotalBakery: 1539,
    numberOfEnableBakery: 867,
    numberOfDisableBakery: 7,
    numberOfBakeryBanned: 665,
    numberOfSamt: 954,
    numberOfSima: 1539,
    numberOfActivePos: 918,
    numberOfAvgSupplyFlour: 9537760,
    numberOfBakeryWithoutPos: 231,
    numberOfTransaction: 137,
    numberOfTransactionPerDay: 88,
    numberOfPosActiveTime: 68,
  },
  {
    province: 'خراسان جنوبی',
    numberOfTotalBakery: 1237,
    numberOfEnableBakery: 758,
    numberOfDisableBakery: 11,
    numberOfBakeryBanned: 468,
    numberOfSamt: 731,
    numberOfSima: 1237,
    numberOfActivePos: 864,
    numberOfAvgSupplyFlour: 8288328,
    numberOfBakeryWithoutPos: 208,
    numberOfTransaction: 148,
    numberOfTransactionPerDay: 90,
    numberOfPosActiveTime: 64,
  },
  {
    province: 'خراسان رضوی',
    numberOfTotalBakery: 7602,
    numberOfEnableBakery: 5623,
    numberOfDisableBakery: 42,
    numberOfBakeryBanned: 1937,
    numberOfSamt: 5337,
    numberOfSima: 7602,
    numberOfActivePos: 5765,
    numberOfAvgSupplyFlour: 53493229,
    numberOfBakeryWithoutPos: 1583,
    numberOfTransaction: 716,
    numberOfTransactionPerDay: 441,
    numberOfPosActiveTime: 352,
  },
  {
    province: 'خراسان شمالی',
    numberOfTotalBakery: 1626,
    numberOfEnableBakery: 1323,
    numberOfDisableBakery: 9,
    numberOfBakeryBanned: 294,
    numberOfSamt: 1360,
    numberOfSima: 1626,
    numberOfActivePos: 1088,
    numberOfAvgSupplyFlour: 8670000,
    numberOfBakeryWithoutPos: 529,
    numberOfTransaction: 188,
    numberOfTransactionPerDay: 104,
    numberOfPosActiveTime: 86,
  },
  {
    province: 'خوزستان',
    numberOfTotalBakery: 3823,
    numberOfEnableBakery: 3394,
    numberOfDisableBakery: 35,
    numberOfBakeryBanned: 394,
    numberOfSamt: 2256,
    numberOfSima: 3823,
    numberOfActivePos: 3297,
    numberOfAvgSupplyFlour: 44268272,
    numberOfBakeryWithoutPos: 872,
    numberOfTransaction: 611,
    numberOfTransactionPerDay: 390,
    numberOfPosActiveTime: 264,
  },
  {
    province: 'زنجان',
    numberOfTotalBakery: 2294,
    numberOfEnableBakery: 1581,
    numberOfDisableBakery: 36,
    numberOfBakeryBanned: 677,
    numberOfSamt: 1636,
    numberOfSima: 2294,
    numberOfActivePos: 1437,
    numberOfAvgSupplyFlour: 12422393,
    numberOfBakeryWithoutPos: 450,
    numberOfTransaction: 519,
    numberOfTransactionPerDay: 524,
    numberOfPosActiveTime: 461,
  },
  {
    province: 'سمنان',
    numberOfTotalBakery: 1233,
    numberOfEnableBakery: 774,
    numberOfDisableBakery: 98,
    numberOfBakeryBanned: 361,
    numberOfSamt: 718,
    numberOfSima: 1233,
    numberOfActivePos: 962,
    numberOfAvgSupplyFlour: 6432767,
    numberOfBakeryWithoutPos: 173,
    numberOfTransaction: 144,
    numberOfTransactionPerDay: 94,
    numberOfPosActiveTime: 67,
  },
  {
    province: 'سیستان و بلوچستان',
    numberOfTotalBakery: 2696,
    numberOfEnableBakery: 1678,
    numberOfDisableBakery: 11,
    numberOfBakeryBanned: 1007,
    numberOfSamt: 760,
    numberOfSima: 2696,
    numberOfActivePos: 2041,
    numberOfAvgSupplyFlour: 35948835,
    numberOfBakeryWithoutPos: 285,
    numberOfTransaction: 424,
    numberOfTransactionPerDay: 250,
    numberOfPosActiveTime: 171,
  },
  {
    province: 'فارس',
    numberOfTotalBakery: 5273,
    numberOfEnableBakery: 3424,
    numberOfDisableBakery: 36,
    numberOfBakeryBanned: 1813,
    numberOfSamt: 3382,
    numberOfSima: 5273,
    numberOfActivePos: 5005,
    numberOfAvgSupplyFlour: 39030848,
    numberOfBakeryWithoutPos: 469,
    numberOfTransaction: 583,
    numberOfTransactionPerDay: 393,
    numberOfPosActiveTime: 259,
  },
  {
    province: 'قزوین',
    numberOfTotalBakery: 1986,
    numberOfEnableBakery: 1686,
    numberOfDisableBakery: 23,
    numberOfBakeryBanned: 277,
    numberOfSamt: 1734,
    numberOfSima: 1986,
    numberOfActivePos: 1483,
    numberOfAvgSupplyFlour: 11762120,
    numberOfBakeryWithoutPos: 587,
    numberOfTransaction: 363,
    numberOfTransactionPerDay: 313,
    numberOfPosActiveTime: 239,
  },
  {
    province: 'قم',
    numberOfTotalBakery: 1197,
    numberOfEnableBakery: 912,
    numberOfDisableBakery: 49,
    numberOfBakeryBanned: 236,
    numberOfSamt: 819,
    numberOfSima: 1197,
    numberOfActivePos: 1094,
    numberOfAvgSupplyFlour: 10306920,
    numberOfBakeryWithoutPos: 226,
    numberOfTransaction: 159,
    numberOfTransactionPerDay: 87,
    numberOfPosActiveTime: 65,
  },
  {
    province: 'گلستان',
    numberOfTotalBakery: 3154,
    numberOfEnableBakery: 2340,
    numberOfDisableBakery: 9,
    numberOfBakeryBanned: 805,
    numberOfSamt: 2952,
    numberOfSima: 3154,
    numberOfActivePos: 1960,
    numberOfAvgSupplyFlour: 17669120,
    numberOfBakeryWithoutPos: 735,
    numberOfTransaction: 316,
    numberOfTransactionPerDay: 155,
    numberOfPosActiveTime: 112,
  },
  {
    province: 'گیلان',
    numberOfTotalBakery: 6308,
    numberOfEnableBakery: 4069,
    numberOfDisableBakery: 37,
    numberOfBakeryBanned: 2202,
    numberOfSamt: 1850,
    numberOfSima: 6308,
    numberOfActivePos: 2975,
    numberOfAvgSupplyFlour: 25801800,
    numberOfBakeryWithoutPos: 1739,
    numberOfTransaction: 567,
    numberOfTransactionPerDay: 311,
    numberOfPosActiveTime: 197,
  },
  {
    province: 'لرستان',
    numberOfTotalBakery: 2647,
    numberOfEnableBakery: 2006,
    numberOfDisableBakery: 19,
    numberOfBakeryBanned: 622,
    numberOfSamt: 601,
    numberOfSima: 2647,
    numberOfActivePos: 2010,
    numberOfAvgSupplyFlour: 20630207,
    numberOfBakeryWithoutPos: 374,
    numberOfTransaction: 435,
    numberOfTransactionPerDay: 220,
    numberOfPosActiveTime: 172,
  },
  {
    province: 'مازندران',
    numberOfTotalBakery: 7049,
    numberOfEnableBakery: 4757,
    numberOfDisableBakery: 46,
    numberOfBakeryBanned: 2246,
    numberOfSamt: 2688,
    numberOfSima: 7049,
    numberOfActivePos: 4818,
    numberOfAvgSupplyFlour: 33245000,
    numberOfBakeryWithoutPos: 1236,
    numberOfTransaction: 994,
    numberOfTransactionPerDay: 603,
    numberOfPosActiveTime: 398,
  },
  {
    province: 'مرکزی',
    numberOfTotalBakery: 2818,
    numberOfEnableBakery: 1882,
    numberOfDisableBakery: 18,
    numberOfBakeryBanned: 918,
    numberOfSamt: 2435,
    numberOfSima: 2818,
    numberOfActivePos: 2069,
    numberOfAvgSupplyFlour: 12447160,
    numberOfBakeryWithoutPos: 464,
    numberOfTransaction: 328,
    numberOfTransactionPerDay: 191,
    numberOfPosActiveTime: 137,
  },
  {
    province: 'هرمزگان',
    numberOfTotalBakery: 1898,
    numberOfEnableBakery: 1249,
    numberOfDisableBakery: 22,
    numberOfBakeryBanned: 627,
    numberOfSamt: 4054,
    numberOfSima: 1898,
    numberOfActivePos: 1423,
    numberOfAvgSupplyFlour: 16041908,
    numberOfBakeryWithoutPos: 310,
    numberOfTransaction: 307,
    numberOfTransactionPerDay: 217,
    numberOfPosActiveTime: 118,
  },
  {
    province: 'همدان',
    numberOfTotalBakery: 2397,
    numberOfEnableBakery: 1879,
    numberOfDisableBakery: 14,
    numberOfBakeryBanned: 504,
    numberOfSamt: 2117,
    numberOfSima: 2397,
    numberOfActivePos: 2295,
    numberOfAvgSupplyFlour: 14807040,
    numberOfBakeryWithoutPos: 310,
    numberOfTransaction: 398,
    numberOfTransactionPerDay: 224,
    numberOfPosActiveTime: 167,
  },
  {
    province: 'کردستان',
    numberOfTotalBakery: 2958,
    numberOfEnableBakery: 2577,
    numberOfDisableBakery: 39,
    numberOfBakeryBanned: 342,
    numberOfSamt: 4934,
    numberOfSima: 2958,
    numberOfActivePos: 1946,
    numberOfAvgSupplyFlour: 16738120,
    numberOfBakeryWithoutPos: 908,
    numberOfTransaction: 400,
    numberOfTransactionPerDay: 227,
    numberOfPosActiveTime: 174,
  },
  {
    province: 'کرمان',
    numberOfTotalBakery: 2863,
    numberOfEnableBakery: 2318,
    numberOfDisableBakery: 39,
    numberOfBakeryBanned: 506,
    numberOfSamt: 1764,
    numberOfSima: 2863,
    numberOfActivePos: 3144,
    numberOfAvgSupplyFlour: 26454505,
    numberOfBakeryWithoutPos: 255,
    numberOfTransaction: 541,
    numberOfTransactionPerDay: 364,
    numberOfPosActiveTime: 276,
  },
  {
    province: 'کرمانشاه',
    numberOfTotalBakery: 2915,
    numberOfEnableBakery: 2158,
    numberOfDisableBakery: 51,
    numberOfBakeryBanned: 706,
    numberOfSamt: 876,
    numberOfSima: 2915,
    numberOfActivePos: 1894,
    numberOfAvgSupplyFlour: 20462956,
    numberOfBakeryWithoutPos: 600,
    numberOfTransaction: 382,
    numberOfTransactionPerDay: 227,
    numberOfPosActiveTime: 156,
  },
  {
    province: 'کهگیلویه و بویراحمد',
    numberOfTotalBakery: 1067,
    numberOfEnableBakery: 636,
    numberOfDisableBakery: 17,
    numberOfBakeryBanned: 414,
    numberOfSamt: 2022,
    numberOfSima: 1067,
    numberOfActivePos: 809,
    numberOfAvgSupplyFlour: 7327280,
    numberOfBakeryWithoutPos: 113,
    numberOfTransaction: 188,
    numberOfTransactionPerDay: 131,
    numberOfPosActiveTime: 68,
  },
  {
    province: 'یزد',
    numberOfTotalBakery: 2300,
    numberOfEnableBakery: 1340,
    numberOfDisableBakery: 94,
    numberOfBakeryBanned: 866,
    numberOfSamt: 1083,
    numberOfSima: 2300,
    numberOfActivePos: 1532,
    numberOfAvgSupplyFlour: 10744910,
    numberOfBakeryWithoutPos: 475,
    numberOfTransaction: 371,
    numberOfTransactionPerDay: 255,
    numberOfPosActiveTime: 176,
  },
];

const mockActiveTimeRes: any[] = [
  {
    province: 'مرکزی',
    hour: 7.93,
  },
  {
    province: 'البرز',
    hour: 8.75,
  },
  {
    province: 'اردبیل',
    hour: 5.67,
  },
  {
    province: 'آذربایجان شرقی',
    hour: 5.53,
  },
  {
    province: 'آذربایجان غربی',
    hour: 5.48,
  },
  {
    province: 'بوشهر',
    hour: 7.65,
  },
  {
    province: 'چهارمحال و بختیاری',
    hour: 7.36,
  },
  {
    province: 'ایلام',
    hour: 6.44,
  },
  {
    province: 'اصفهان',
    hour: 7.94,
  },
  {
    province: 'فارس',
    hour: 8.12,
  },
  {
    province: 'گیلان',
    hour: 6.79,
  },
  {
    province: 'گلستان',
    hour: 5.67,
  },
  {
    province: 'همدان',
    hour: 7.67,
  },
  {
    province: 'هرمزگان',
    hour: 7.9,
  },
  {
    province: 'خراسان شمالی',
    hour: 5.68,
  },
  {
    province: 'خوزستان',
    hour: 7.12,
  },
  {
    province: 'خراسان رضوی',
    hour: 8.86,
  },
  {
    province: 'خراسان جنوبی',
    hour: 6.6,
  },
  {
    province: 'کهگلویه و بویراحمر',
    hour: 8.2,
  },
  {
    province: 'کردستان',
    hour: 5.78,
  },
  {
    province: 'کرمان',
    hour: 7.06,
  },
  {
    province: 'کرمانشاه',
    hour: 7.35,
  },
  {
    province: 'لرستان',
    hour: 7.8,
  },
  {
    province: 'مازندران',
    hour: 7.07,
  },
  {
    province: 'قزوین',
    hour: 5.63,
  },
  {
    province: 'قم',
    hour: 9.08,
  },
  {
    province: 'سیستان و بلوچستان',
    hour: 5.89,
  },
  {
    province: 'سمنان',
    hour: 7.45,
  },
  {
    province: 'تهران',
    hour: 10.88,
  },
  {
    province: 'یزد',
    hour: 6.28,
  },
  {
    province: 'زنجان',
    hour: 3.74,
  },
];

const mockSellRateRes: any[] = [
  {
    province: 'مرکزی',
    sellCount: 11432777.86,
  },
  {
    province: 'البرز',
    sellCount: 21177495.01,
  },
  {
    province: 'اردبیل',
    sellCount: 11516387.81,
  },
  {
    province: 'آذربایجان شرقی',
    sellCount: 12730177.97,
  },
  {
    province: 'آذربایجان غربی',
    sellCount: 12570225,
  },
  {
    province: 'بوشهر',
    sellCount: 15437375.17,
  },
  {
    province: 'چهارمحال و بختیاری',
    sellCount: 9235530.605,
  },
  {
    province: 'ایلام',
    sellCount: 11468622.06,
  },
  {
    province: 'اصفهان',
    sellCount: 15013302.78,
  },
  {
    province: 'فارس',
    sellCount: 19395280.4,
  },
  {
    province: 'گیلان',
    sellCount: 14699883.85,
  },
  {
    province: 'گلستان',
    sellCount: 10513920.81,
  },
  {
    province: 'همدان',
    sellCount: 11142113.75,
  },
  {
    province: 'هرمزگان',
    sellCount: 19116720.55,
  },
  {
    province: 'خراسان شمالی',
    sellCount: 8387361.662,
  },
  {
    province: 'خوزستان',
    sellCount: 20618782.13,
  },
  {
    province: 'خراسان رضوی',
    sellCount: 17332673.86,
  },
  {
    province: 'خراسان جنوبی',
    sellCount: 8124037.062,
  },
  {
    province: 'کهگلویه و بویراحمر',
    sellCount: 17193487.13,
  },
  {
    province: 'کردستان',
    sellCount: 11293499.94,
  },
  {
    province: 'کرمان',
    sellCount: 13982120.08,
  },
  {
    province: 'کرمانشاه',
    sellCount: 13072055,
  },
  {
    province: 'لرستان',
    sellCount: 11069901.48,
  },
  {
    province: 'مازندران',
    sellCount: 13135416.82,
  },
  {
    province: 'قزوین',
    sellCount: 13565767.49,
  },
  {
    province: 'قم',
    sellCount: 16096586.06,
  },
  {
    province: 'سیستان و بلوچستان',
    sellCount: 19498423.69,
  },
  {
    province: 'سمنان',
    sellCount: 9406484.839,
  },
  {
    province: 'تهران',
    sellCount: 30648821.63,
  },
  {
    province: 'یزد',
    sellCount: 14227064.54,
  },
  {
    province: 'زنجان',
    sellCount: 7359083.678,
  },
];

const mockLicenceRes: any[] = [
  {
    province: 'اردبیل',
    sima: 1829,
    samt: 2840,
  },
  {
    province: 'اصفهان',
    sima: 305,
    samt: 573,
  },
  {
    province: 'البرز',
    sima: 1690,
    samt: 2336,
  },
  {
    province: 'ايلام',
    sima: 247,
    samt: 830,
  },
  {
    province: 'آذربايجان شرقي',
    sima: 2155,
    samt: 6863,
  },
  {
    province: 'آذربايجان غربي',
    sima: 1300,
    samt: 5317,
  },
  {
    province: 'بوشهر',
    sima: 286,
    samt: 730,
  },
  {
    province: 'تهران',
    sima: 1776,
    samt: 9199,
  },
  {
    province: 'چهارمحال وبختيارئ',
    sima: 332,
    samt: 954,
  },
  {
    province: 'خراسان جنوبي',
    sima: 248,
    samt: 731,
  },
  {
    province: 'خراسان رضوئ',
    sima: 2855,
    samt: 5337,
  },
  {
    province: 'خراسان شمالي',
    sima: 310,
    samt: 1360,
  },
  {
    province: 'خوزستان',
    sima: 822,
    samt: 2256,
  },
  {
    province: 'زنجان',
    sima: 489,
    samt: 1636,
  },
  {
    province: 'سمنان',
    sima: 386,
    samt: 718,
  },
  {
    province: 'سيستان وبلوچستان',
    sima: 357,
    samt: 760,
  },
  {
    province: 'فارس',
    sima: 1418,
    samt: 3382,
  },
  {
    province: 'قزوين',
    sima: 1190,
    samt: 1734,
  },
  {
    province: 'قم',
    sima: 618,
    samt: 819,
  },
  {
    province: 'كردستان',
    sima: 867,
    samt: 2952,
  },
  {
    province: 'كرمان',
    sima: 432,
    samt: 1850,
  },
  {
    province: 'كهگيلويه وبويراحمد',
    sima: 250,
    samt: 601,
  },
  {
    province: 'کرمانشاه',
    sima: 887,
    samt: 2688,
  },
  {
    province: 'گلستان',
    sima: 963,
    samt: 2435,
  },
  {
    province: 'گيلان',
    sima: 958,
    samt: 4054,
  },
  {
    province: 'لرستان',
    sima: 550,
    samt: 2117,
  },
  {
    province: 'مازندران',
    sima: 2814,
    samt: 4934,
  },
  {
    province: 'مرکزي',
    sima: 1271,
    samt: 1764,
  },
  {
    province: 'هرمزگان',
    sima: 312,
    samt: 876,
  },
  {
    province: 'همدان',
    sima: 687,
    samt: 2022,
  },
  {
    province: 'يزد',
    sima: 279,
    samt: 1083,
  },
];

const mockAuditRes: any[] = [...data];

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/general/g, {province: /.*/})
  .reply((req: any) => {
    let res: any = [];

    if (req.params.province) {
      res = mockRes.find(d => d.province === req.params.province);
    } else {
      res = {
        numberOfTotalBakery: 108759,
        numberOfEnableBakery: 80665,
        numberOfDisableBakery: 1076,
        numberOfBakeryBanned: 8648,
        numberOfSamt: 75751,
        numberOfSima: 108759,
        numberOfActivePos: 82067,
        numberOfAvgSupplyFlour: 23594882.2258065,
        numberOfBakeryWithoutPos: 21803,
        numberOfAudit: 14800,

        numberOfTransactionPerDay: 8648,
        numberOfTransaction: 14094,
        numberOfPosActiveTime: 6263,
      };
    }
    return [200, {...res}];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/per\-category/g, {province: /.*/})
  .reply(req => {
    let response: any[] = [];

    if (!req.params.province)
      response = [
        {
          category: 'لواش',
          total: 26380,
        },
        {
          category: 'بربري',
          total: 21739,
        },
        {
          category: 'سنگک',
          total: 9811,
        },
        {
          category: 'تافتون',
          total: 9409,
        },
        {
          category: 'تافتون ماشيني',
          total: 3857,
        },
        {
          category: 'فانتزي',
          total: 2931,
        },
        {
          category: 'ساير نان هاي سنتي',
          total: 1646,
        },
        {
          category: 'نان تافتون سنتي',
          total: 1122,
        },
        {
          category: 'تافتون تنوري',
          total: 1022,
        },
        {
          category: 'تنوري سنتي',
          total: 851,
        },
        {
          category: 'حجیم و نیمه حجیم',
          total: 829,
        },
        {
          category: 'ماشيني',
          total: 714,
        },
        {
          category: 'دوار',
          total: 688,
        },
        {
          category: 'خشکه پزی',
          total: 546,
        },
        {
          category: 'حرارت غيرمستقيم',
          total: 505,
        },
        {
          category: 'سنتي',
          total: 228,
        },
        {
          category: 'تنوري',
          total: 204,
        },
        {
          category: 'خام پز',
          total: 189,
        },
        {
          category: 'نان محلی',
          total: 101,
        },
        {
          category: 'نانوايي ماشيني',
          total: 90,
        },
        {
          category: 'صنعتی',
          total: 50,
        },
        {
          category: 'ساير',
          total: 46,
        },
        {
          category: 'نان روغني',
          total: 44,
        },
        {
          category: 'خانه پز',
          total: 41,
        },
        {
          category: 'صمون پزي',
          total: 37,
        },
        {
          category: 'مجتمع',
          total: 36,
        },
        {
          category: 'خشکه پز',
          total: 28,
        },
        {
          category: 'تافتون خراساني',
          total: 22,
        },
        {
          category: 'نان حجمي و نيمه حجمي',
          total: 11,
        },
        {
          category: 'ماشيني سبوس دار',
          total: 1,
        },
        {
          category: 'نيمه حجيم',
          total: 1,
        },
        {
          category: 'بولکي',
          total: 1,
        },
        {
          category: 'اسکو',
          total: 1,
        },
      ];

    return [200, [...response]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/license/g, {})
  .reply(() => {
    return [200, [...mockLicenceRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/active\-time/g, {})
  .reply(() => {
    return [200, [...mockActiveTimeRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/sell\-rate/g, {})
  .reply(() => {
    return [200, [...mockSellRateRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/sold\-count/g, {})
  .reply(() => {
    return [200, []];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/supply\-flour/g, {})
  .reply(() => {
    return [200, []];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/audit/g, {province: /.*/})
  .reply(req => {
    let response: any[] = [];
    if (!req.params.province) {
      response = mockAuditRes;
    }

    return [200, [...response]];
  });
