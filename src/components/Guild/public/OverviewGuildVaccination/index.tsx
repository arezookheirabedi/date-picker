import React from 'react';
import OverviewGuildVaccinationCard from './OverviewGuildVaccinationCard';
import OverviewOfVaccinationTable from './OverviewOfVaccinationTable';

const OverviewVaccination: React.FC<{}> = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3"> نگاه کلی واکسیناسیون در اصناف کل کشور</legend>

      <OverviewGuildVaccinationCard />
      <OverviewOfVaccinationTable />
    </fieldset>
  );
};

export default OverviewVaccination;
