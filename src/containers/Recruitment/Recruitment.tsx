import React from 'react';

// import avatar from "../../assets/images/logos/avatar.svg";
import OverviewCategories from '../../components/Recruitment/OverviewCategories';
import OverviewPatients from '../../components/Recruitment/OverviewPatients';
import OverviewOfVaccination from '../../components/Recruitment/OverviewOfVaccination';
import TestStatus from '../../components/Recruitment/TestStatus';
import OverviewRecruitment from '../../components/Recruitment/OverviewRecruitment';
import OverviewVaccinePerProvince from '../../components/Recruitment/OverviewVaccinePerProvince';

// import IconWrapper from "../../components/IconWrapper";
const Recruitment = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewRecruitment />
      <OverviewCategories />
      <OverviewVaccinePerProvince />
      <OverviewPatients />
      <OverviewOfVaccination />
      <TestStatus />
    </div>
  );
};

export default Recruitment;
