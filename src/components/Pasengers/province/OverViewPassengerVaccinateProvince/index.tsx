import React from 'react';
import OverviewPasengersStatusVacsinateTable from './OverviewPasengersStatusVaccinateTable';
import OverviewPassengerVaccinateCard from './OverviewPasengersVaccinateCard';

interface OverviewPassengerVaccinateProps {
  cityTitle: any;
}
const OverviewPassengerVaccinate: React.FC<OverviewPassengerVaccinateProps> = ({cityTitle}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به واکسیناسیون مسافران در استان &nbsp;
        {cityTitle}
      </legend>

      <OverviewPassengerVaccinateCard />
      <OverviewPasengersStatusVacsinateTable />
    </fieldset>
  );
};

export default OverviewPassengerVaccinate;
