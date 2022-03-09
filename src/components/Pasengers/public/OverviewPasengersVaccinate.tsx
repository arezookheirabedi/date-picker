import React from 'react';

import OverviewPasengersStatusVacsinateTable from './OverviewPasengersStatusVaccinateTable';

import OverviewPassengerVaccinateCard from './OverviewPasengersVaccinateCard';





const OverviewPassengerVaccinate: React.FC<{}> = () => {
 

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به واکسیناسیون مسافران کل کشور</legend>

     <OverviewPassengerVaccinateCard/>

      <OverviewPasengersStatusVacsinateTable />
    </fieldset>
  );
};

export default OverviewPassengerVaccinate;
