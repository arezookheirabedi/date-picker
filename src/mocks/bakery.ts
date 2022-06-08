import {instanceMockAdapter} from '../helpers/requestUtil';

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/general/g, {province: /.*/})
  .reply(async (req: any) => {
    let res: any = [];

    if (req.params.province) {
      await fetch(`${process.env.PUBLIC_URL}/assets/bakery-general-province.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          res = data.find(d => d.province === req.params.province);
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });
    } else {
      res = {
        numberOfTotalBakery: 108759,
        numberOfEnableBakery: 80665,
        numberOfDisableBakery: 1076,
        numberOfBakeryBanned: 27018,
        numberOfSamt: 75751,
        numberOfSima: 108759,
        numberOfActivePos: 82067,
        numberOfAvgSupplyFlour: 23594882.23,
        numberOfBakeryWithoutPos: 21803,
        numberOfAudit: 19478,

        numberOfTransactionPerDay: 12390,
        numberOfTransaction: 17814,
        numberOfPosActiveTime: 11505,
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
        {category: 'لواش', total: 26380},
        {category: 'بربري', total: 21739},
        {category: 'سنگک', total: 9811},
        {category: 'تافتون', total: 9409},
        {category: 'تافتون ماشيني', total: 3857},
        {category: 'فانتزي', total: 2931},
        {category: 'ساير نان هاي سنتي', total: 1646},
        {category: 'نان تافتون سنتي', total: 1122},
        {category: 'تافتون تنوري', total: 1022},
        {category: 'تنوري سنتي', total: 851},
        {category: 'حجیم و نیمه حجیم', total: 829},
        {category: 'ماشيني', total: 714},
        {category: 'دوار', total: 688},
        {category: 'خشکه پزی', total: 546},
        {category: 'حرارت غيرمستقيم', total: 505},
        {category: 'سنتي', total: 228},
        {category: 'تنوري', total: 204},
        {category: 'خام پز', total: 189},
        {category: 'نان محلی', total: 101},
        {category: 'نانوايي ماشيني', total: 90},
        {category: 'صنعتی', total: 50},
        {category: 'ساير', total: 46},
        {category: 'نان روغني', total: 44},
        {category: 'خانه پز', total: 41},
        {category: 'صمون پزي', total: 37},
        {category: 'مجتمع', total: 36},
        {category: 'خشکه پز', total: 28},
        {category: 'تافتون خراساني', total: 22},
        {category: 'نان حجمي و نيمه حجمي', total: 11},
        {category: 'ماشيني سبوس دار', total: 1},
        {category: 'نيمه حجيم', total: 1},
        {category: 'بولکي', total: 1},
        {category: 'اسکو', total: 1},
      ];

    return [200, [...response]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/license/g, {})
  .reply(async () => {
    let res: any[] = [];
    await fetch(`${process.env.PUBLIC_URL}/assets/bakery-licence.data.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any[]) => {
        res = data;
      })
      .catch((err: any) => {
        return [500, {error: err}];
      });

    return [200, [...res]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/active\-time/g, {})
  .reply(async () => {
    let res: any[] = [];
    await fetch(`${process.env.PUBLIC_URL}/assets/bakery-active-time.data.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any[]) => {
        res = data;
      })
      .catch((err: any) => {
        return [500, {error: err}];
      });

    return [200, [...res]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/sell\-rate/g, {})
  .reply(async () => {
    let res: any[] = [];
    await fetch(`${process.env.PUBLIC_URL}/assets/bakery-sell-rate.data.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: any) => {
        return response.json();
      })
      .then((data: any[]) => {
        res = data;
      })
      .catch((err: any) => {
        return [500, {error: err}];
      });

    return [200, [...res]];
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
  .reply(async req => {
    let res: any[] = [];
    if (!req.params.province) {
      await fetch(`${process.env.PUBLIC_URL}/assets/bakery-audit.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          res = data;
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });
    }

    return [200, [...res]];
  });
