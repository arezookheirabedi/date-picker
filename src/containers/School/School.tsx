import React from 'react';

import OverviewSchool from '../../components/School/Overview';
import OverviewSchoolEmploye from '../../components/School/OverviewSchoolEmploye';
import OverviewSchoolStudent from '../../components/School/OverviewSchoolStudent';
import OverviewCategories from '../../components/School/OverviewCategories';
import OverviewPatients from '../../components/School/OverviewPatients';
import OverviewOfVaccination from '../../components/School/OverviewOfVaccination';
import TestStatus from '../../components/School/TestStatus';

// import IconWrapper from "../../components/IconWrapper";
const School: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewSchool />
      <OverviewSchoolEmploye />
      <OverviewSchoolStudent />
      <OverviewCategories />
      <OverviewPatients />
      <OverviewOfVaccination />
      <TestStatus />
    </div>
  );
};

export default School;
