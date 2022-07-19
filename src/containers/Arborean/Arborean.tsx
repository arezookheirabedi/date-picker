import React from 'react';
import MokebList from 'src/components/Arborean/public/MokebList';
import OverviewArborean from 'src/components/Arborean/public/OverviewArborean';
import RedHalalBasesList from 'src/components/Arborean/public/RedHalalBasesList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arborean/public/TheLargestNumberOfOriginPilgrimsCitiesList';
import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arborean/public/TheLargestNumberOfOriginPilgrimsCountriesList';

const Arborean = () => {

  return (
    <div className="space-y-16 mb-8">
      <OverviewArborean />
      <MokebList/>
      <RedHalalBasesList/>
      <TheLargestNumberOfOriginPilgrimsCitiesList/>
      <TheLargestNumberOfOriginPilgrimsCountriesList/>
    </div>
  );
};

export default Arborean;
