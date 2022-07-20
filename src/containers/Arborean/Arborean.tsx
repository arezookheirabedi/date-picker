import React from 'react';
import OverviewArborean from 'src/components/Arborean/public/OverviewArborean';
import OverviewOfTheLatestVaccinationStatusOfPilgrims
  from 'src/components/Arborean/public/OverviewOfTheLatestVaccinationStatusOfPilgrims';
import OverviewOfTheEntryAndExitOfPilgrims from 'src/components/Arborean/public/OverviewOfTheEntryAndExitOfPilgrims';
import OverviewOfThePercentageOfEntryAndExitOfPilgrims
  from 'src/components/Arborean/public/OverviewOfThePercentageOfEntryAndExitOfPilgrims';
import GeneralLookAtTransportationAxesAndExitBordersOfCountry
  from 'src/components/Arborean/public/GeneralLookAtTransportationAxesAndExitBordersOfCountry'

const Arborean = () => {

  return (
    <div className="space-y-16 mb-8">
      <OverviewArborean/>
      <OverviewOfTheLatestVaccinationStatusOfPilgrims/>
      <OverviewOfTheEntryAndExitOfPilgrims/>
      <OverviewOfThePercentageOfEntryAndExitOfPilgrims/>
      <GeneralLookAtTransportationAxesAndExitBordersOfCountry/>
    </div>
  );
};

export default Arborean;
