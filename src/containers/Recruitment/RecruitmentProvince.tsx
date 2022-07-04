import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import {useLocation} from "react-router-dom";
import {sideCities} from 'src/helpers/utils';
import OverviewMap from '../../components/Recruitment/province/OverviewMap';
import OverviewProvince from '../../components/Recruitment/province/OverviewProvince';
// import OverviewOfVaccination from "../../components/Recruitment/public/OverviewOfVaccination";
// import OverviewOfVaccinationProvince from "../../components/Recruitment/province/OverviewOfVaccinationProvince";
import TestStatusProvince from "../../components/Recruitment/province/TestStatusProvince";
import OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCardProvince
  from "../../components/Recruitment/province/OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCardProvince";
import OverviewOfTheLatestGovernmentEmployeesVaccinationStatusProvince
  from "../../components/Recruitment/province/OverviewOfTheLatestGovernmentEmployeesVaccinationStatusProvince";
import OverviewPatientsProvince from '../../components/Recruitment/province/OverviewPatientsProvince';
// import TestsStatusProvince from '../../components/Recruitment/province/TestStatusProvince';
import OverviewCategoriesProvince from '../../components/Recruitment/province/OverviewCategoriesProvince';
import OverviewOfVaccinationProvince from '../../components/Recruitment/province/OverviewOfVaccinationProvince';
import OverviewOfGovernmentEmployeesVaccinationProcessProvince
  from '../../components/Recruitment/province/OverviewOfGovernmentEmployeesVaccinationProcessProvince';

const RecruitmentProvince = () => {
  const location = useLocation();
  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="recruitment-overview"
        // selectDefault
      />


      <OverviewProvince cityTitle={cityTitle}/>
      <OverviewCategoriesProvince cityTitle={cityTitle}/>
      <OverviewPatientsProvince cityTitle={cityTitle}/>
      <OverviewOfGovernmentEmployeesVaccinationProcessProvince cityTitle={cityTitle}/>
      <OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCardProvince cityTitle={cityTitle}/>
      <OverviewOfTheLatestGovernmentEmployeesVaccinationStatusProvince cityTitle={cityTitle}/>
      <OverviewOfVaccinationProvince cityTitle={cityTitle}/>
      <TestStatusProvince cityTitle={cityTitle}/>

      {/* deprecated */}
      {/* <OverviewOfVaccinationProvince cityTitle={cityTitle}/> */}
      {/*  <TestsStatusProvince cityTitle={cityTitle} /> */}
    </div>
  );
};

export default RecruitmentProvince;
