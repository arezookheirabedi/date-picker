import React from 'react';

import Overview from '../../components/Recruitment/public/Overview';
import OverviewCategories from '../../components/Recruitment/public/OverviewCategories';
import OverviewVaccinePerProvince from '../../components/Recruitment/public/OverviewVaccinePerProvince';
import OverviewPatients from '../../components/Recruitment/public/OverviewPatients';
import OverviewOfVaccination from '../../components/Recruitment/public/OverviewOfVaccination';
import TestStatus from '../../components/Recruitment/public/TestStatus';

const Recruitment: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      <Overview/>
      <OverviewCategories/>
      <OverviewVaccinePerProvince/>
      <OverviewPatients/>
      <OverviewOfVaccination/>
      <TestStatus/>
    </div>
  );
};

export default Recruitment;
