import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchZaerinAc } from 'src/store/action_creators/arbaeen/fetchZaerinAc';
import OverviewPilgrimVaccineStatus from 'src/components/Arbaeen/public/OverviewPilgrimVaccineStatus';
// import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';

// import OverviewArbaeen from 'src/components/Arbaeen/public/OverviewArbaeen';

import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheEntryAndExitOfPilgrims';
import OverviewOfThePercentageOfEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
// import GeneralLookAtTransportationAxesAndExitBordersOfCountry from 'src/components/Arbaeen/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry';
import MokebList from 'src/components/Arbaeen/public/MokebList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arbaeen/public/ThPilgrimsProvinceList';
import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCountriesList';
import RedHalalBasesList from 'src/components/Arbaeen/public/RedHalalBasesList';
import OverviewPilgrim from 'src/components/Arbaeen/public/OverviewPilgrim';
import OverviewPligrimTripType from 'src/components/Arbaeen/public/OverviewPligrimTripType';
import OverviewPilgrimHelthStatus from 'src/components/Arbaeen/public/OverviewPilgrimHelthStatus';
import OverviewOfExistBorders from 'src/components/Arbaeen/public/OverviewOfExistBorders';
import OverviewPilgrimGenderByProvince from 'src/components/Arbaeen/public/OverviewPilgrimGenderByProvince';
import OverviewPligrimAge from 'src/components/Arbaeen/public/OverviewPligrimAge';
import ListOfTheBusiestBorderCrossings from '../../components/Arbaeen/public/ListOfTheBusiestBorderCrossings';
import ListOfTransportationAxesStatus from '../../components/Arbaeen/public/ListOfTransportationAxesStatus';
import GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims from '../../components/Arbaeen/public/GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims';
// import GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases';
import GeneralLookAtTheLocationOfProcessions from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessions';
import FilterMap from '../../components/Arbaeen/public/FilterMap';
import DensityOfPassengersMap from '../../components/Arbaeen/public/DensityOfPassengersMap';
import TimelineMap from '../../components/Arbaeen/public/TimelineMap';


const Arbaeen = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchZaerinAc());
  }, []);


  return (
    <div className="space-y-16 mb-8">
      <FilterMap />
      <DensityOfPassengersMap />
      <TimelineMap />
      <GeneralLookAtTheLocationOfProcessions />
      <OverviewPilgrim />
      <OverviewPligrimTripType />
      <OverviewPilgrimHelthStatus />
      <OverviewPilgrimVaccineStatus />
      {/* <OverviewOfTheLatestVaccinationStatusOfPilgrims /> */}
      <OverviewOfExistBorders />
      <OverviewPligrimAge />
      <OverviewPilgrimGenderByProvince />
      <OverviewOfTheEntryAndExitOfPilgrims />
      <TheLargestNumberOfOriginPilgrimsCitiesList />
      <OverviewOfThePercentageOfEntryAndExitOfPilgrims />
      {/* <GeneralLookAtTransportationAxesAndExitBordersOfCountry /> */}
      <ListOfTheBusiestBorderCrossings />
      <ListOfTransportationAxesStatus />
      <GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims />
      {/* <GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases /> */}
      <MokebList />
      <RedHalalBasesList />

      <TheLargestNumberOfOriginPilgrimsCountriesList />
    </div>
  );
};

export default Arbaeen;
