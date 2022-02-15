import React from 'react';

// import OverviewSchool from '../../components/School/public/Overview';
import OverviewSchoolEmploye from '../../components/School/public/OverviewSchoolEmploye';
import OverviewSchoolStudent from '../../components/School/public/OverviewSchoolStudent';
import OverviewCategories from '../../components/School/public/OverviewCategories';
import OverviewPatients from '../../components/School/public/OverviewPatients';
import OverviewOfVaccination from '../../components/School/public/OverviewOfVaccination';
import TestStatus from '../../components/School/public/TestStatus';

// import IconWrapper from "../../components/IconWrapper";
const School: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      {/* <OverviewSchool /> */}
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
