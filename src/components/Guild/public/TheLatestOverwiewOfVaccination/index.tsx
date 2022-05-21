import React from 'react';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicGuildVaccinationStatus from './OverviewOfTheLatestPublicGuildVaccinationStatus';

const TheLatestOverwiewOfVaccination: React.FC<{}> = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی به آخرین وضعیت واکسیناسیون اصناف
      </legend>

      <LatestOverviewOfStatusCard />
      <OverviewOfTheLatestPublicGuildVaccinationStatus />
    </fieldset>
  );
};

export default TheLatestOverwiewOfVaccination;
