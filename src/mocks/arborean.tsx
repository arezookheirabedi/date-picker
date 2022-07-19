import {instanceMockAdapter} from '../helpers/requestUtil';

instanceMockAdapter.onGet(/\/api\/v1\/arborean\/all/g)
  .reply(async () => {
    let res: any = [];
      res = {
        totalNumberOfRegistrants: 12097,
        totalOfRequest: 11166,
        totalNumberOfEvent: 11084,
        totalNumberOfPilgrims: 12097,
        numberOfForeignPilgrims: 12097,
        percentOfForeignPilgrims: 26,
        numberOfRequestRejections: 11084,
        totalServicesProvided: 12097,
        totalNumberOfAirPilgrims: 11166,
        totalNumberOfEarthlyPilgrims: 11084,
        totalNumberOfRailPilgrims: 65,
        numberOfPositiveThings: 11084,
        numberOfInfectionPercent : 6,
        numberOfPositiveTests: 11166,
        numberOfQueries: 12097,
        numberOfVaccinatedPilgrims: 12097,
        numberOfPilgrimsNotVaccinated: 11166,
        totalNumberOfPeoplewithFirstDose : 11084,
        totalNumberOfPeoplewithSecondDose : 65,
        totalNumberOfPeoplewithThirdDose: 12097,
        totalNumberOfPeoplewithFourthDose : 11166,
        totalNumberOfPeoplewithFifthDose: 11084
      };

    return [200, {...res}];
  });