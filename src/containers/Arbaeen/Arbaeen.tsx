import React from 'react';

import OverviewPilgrimVaccineStatus from 'src/components/Arbaeen/public/OverviewPilgrimVaccineStatus';
import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheEntryAndExitOfPilgrims';
import OverviewOfThePercentageOfEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
import GeneralLookAtTransportationAxesAndExitBordersOfCountry from 'src/components/Arbaeen/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry';
import MokebList from 'src/components/Arbaeen/public/MokebList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCitiesList';
import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCountriesList';
import RedHalalBasesList from 'src/components/Arbaeen/public/RedHalalBasesList';
import OverviewPilgrim from 'src/components/Arbaeen/public/OverviewPilgrim';
import OverviewPligrimTripType from 'src/components/Arbaeen/public/OverviewPligrimTripType';
import OverviewPilgrimHelthStatus from 'src/components/Arbaeen/public/OverviewPilgrimHelthStatus';
import ListOfTheBusiestBorderCrossings from '../../components/Arbaeen/public/ListOfTheBusiestBorderCrossings';
import ListOfTransportationAxesStatus from '../../components/Arbaeen/public/ListOfTransportationAxesStatus';
import GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims from '../../components/Arbaeen/public/GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims';
import GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases';

const Arbaeen = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPilgrim />
      <OverviewPligrimTripType />
      <OverviewPilgrimHelthStatus />
      <OverviewPilgrimVaccineStatus />
      <OverviewOfTheLatestVaccinationStatusOfPilgrims />
      <OverviewOfTheEntryAndExitOfPilgrims />
      <OverviewOfThePercentageOfEntryAndExitOfPilgrims />
      <GeneralLookAtTransportationAxesAndExitBordersOfCountry />
      <ListOfTheBusiestBorderCrossings />
      <ListOfTransportationAxesStatus />
      <GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims />
      <GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases />

      <MokebList />
      <RedHalalBasesList />
      <TheLargestNumberOfOriginPilgrimsCitiesList />
      <TheLargestNumberOfOriginPilgrimsCountriesList />
    </div>
  );
};

export default Arbaeen;
