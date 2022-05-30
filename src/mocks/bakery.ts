import { instanceMockAdapter } from '../helpers/requestUtil';

// eslint-disable-next-line
const mockRes: any[] = [
  {
    "province": "اردبیل",
    "numberOfTotalBakery": 8303,
    "numberOfEnableBakery": 42,
    "numberOfDisableBakery": 6084,
    "numberOfBakeryBanned": 2177,
    "numberOfSamt": 2840,
    "numberOfSima": 8303,
    "numberOfActivePos": 1119
  },
  {
    "province": "اصفهان",
    "numberOfTotalBakery": 6431,
    "numberOfEnableBakery": 60,
    "numberOfDisableBakery": 4740,
    "numberOfBakeryBanned": 1631,
    "numberOfSamt": 573,
    "numberOfSima": 6431,
    "numberOfActivePos": 1878
  },
  {
    "province": "البرز",
    "numberOfTotalBakery": 3204,
    "numberOfEnableBakery": 39,
    "numberOfDisableBakery": 2636,
    "numberOfBakeryBanned": 529,
    "numberOfSamt": 2336,
    "numberOfSima": 3204,
    "numberOfActivePos": 1219
  },
  {
    "province": "ایلام",
    "numberOfTotalBakery": 5995,
    "numberOfEnableBakery": 48,
    "numberOfDisableBakery": 4587,
    "numberOfBakeryBanned": 1360,
    "numberOfSamt": 830,
    "numberOfSima": 5995,
    "numberOfActivePos": 309
  },
  {
    "province": "آذربایجان شرقی",
    "numberOfTotalBakery": 2861,
    "numberOfEnableBakery": 8,
    "numberOfDisableBakery": 2362,
    "numberOfBakeryBanned": 491,
    "numberOfSamt": 6863,
    "numberOfSima": 2861,
    "numberOfActivePos": 3018
  },
  {
    "province": "آذربایجان غربی",
    "numberOfTotalBakery": 960,
    "numberOfEnableBakery": 10,
    "numberOfDisableBakery": 685,
    "numberOfBakeryBanned": 265,
    "numberOfSamt": 5317,
    "numberOfSima": 960,
    "numberOfActivePos": 1980
  },
  {
    "province": "بوشهر",
    "numberOfTotalBakery": 1107,
    "numberOfEnableBakery": 14,
    "numberOfDisableBakery": 854,
    "numberOfBakeryBanned": 239,
    "numberOfSamt": 730,
    "numberOfSima": 1107,
    "numberOfActivePos": 373
  },
  {
    "province": "تهران",
    "numberOfTotalBakery": 10934,
    "numberOfEnableBakery": 78,
    "numberOfDisableBakery": 9409,
    "numberOfBakeryBanned": 1447,
    "numberOfSamt": 9199,
    "numberOfSima": 10934,
    "numberOfActivePos": 3440
  },
  {
    "province": "چهارمحال و بختیاری",
    "numberOfTotalBakery": 1555,
    "numberOfEnableBakery": 7,
    "numberOfDisableBakery": 879,
    "numberOfBakeryBanned": 669,
    "numberOfSamt": 954,
    "numberOfSima": 1555,
    "numberOfActivePos": 334
  },
  {
    "province": "خراسان جنوبی",
    "numberOfTotalBakery": 1269,
    "numberOfEnableBakery": 10,
    "numberOfDisableBakery": 796,
    "numberOfBakeryBanned": 463,
    "numberOfSamt": 731,
    "numberOfSima": 1269,
    "numberOfActivePos": 422
  },
  {
    "province": "خراسان رضوی",
    "numberOfTotalBakery": 7638,
    "numberOfEnableBakery": 41,
    "numberOfDisableBakery": 5660,
    "numberOfBakeryBanned": 1937,
    "numberOfSamt": 5337,
    "numberOfSima": 7638,
    "numberOfActivePos": 2754
  },
  {
    "province": "خراسان شمالی",
    "numberOfTotalBakery": 1626,
    "numberOfEnableBakery": 10,
    "numberOfDisableBakery": 1321,
    "numberOfBakeryBanned": 295,
    "numberOfSamt": 1360,
    "numberOfSima": 1626,
    "numberOfActivePos": 614
  },
  {
    "province": "خوزستان",
    "numberOfTotalBakery": 3823,
    "numberOfEnableBakery": 30,
    "numberOfDisableBakery": 3415,
    "numberOfBakeryBanned": 378,
    "numberOfSamt": 2256,
    "numberOfSima": 3823,
    "numberOfActivePos": 917
  },
  {
    "province": "زنجان",
    "numberOfTotalBakery": 2282,
    "numberOfEnableBakery": 36,
    "numberOfDisableBakery": 1573,
    "numberOfBakeryBanned": 673,
    "numberOfSamt": 1636,
    "numberOfSima": 2282,
    "numberOfActivePos": 984
  },
  {
    "province": "سمنان",
    "numberOfTotalBakery": 1267,
    "numberOfEnableBakery": 3,
    "numberOfDisableBakery": 886,
    "numberOfBakeryBanned": 378,
    "numberOfSamt": 718,
    "numberOfSima": 1267,
    "numberOfActivePos": 439
  },
  {
    "province": "سیستان و بلوچستان",
    "numberOfTotalBakery": 2690,
    "numberOfEnableBakery": 10,
    "numberOfDisableBakery": 1673,
    "numberOfBakeryBanned": 1007,
    "numberOfSamt": 760,
    "numberOfSima": 2690,
    "numberOfActivePos": 456
  },
  {
    "province": "فارس",
    "numberOfTotalBakery": 5270,
    "numberOfEnableBakery": 33,
    "numberOfDisableBakery": 3423,
    "numberOfBakeryBanned": 1814,
    "numberOfSamt": 3382,
    "numberOfSima": 5270,
    "numberOfActivePos": 2056
  },
  {
    "province": "قزوین",
    "numberOfTotalBakery": 1986,
    "numberOfEnableBakery": 17,
    "numberOfDisableBakery": 1689,
    "numberOfBakeryBanned": 280,
    "numberOfSamt": 1734,
    "numberOfSima": 1986,
    "numberOfActivePos": 651
  },
  {
    "province": "قم",
    "numberOfTotalBakery": 1187,
    "numberOfEnableBakery": 40,
    "numberOfDisableBakery": 911,
    "numberOfBakeryBanned": 236,
    "numberOfSamt": 819,
    "numberOfSima": 1187,
    "numberOfActivePos": 341
  },
  {
    "province": "كردستان",
    "numberOfTotalBakery": 2974,
    "numberOfEnableBakery": 21,
    "numberOfDisableBakery": 2608,
    "numberOfBakeryBanned": 345,
    "numberOfSamt": 2952,
    "numberOfSima": 2974,
    "numberOfActivePos": 1080
  },
  {
    "province": "كرمان",
    "numberOfTotalBakery": 2851,
    "numberOfEnableBakery": 25,
    "numberOfDisableBakery": 2329,
    "numberOfBakeryBanned": 497,
    "numberOfSamt": 1850,
    "numberOfSima": 2851,
    "numberOfActivePos": 902
  },
  {
    "province": "کهگیلویه و بویراحمد",
    "numberOfTotalBakery": 1072,
    "numberOfEnableBakery": 35,
    "numberOfDisableBakery": 630,
    "numberOfBakeryBanned": 407,
    "numberOfSamt": 601,
    "numberOfSima": 1072,
    "numberOfActivePos": 219
  },
  {
    "province": "کرمانشاه",
    "numberOfTotalBakery": 2925,
    "numberOfEnableBakery": 43,
    "numberOfDisableBakery": 2171,
    "numberOfBakeryBanned": 711,
    "numberOfSamt": 2688,
    "numberOfSima": 2925,
    "numberOfActivePos": 827
  },
  {
    "province": "گلستان",
    "numberOfTotalBakery": 3150,
    "numberOfEnableBakery": 8,
    "numberOfDisableBakery": 2337,
    "numberOfBakeryBanned": 805,
    "numberOfSamt": 2435,
    "numberOfSima": 3150,
    "numberOfActivePos": 989
  },
  {
    "province": "گیلان",
    "numberOfTotalBakery": 6331,
    "numberOfEnableBakery": 87,
    "numberOfDisableBakery": 3875,
    "numberOfBakeryBanned": 2369,
    "numberOfSamt": 4054,
    "numberOfSima": 6331,
    "numberOfActivePos": 1823
  },
  {
    "province": "لرستان",
    "numberOfTotalBakery": 2662,
    "numberOfEnableBakery": 17,
    "numberOfDisableBakery": 2024,
    "numberOfBakeryBanned": 621,
    "numberOfSamt": 2117,
    "numberOfSima": 2662,
    "numberOfActivePos": 923
  },
  {
    "province": "مازندران",
    "numberOfTotalBakery": 7011,
    "numberOfEnableBakery": 50,
    "numberOfDisableBakery": 4742,
    "numberOfBakeryBanned": 2219,
    "numberOfSamt": 4934,
    "numberOfSima": 7011,
    "numberOfActivePos": 2322
  },
  {
    "province": "مرکزی",
    "numberOfTotalBakery": 2815,
    "numberOfEnableBakery": 17,
    "numberOfDisableBakery": 1628,
    "numberOfBakeryBanned": 1170,
    "numberOfSamt": 1764,
    "numberOfSima": 2815,
    "numberOfActivePos": 938
  },
  {
    "province": "هرمزگان",
    "numberOfTotalBakery": 1915,
    "numberOfEnableBakery": 16,
    "numberOfDisableBakery": 1270,
    "numberOfBakeryBanned": 629,
    "numberOfSamt": 876,
    "numberOfSima": 1915,
    "numberOfActivePos": 509
  },
  {
    "province": "همدان",
    "numberOfTotalBakery": 2403,
    "numberOfEnableBakery": 7,
    "numberOfDisableBakery": 1880,
    "numberOfBakeryBanned": 516,
    "numberOfSamt": 2022,
    "numberOfSima": 2403,
    "numberOfActivePos": 907
  },
  {
    "province": "یزد",
    "numberOfTotalBakery": 2305,
    "numberOfEnableBakery": 95,
    "numberOfDisableBakery": 1343,
    "numberOfBakeryBanned": 867,
    "numberOfSamt": 1083,
    "numberOfSima": 2305,
    "numberOfActivePos": 542
  }
]

