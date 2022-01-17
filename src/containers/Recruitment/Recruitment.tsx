import React from 'react';

import Overview from '../../components/Recruitment/Overview';
// import OverviewCategories from '../../components/Recruitment/OverviewCategories';
// import OverviewVaccinePerProvince from '../../components/Recruitment/OverviewVaccinePerProvince';
// import OverviewPatients from '../../components/Recruitment/OverviewPatients';
import OverviewOfVaccination from '../../components/Recruitment/OverviewOfVaccination';
// import TestStatus from '../../components/Recruitment/TestStatus';

const Recruitment: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      <Overview/>
      {/* <OverviewCategories/> */}
      {/* <OverviewVaccinePerProvince/> */}
      {/* <OverviewPatients/> */}
      <OverviewOfVaccination/>
      {/* <TestStatus/> */}
    </div>
  );
};

export default Recruitment;
