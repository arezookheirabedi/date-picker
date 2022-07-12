import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {getProvinceParam, sideCities} from 'src/helpers/utils';
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
import useHasProvinceResource from "../../hooks/useHasProvinceResource";
import AccessDenied from "../../components/Access/AccessDenied";

const RecruitmentProvince = () => {
  const location = useLocation();
  const history = useHistory()
  const [cityTitle, setCityTitle] = useState();

  const [hasProvinceResources] = useHasProvinceResource();

  useEffect(() => {
    if (getProvinceParam()) {
      setCityTitle(getProvinceParam());
    } else {
      history.push('/dashboard/health/recruitment/province')
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="recruitment-overview"
        selectDefault
      />

      {!hasProvinceResources && <AccessDenied id="recruitment-overview"/>}
      {hasProvinceResources && (
        <>
          <OverviewProvince cityTitle={cityTitle}/>
          <OverviewCategoriesProvince cityTitle={cityTitle}/>
          <OverviewPatientsProvince cityTitle={cityTitle}/>
          <OverviewOfGovernmentEmployeesVaccinationProcessProvince cityTitle={cityTitle}/>
          <OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCardProvince cityTitle={cityTitle}/>
          <OverviewOfTheLatestGovernmentEmployeesVaccinationStatusProvince cityTitle={cityTitle}/>
          <OverviewOfVaccinationProvince cityTitle={cityTitle}/>
          <TestStatusProvince cityTitle={cityTitle}/>
        </>
      )}

      {/* deprecated */}
      {/* <OverviewOfVaccinationProvince cityTitle={cityTitle}/> */}
      {/*  <TestsStatusProvince cityTitle={cityTitle} /> */}
    </div>
  );
};

export default RecruitmentProvince;