const mockActiveTimeRes: any[] = [
  {
    "province": "مرکزی",
    "hour": 5.89
  },
  {
    "province": "البرز",
    "hour": 4.69
  },
  {
    "province": "اردبیل ",
    "hour": 4.86
  },
  {
    "province": "آذربایجان غربی",
    "hour": 4.42
  },
  {
    "province": "آذربایجان شرقی",
    "hour": 3.38
  },
  {
    "province": "بوشهر",
    "hour": 6.1
  },
  {
    "province": "چهارمحال و بختیاری",
    "hour": 4.99
  },
  {
    "province": "ایلام ",
    "hour": 5.51
  },
  {
    "province": "اصفهان ",
    "hour": 5.43
  },
  {
    "province": "فارس",
    "hour": 6.66
  },
  {
    "province": "گیلان ",
    "hour": 5.52
  },
  {
    "province": "گلستان ",
    "hour": 4.63
  },
  {
    "province": "همدان ",
    "hour": 6.29
  },
  {
    "province": "هرمزگان ",
    "hour": 6.49
  },
  {
    "province": "خراسان شمالی ",
    "hour": 4.93
  },
  {
    "province": "خوزستان ",
    "hour": 5.49
  },
  {
    "province": "خراسان رضوی ",
    "hour": 6.63
  },
  {
    "province": "خراسان شمالی ",
    "hour": 4.85
  },
  {
    "province": "کهگلویه و بویراحمر",
    "hour": 6.35
  },
  {
    "province": "کردستان ",
    "hour": 4.12
  },
  {
    "province": "کرمان ",
    "hour": 4.95
  },
  {
    "province": "کرمانشاه ",
    "hour": 5.87
  },
  {
    "province": "لرستان",
    "hour": 6.16
  },
  {
    "province": "مازندران ",
    "hour": 5.81
  },
  {
    "province": "قزوین ",
    "hour": 4.44
  },
  {
    "province": "قم ",
    "hour": 8
  },
  {
    "province": "سیستان و بلوچستان ",
    "hour": 4.98
  },
  {
    "province": "سمنان ",
    "hour": 6.62
  },
  {
    "province": "تهران ",
    "hour": 6.63
  },
  {
    "province": "یزد ",
    "hour": 4.68
  },
  {
    "province": "زنجان ",
    "hour": 2.97
  }
]

