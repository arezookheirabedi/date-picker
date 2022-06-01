import React from 'react';
import OverviewVaccinationCard from './OverviewVaccinationCard';
import OverviewOfVaccinationTable from './OverviewOfVaccinationTable';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const OverviewVaccination: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی واکسیناسیون در آموزش و پرورش در استان {cityTitle}
      </legend>

      <OverviewVaccinationCard />
      <OverviewOfVaccinationTable />
    </fieldset>
  );
};

export default OverviewVaccination;
