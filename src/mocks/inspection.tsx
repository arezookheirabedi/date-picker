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