const mockSellRateRes: any[] = [
  {
    "sellCount": 8689298.36,
    "province": "مرکزی"
  },
  {
    "sellCount": 13295339.09,
    "province": "البرز"
  },
  {
    "sellCount": 6722120.111,
    "province": "اردبیل "
  },
  {
    "sellCount": 9989286.589,
    "province": "آذربایجان غربی"
  },
  {
    "sellCount": 8439852.733,
    "province": "آذربایجان شرقی"
  },
  {
    "sellCount": 11199076.74,
    "province": "بوشهر"
  },
  {
    "sellCount": 4779424.409,
    "province": "چهارمحال و بختیاری"
  },
  {
    "sellCount": 12818678.13,
    "province": "ایلام "
  },
  {
    "sellCount": 9590537.546,
    "province": "اصفهان "
  },
  {
    "sellCount": 14664574.57,
    "province": "فارس"
  },
  {
    "sellCount": 8429054.404,
    "province": "گیلان "
  },
  {
    "sellCount": 6954132.374,
    "province": "گلستان "
  },
  {
    "sellCount": 9163736.1,
    "province": "همدان "
  },
  {
    "sellCount": 16410580.82,
    "province": "هرمزگان "
  },
  {
    "sellCount": 5556069.91,
    "province": "خراسان شمالی "
  },
  {
    "sellCount": 15760279.26,
    "province": "خوزستان "
  },
  {
    "sellCount": 12140145.03,
    "province": "خراسان رضوی "
  },
  {
    "sellCount": 5803087.736,
    "province": "خراسان شمالی "
  },
  {
    "sellCount": 12735494.98,
    "province": "کهگلویه و بویراحمر"
  },
  {
    "sellCount": 6857303.887,
    "province": "کردستان "
  },
  {
    "sellCount": 11625721.74,
    "province": "کرمان "
  },
  {
    "sellCount": 7074081.339,
    "province": "کرمانشاه "
  },
  {
    "sellCount": 8977356.337,
    "province": "لرستان"
  },
  {
    "sellCount": 9407692.233,
    "province": "مازندران "
  },
  {
    "sellCount": 12363930.14,
    "province": "قزوین "
  },
  {
    "sellCount": 11799462.52,
    "province": "قم "
  },
  {
    "sellCount": 12543680.3,
    "province": "سیستان و بلوچستان "
  },
  {
    "sellCount": 8874341.432,
    "province": "سمنان "
  },
  {
    "sellCount": 22067836.55,
    "province": "تهران "
  },
  {
    "sellCount": 12109150.31,
    "province": "یزد "
  },
  {
    "sellCount": 4565946.438,
    "province": "زنجان "
  }
]

