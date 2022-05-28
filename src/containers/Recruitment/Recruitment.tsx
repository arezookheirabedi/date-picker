import React from 'react';

import Overview from '../../components/Recruitment/public/Overview';
import OverviewCategories from '../../components/Recruitment/public/OverviewCategories';
import OverviewVaccinePerProvince from '../../components/Recruitment/public/OverviewVaccinePerProvince';
import OverviewPatients from '../../components/Recruitment/public/OverviewPatients';
import OverviewOfVaccination from '../../components/Recruitment/public/OverviewOfVaccination';
import TestStatus from '../../components/Recruitment/public/TestStatus';
import OverviewOfGovernmentEmployeesVaccinationProcess from '../../components/Recruitment/public/OverviewOfGovernmentEmployeesVaccinationProcess';
import OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard from '../../components/Recruitment/public/OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard';
import OverviewOfTheLatestGovernmentEmployeesVaccinationStatus from '../../components/Recruitment/public/OverviewOfTheLatestGovernmentEmployeesVaccinationStatus';
import OverviewOfPercentageOfGovernmentEmployeesInEachProvince from '../../components/Recruitment/public/OverviewOfPercentageOfGovernmentEmployeesInEachProvince';

const Recruitment: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      <Overview />
      <OverviewCategories />
      <OverviewPatients />
      <OverviewOfGovernmentEmployeesVaccinationProcess />
      <OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard />
      <OverviewOfTheLatestGovernmentEmployeesVaccinationStatus />
      <OverviewOfPercentageOfGovernmentEmployeesInEachProvince />
      <OverviewOfVaccination />
      <OverviewVaccinePerProvince />
      <TestStatus />
    </div>
  );
};

export default Recruitment;
