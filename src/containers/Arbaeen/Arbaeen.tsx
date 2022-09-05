/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
import OverviewPilgrimVaccineStatus from 'src/components/Arbaeen/public/OverviewPilgrimVaccineStatus';
// import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
// import OverviewArbaeen from 'src/components/Arbaeen/public/OverviewArbaeen';
import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheEntryAndExitOfPilgrims';
// import OverviewOfThePercentageOfEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
// import GeneralLookAtTransportationAxesAndExitBordersOfCountry from 'src/components/Arbaeen/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry';
import MokebList from 'src/components/Arbaeen/public/MokebList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arbaeen/public/ThPilgrimsProvinceList';
// import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCountriesList';
// import RedHalalBasesList from 'src/components/Arbaeen/public/RedHalalBasesList';
import OverviewPilgrim from 'src/components/Arbaeen/public/OverviewPilgrim';
import OverviewPligrimTripType from 'src/components/Arbaeen/public/OverviewPligrimTripType';
// import OverviewPilgrimHelthStatus from 'src/components/Arbaeen/public/OverviewPilgrimHelthStatus';
import OverviewOfExistBorders from 'src/components/Arbaeen/public/OverviewOfExistBorders';
import OverviewPilgrimGenderByProvince from 'src/components/Arbaeen/public/OverviewPilgrimGenderByProvince';
import OverviewPligrimAge from 'src/components/Arbaeen/public/OverviewPligrimAge';
import TheLatestOverviewPilgrimVaccineStatus from 'src/components/Arbaeen/public/TheLatestOverviewPilgrimVaccineStatus';
import OverviewPligrimGroundTripType from 'src/components/Arbaeen/public/OverviewPligrimGroundTripType';
import OverviewOfExistBordersPercentage from 'src/components/Arbaeen/public/OverviewOfExistBordersPercentage';
import OverviewPligrimAgePercentage from 'src/components/Arbaeen/public/OverviewPligrimAgePercentage';
import OverviewPilgrimPercentage from 'src/components/Arbaeen/public/OverviewPilgrimPercentage';
import OverviewPligrimTripTypePercentage from 'src/components/Arbaeen/public/OverviewPligrimTripTypePercentage';
import OverviewPilgrimVaccineStatusPercentage from 'src/components/Arbaeen/public/OverviewPilgrimVaccineStatusPercentage';
// import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
import TheLatestOverviewPilgrimVaccineStatusPercentage from 'src/components/Arbaeen/public/TheLatestOverviewPilgrimVaccineStatusPercentage';
import ComparsionPasengersEntranceAndExistanceAtBoarders from 'src/components/Arbaeen/public/ComparsionPasengersEntranceAndExistanceAtBoarders';
import OverviewTheLatestStatusGroundBorders from 'src/components/Arbaeen/public/OverviewTheLatestStatusGroundBorders';
// import ListOfTheBusiestBorderCrossings from '../../components/Arbaeen/public/ListOfTheBusiestBorderCrossings';
import EmergencyList from 'src/components/Arbaeen/public/EmergencyList';
import ListOfTransportationAxesStatus from '../../components/Arbaeen/public/ListOfTransportationAxesStatus';
import GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims from '../../components/Arbaeen/public/GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims';
// import GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases';

const Arbaeen = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPilgrim />
      <OverviewPilgrimPercentage />
      <OverviewPligrimTripType />
      <OverviewPligrimTripTypePercentage />
      <OverviewPligrimGroundTripType />
      {/* <OverviewPilgrimHelthStatus /> */}
      <OverviewPilgrimVaccineStatus />
      <OverviewPilgrimVaccineStatusPercentage />
      <TheLatestOverviewPilgrimVaccineStatus />
      <TheLatestOverviewPilgrimVaccineStatusPercentage />
      {/* <OverviewOfTheLatestVaccinationStatusOfPilgrims /> */}
      <OverviewOfExistBorders />
      <OverviewOfExistBordersPercentage />

      <OverviewPligrimAge />
      <OverviewPligrimAgePercentage />
      <OverviewPilgrimGenderByProvince />
      <TheLargestNumberOfOriginPilgrimsCitiesList />
      <OverviewOfTheEntryAndExitOfPilgrims />
      {/* <OverviewOfThePercentageOfEntryAndExitOfPilgrims /> */}
      {/* <GeneralLookAtTransportationAxesAndExitBordersOfCountry /> */}
      <GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims />
      <ComparsionPasengersEntranceAndExistanceAtBoarders />
      <OverviewTheLatestStatusGroundBorders />
      <ListOfTransportationAxesStatus />
      {/* <ListOfTheBusiestBorderCrossings /> */}
      <MokebList />
      <EmergencyList />
      {/* <RedHalalBasesList /> */}
      {/* <TheLargestNumberOfOriginPilgrimsCountriesList /> */}
      <fieldset className=" rounded-xl border py-2 px-4 text-center">
        <div className=" flex justify-between">
          <div className="flex items-center justify-start">
            <img src={Irancell} className="inline" alt="irancell-logo" />
            <span className="px-2">باهمکاری ایرانسل</span>
          </div>
          <div>
            <img src={Vasl} className="inline " alt="vasl-logo" />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Arbaeen;