const mockLicenceRes: any[] = [
  {
    "province": "اردبیل",
    "sima": 2616,
    "samt": 2840
  },
  {
    "province": "اصفهان",
    "sima": 4517,
    "samt": 573
  },
  {
    "province": "البرز",
    "sima": 2362,
    "samt": 2336
  },
  {
    "province": "ايلام",
    "sima": 675,
    "samt": 830
  },
  {
    "province": "آذربايجان شرقي",
    "sima": 5935,
    "samt": 6863
  },
  {
    "province": "آذربايجان غربي",
    "sima": 4623,
    "samt": 5317
  },
  {
    "province": "بوشهر",
    "sima": 854,
    "samt": 730
  },
  {
    "province": "تهران",
    "sima": 9252,
    "samt": 9199
  },
  {
    "province": "چهارمحال وبختيارئ",
    "sima": 879,
    "samt": 954
  },
  {
    "province": "خراسان جنوبي",
    "sima": 791,
    "samt": 731
  },
  {
    "province": "خراسان رضوئ",
    "sima": 5572,
    "samt": 5337
  },
  {
    "province": "خراسان شمالي",
    "sima": 1319,
    "samt": 1360
  },
  {
    "province": "خوزستان",
    "sima": 3399,
    "samt": 2256
  },
  {
    "province": "زنجان",
    "sima": 1510,
    "samt": 1636
  },
  {
    "province": "سمنان",
    "sima": 875,
    "samt": 718
  },
  {
    "province": "سيستان وبلوچستان",
    "sima": 1673,
    "samt": 760
  },
  {
    "province": "فارس",
    "sima": 3363,
    "samt": 3382
  },
  {
    "province": "قزوين",
    "sima": 1686,
    "samt": 1734
  },
  {
    "province": "قم",
    "sima": 911,
    "samt": 819
  },
  {
    "province": "كردستان",
    "sima": 2586,
    "samt": 2952
  },
  {
    "province": "كرمان",
    "sima": 2315,
    "samt": 1850
  },
  {
    "province": "كهگيلويه وبويراحمد",
    "sima": 608,
    "samt": 601
  },
  {
    "province": "کرمانشاه",
    "sima": 2165,
    "samt": 2688
  },
  {
    "province": "گلستان",
    "sima": 2297,
    "samt": 2435
  },
  {
    "province": "گيلان",
    "sima": 3807,
    "samt": 4054
  },
  {
    "province": "لرستان",
    "sima": 2014,
    "samt": 2117
  },
  {
    "province": "مازندران",
    "sima": 4729,
    "samt": 4934
  },
  {
    "province": "مرکزي",
    "sima": 1610,
    "samt": 1764
  },
  {
    "province": "هرمزگان",
    "sima": 1243,
    "samt": 876
  },
  {
    "province": "همدان",
    "sima": 1868,
    "samt": 2022
  },
  {
    "province": "يزد",
    "sima": 1286,
    "samt": 1083
  }
]



instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/general/g, { province: /.*/ })
  .reply((req: any) => {
    let res: any = [];

    if (req.params.province) {
      res = mockRes.find(d => d.province === req.params.province)
    } else {
      res = {
        numberOfTotalBakery: 108802,
        numberOfEnableBakery: 80420,
        numberOfDisableBakery: 957,
        numberOfAudit: 0,
        numberOfSamt: 75751,
        numberOfSima: 108802,
        numberOfActivePos: 35285,
        numberOfAvgSupplyFlour: 0,
        numberOfBakeryBanned: 27425,
      };
    }
    return [200, { ...res }];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/per\-category/g, {})
  .reply(() => {
    // eslint-disable-next-line
    const res: any[] = [
      {
        "_id": "62921ccfd74c22432993672b",
        "index": 0,
        "total": 700,
        "samt": 41,
        "sima": 93,
        "categoryValue": "لواش"
      },
      {
        "_id": "62921ccff52cfb30e54a70ee",
        "index": 1,
        "total": 3353,
        "samt": 75,
        "sima": 21,
        "categoryValue": "سنگک"
      },
      {
        "_id": "62921ccfe339570bde428a76",
        "index": 2,
        "total": 547,
        "samt": 79,
        "sima": 27,
        "categoryValue": "نان روغنی"
      },
      {
        "_id": "62921ccf1f1946134ecdf99d",
        "index": 3,
        "total": 1279,
        "samt": 28,
        "sima": 24,
        "categoryValue": "شیرینی پزی و قنادی"
      },
      {
        "_id": "62921ccf92a7d6304b6a075b",
        "index": 4,
        "total": 1018,
        "samt": 83,
        "sima": 86,
        "categoryValue": "تافتون"
      }
    ];

    return [200, []];
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