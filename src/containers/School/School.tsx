import React from 'react';
import OverviewDepartmentEmploye from 'src/components/School/public/OverviewDepartmentEmploye';
import OverviewEducationalEmploye from 'src/components/School/public/OverviewEducationalEmploye';
import OverviewOfVaccinationProcess from 'src/components/School/public/OverviewOfVaccinationProcess';
import TheLatestOverwiewOfVaccination from 'src/components/School/public/TheLatestOverwiewOfVaccination';
import OverviewPositivePcr from 'src/components/School/public/OverviewPositivePcr';
import OverviewSteudent from 'src/components/School/public/OverviewSteudent';

// import OverviewSchool from '../../components/School/public/Overview';
// import OverviewSchoolEmploye from '../../components/School/public/OverviewSchoolEmploye';
// import OverviewSchoolStudent from '../../components/School/public/OverviewSchoolStudent';
import OverviewPositivePcrPercentage from 'src/components/School/public/OverviewPositivePcrPercentage';
import OverviewVaccination from 'src/components/School/public/OverviewVaccination';
import OverviewCategories from '../../components/School/public/OverviewCategories';
// import OverviewPatients from '../../components/School/public/OverviewPatients';
// import OverviewOfVaccination from '../../components/School/public/OverviewOfVaccination';
// import TestStatus from '../../components/School/public/TestStatus';

// import IconWrapper from "../../components/IconWrapper";
const School: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      {/* <OverviewSchoolEmploye />
      <OverviewSchoolStudent />
      <OverviewCategories />
      <OverviewPatients />
      <OverviewOfVaccination />
      <TestStatus /> */}

      <OverviewEducationalEmploye />
      <OverviewDepartmentEmploye />
      <OverviewSteudent />
      <OverviewCategories />
      <OverviewPositivePcr />
      <OverviewOfVaccinationProcess />
      <TheLatestOverwiewOfVaccination />
      <OverviewPositivePcrPercentage />
      <OverviewVaccination />
    </div>
  );
};

export default School;

/* 
/*       {
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
          },
          stops: [
            [0, '#5F5B97'],
            [1, '#DDDCE9']
          ]
        },
        name: 'وضعیت پاسخ',
        type: 'column',
        data: props.charData
      },npm */
