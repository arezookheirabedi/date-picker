import React from 'react';
import OverviewGuildVaccinationCard from './OverviewGuildVaccinationCard';
import OverviewOfVaccinationTable from './OverviewOfVaccinationTable';

interface IOverviewVaccination {
  cityTitle?: any;
}
const OverviewVaccination: React.FC<IOverviewVaccination> = ({cityTitle}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی واکسیناسیون در اصناف استان {cityTitle}{' '}
      </legend>

      <OverviewGuildVaccinationCard />
      <OverviewOfVaccinationTable />
    </fieldset>
  );
};

export default OverviewVaccination;
