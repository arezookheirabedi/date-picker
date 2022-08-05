import {instanceMockAdapter} from '../helpers/requestUtil';

instanceMockAdapter.onGet(/\/api\/v1\/inspection\/status/g)
  .reply(async () => {
    let res: any = [];
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

    return [200, {...res}];
  });

  instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/inspection\/all/g)
  .reply(async () => {
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
          res = data;
        })
        .catch((err: any) => {
          return [500, {error: err}];
        });

    return [200, [...res]];
  });