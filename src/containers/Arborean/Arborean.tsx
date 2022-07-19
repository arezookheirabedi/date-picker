import React from 'react';
import MokebList from 'src/components/Arborean/public/MokebList';
import OverviewArborean from 'src/components/Arborean/public/OverviewArborean';

const Arborean = () => {

  return (
    <div className="space-y-16 mb-8">
      <OverviewArborean />
      <MokebList/>
    </div>
  );
};

export default Arborean;
