import React from 'react';
import MokebList from 'src/components/Arbaeen/public/MokebList';
import RedHalalBasesList from 'src/components/Arbaeen/public/RedHalalBasesList';
import TheLargestNumberOfOriginPilgrimsCitiesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCitiesList';
import TheLargestNumberOfOriginPilgrimsCountriesList from 'src/components/Arbaeen/public/TheLargestNumberOfOriginPilgrimsCountriesList';
import OverviewArbaeen from '../../components/Arbaeen/public/OverviewArbaeen';

const Arbaeen = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewArbaeen />
      <MokebList />
      <RedHalalBasesList />
      <TheLargestNumberOfOriginPilgrimsCitiesList />
      <TheLargestNumberOfOriginPilgrimsCountriesList />
    </div>
  );
};

export default Arbaeen;
