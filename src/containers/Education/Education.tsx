import React from 'react';

// import avatar from "../../assets/images/logos/avatar.svg";
import OverviewCategories from '../../components/Education/OverviewCategories';
import OverviewPatients from '../../components/Education/OverviewPatients';
import OverviewOfVaccination from '../../components/Education/OverviewOfVaccination';
import TestStatus from '../../components/Education/TestStatus';
import OverviewRecruitment from '../../components/Education/OverviewRecruitment';

// import IconWrapper from "../../components/IconWrapper";
const Education = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewRecruitment />
      <OverviewCategories />
      <OverviewPatients />
      <OverviewOfVaccination />
      <TestStatus />
    </div>
  );
};

export default Education;
