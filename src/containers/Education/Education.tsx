import React from 'react';

// import avatar from "../../assets/images/logos/avatar.svg";
import OverviewCategories from '../../components/Education/OverviewCategories';
import OverviewPatients from '../../components/Education/OverviewPatients';
import OverviewOfVaccination from '../../components/Education/OverviewOfVaccination';
import TestStatus from '../../components/Education/TestStatus';
import OverviewEducation from '../../components/Education/OverviewEducation';
import OverviewEducationEmploye from '../../components/Education/OverviewEducationEmploye';
import OverviewEducationStudent from '../../components/Education/OverviewEducationStudent';

// import IconWrapper from "../../components/IconWrapper";
const Education = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewEducation />
      <OverviewEducationEmploye />
      <OverviewEducationStudent />
      <OverviewCategories />
      <OverviewPatients />
      <OverviewOfVaccination />
      <TestStatus />
    </div>
  );
};

export default Education;
