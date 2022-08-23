import {instanceMockAdapter} from '../helpers/requestUtil';

instanceMockAdapter.onGet(/\/api\/v1\/inspection\/status/g, {province: /.*/})
  .reply(async (req: any) => {
    let res: any = [];

    if (req.params.province) {
      await fetch(`${process.env.PUBLIC_URL}/assets/inspection-status-province.data.json`, {
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
        totalNumberOfInspectionsPerformed : 12097,
        totalNumberOfInspectors : 11166,
        numberOfInspectedUnitsWithBusinessLicense : 11084,
        numberOfInspectedUnitsWithoutBusinessLicense: 12097,
        totalNumberOfInspectedWorkers : 12097,
        averageObservedFlourOfInspectedUnits : 302,
        totalNumberOfBakedBreadsOfInspectedUnits : 11084,
        totalUnitsSubjectToInspection : 857
      };
    }

    return [200, {...res}];
  });

  instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/inspection\/all/g, {province: /.*/})
  .reply(async (req : any) => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/inspection.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          if (req.params.province) {
            res = data.filter(d => d.province === req.params.province);
          } else {
            res = data
          }
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });

    return [200, [...res]];
  });

  instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/inspection\/average\-flour/g, {})
  .reply(async () => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/inspection-average-flour.data.json`, {
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
  .onGet(/\/api\/v1\/inspection\/ratio/g, {})
  .reply(async () => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/ratio-of-inspection.data.json`, {
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
  .onGet(/\/api\/v1\/inspection\/done/g, {province: /.*/})
  .reply(async (req : any) => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/inspection-done.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          if (req.params.province) {
            res = data.filter(d => d.province === req.params.province);
          } else {
            res = data
          }
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });

    return [200, [...res]];
  });
  
  instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/inspection\/report/g, {province: /.*/})
  .reply(async (req : any) => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/report-inspected-units.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          if (req.params.province) {
            res = data.filter(d => d.province === req.params.province);
          } else {
            res = data
          }
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });

    return [200, [...res]];
  });

  instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/inspection\/cooking\-variety/g, {province: /.*/})
  .reply(async (req : any) => {
    let res: any[] = [];
      await fetch(`${process.env.PUBLIC_URL}/assets/status-of-cooking-variety.data.json`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response: any) => {
          return response.json();
        })
        .then((data: any[]) => {
          if (req.params.province) {
            res = data.filter(d => d.province === req.params.province);
          } else {
            res = data
          }
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });

    return [200, [...res]];
  });  