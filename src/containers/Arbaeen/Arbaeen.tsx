/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
// import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
// import OverviewArbaeen from 'src/components/Arbaeen/public/OverviewArbaeen';
import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheEntryAndExitOfPilgrims';
// import OverviewOfThePercentageOfEntryAndExitOfPilgrims from 'src/components/Arbaeen/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
// import GeneralLookAtTransportationAxesAndExitBordersOfCountry from 'src/components/Arbaeen/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry';
import MokebList from 'src/components/Arbaeen/public/MokebList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arbaeen/public/ThPilgrimsProvinceList';
// import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCountriesList';
// import RedHalalBasesList from 'src/components/Arbaeen/public/RedHalalBasesList';
// import OverviewPilgrimHelthStatus from 'src/components/Arbaeen/public/OverviewPilgrimHelthStatus';
import OverviewPilgrimGenderByProvince from 'src/components/Arbaeen/public/OverviewPilgrimGenderByProvince';
import OverviewPligrimGroundTripType from 'src/components/Arbaeen/public/OverviewPligrimGroundTripType';
// import OverviewOfTheLatestVaccinationStatusOfPilgrims from 'src/components/Arbaeen/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
import ComparsionPasengersEntranceAndExistanceAtBoarders from 'src/components/Arbaeen/public/ComparsionPasengersEntranceAndExistanceAtBoarders';
import OverviewTheLatestStatusGroundBorders from 'src/components/Arbaeen/public/OverviewTheLatestStatusGroundBorders';
// import ListOfTheBusiestBorderCrossings from '../../components/Arbaeen/public/ListOfTheBusiestBorderCrossings';
import EmergencyList from 'src/components/Arbaeen/public/EmergencyList';
import ParckingList from 'src/components/Arbaeen/public/ParckingList';
import OverviewPilgrimPercentagePerProvince from 'src/components/Arbaeen/public/OverviewPilgrimPercentagePerProvince';
import OverviewPilgrim from 'src/components/Arbaeen/public/overviewPilgrim';
import OverviewPligrimTripType from 'src/components/Arbaeen/public/OverviewPligrimTripType';
import OverviewRegisterVaccinesInfo from 'src/components/Arbaeen/public/OverviewRegisterVaccinesInfo';
import OverviewLatestVaccinesInfo from 'src/components/Arbaeen/public/OverviewLatestVaccinesInfo';
import OverviewOfExistBorder from 'src/components/Arbaeen/public/OverviewOfExistBorder';
import OverviewPilgrimAge from 'src/components/Arbaeen/public/OverviewPilgrimAge';
import ListOfTransportationAxesStatus from '../../components/Arbaeen/public/ListOfTransportationAxesStatus';
import GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims from '../../components/Arbaeen/public/GeneralLookAtTheProcessOfTheEntryAndExitOfPilgrims';
// import GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases from '../../components/Arbaeen/public/GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases';

const Arbaeen = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPilgrim />
      <OverviewPligrimTripType />

      <OverviewPligrimGroundTripType />
      {/* <OverviewPilgrimHelthStatus /> */}
      <OverviewRegisterVaccinesInfo />
      <OverviewLatestVaccinesInfo />

      {/* <OverviewOfTheLatestVaccinationStatusOfPilgrims /> */}

      <OverviewOfExistBorder />
      <OverviewPilgrimAge />
      <OverviewPilgrimGenderByProvince />
      <OverviewPilgrimPercentagePerProvince />
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
      <ParckingList />
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
