import React from 'react';

import OverviewArbaeen from 'src/components/Arbaeen/public/OverviewArbaeen';
import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheEntryAndExitOfPilgrims';
import OverviewOfThePercentageOfEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
import GeneralLookAtTransportationAxesAndExitBordersOfCountry from 'src/components/Arbaeen/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry';
import ListOfTheBusiestBorderCrossings from '../../components/Arbaeen/public/ListOfTheBusiestBorderCrossings';
import ListOfTransportationAxesStatus from '../../components/Arbaeen/public/ListOfTransportationAxesStatus';
import GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims from '../../components/Arbaeen/public/GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims';
import GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases';

const Arbaeen = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewArbaeen />
      <OverviewOfTheLatestVaccinationStatusOfPilgrims />
      <OverviewOfTheEntryAndExitOfPilgrims />
      <OverviewOfThePercentageOfEntryAndExitOfPilgrims />
      <GeneralLookAtTransportationAxesAndExitBordersOfCountry />
      <ListOfTheBusiestBorderCrossings />
      <ListOfTransportationAxesStatus />
      <GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims />
      <GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases />
    </div>
  );
};

export default Arbaeen;
