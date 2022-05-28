import React from 'react';
import OverviewToVaccinationStatus from 'src/components/School/public/OverviewSchoolVaccinationStatus';
import OverviewDepartmentEmploye from 'src/components/School/public/OverviewDepartmentEmploye';
import OverviewEducationalEmploye from 'src/components/School/public/OverviewEducationalEmploye';
import OverviewOfVaccinationProcess from 'src/components/School/public/OverviewOfVaccinationProcess';
import OverviewSchoolsPositivePcr from 'src/components/School/public/OverviewSchoolsPositivePcr';
import OverviewSteudent from 'src/components/School/public/OverviewSteudent';
import OverviewPositivePcrPercentage from 'src/components/School/public/OverviewPositivePcrPercentage';
import OverviewVaccination from 'src/components/School/public/OverviewSchoolVaccination';
import TheLatestOverwiewOfVaccination from 'src/components/School/public/TheLatestSchoolOverwiewOfVaccination';
import OverviewSchoolsVaccinationPercentagePerGrade from 'src/components/School/public/OverviewSchoolsVaccinationPercentagePerGrade';
import TestStatus from '../../components/School/public/TestStatus';
import OverviewCategories from '../../components/School/public/OverviewCategories';

const School: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">


      <OverviewEducationalEmploye />
      <OverviewDepartmentEmploye />
      <OverviewSteudent />
      <OverviewCategories />
      <OverviewSchoolsPositivePcr />
      <OverviewOfVaccinationProcess />
      <TheLatestOverwiewOfVaccination />
      <OverviewPositivePcrPercentage />
      <OverviewSchoolsVaccinationPercentagePerGrade /> 
       <OverviewVaccination /> 
       <OverviewToVaccinationStatus /> 
      <TestStatus /> 
    </div>
  );
};

export default School;
