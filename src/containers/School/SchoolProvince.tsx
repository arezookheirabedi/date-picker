import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import OverviewEducationalEmployeProvince from 'src/components/School/province/OverviewEducationalEmployeProvince';
import OverviewMap from 'src/components/School/province/OverviewMap';
import OverviewSchoolEmployeProvince from 'src/components/School/province/OverviewSchoolEmployeProvince';
import OverviewSchoolStudentProvince from 'src/components/School/province/OverviewSchoolStudentProvince';
import OverviewPatientsProvince from 'src/components/School/province/OverviewPatientsProvince';
import OverviewOfVaccinationProcessProvince from 'src/components/School/province/OverviewOfVaccinationProcessProvince';
import TheLatestSchoolOverwiewOfVaccinationProvince from 'src/components/School/province/TheLatestSchoolOverwiewOfVaccinationProvince';
import OverviewPositivePcrPercentageProvince from 'src/components/School/province/OverviewPositivePcrPercentageProvince';
import OverviewSchoolsVaccinationPercentagePerGradeProvince from 'src/components/School/province/OverviewSchoolsVaccinationPercentagePerGradeProvince';
import OverviewSchoolVaccinationProvince from 'src/components/School/province/OverviewSchoolVaccinationProvince';
import TestsStatusProvince from '../../components/School/province/TestStatusProvince';
import OverviewCategoriesProvince from '../../components/School/province/OverviewCategoriesProvince';

const SchoolProvince = () => {
  const location = useLocation();
  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    // console.log(provinceName)
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
        destinationId="school-overview"
        selectDefault
      />

      <OverviewEducationalEmployeProvince cityTitle={cityTitle} />
      <OverviewSchoolEmployeProvince cityTitle={cityTitle} />
      <OverviewSchoolStudentProvince cityTitle={cityTitle} />
      <OverviewCategoriesProvince cityTitle={cityTitle} />
      <OverviewPatientsProvince cityTitle={cityTitle} />
      <OverviewOfVaccinationProcessProvince cityTitle={cityTitle} /> */}
      <TheLatestSchoolOverwiewOfVaccinationProvince cityTitle={cityTitle} />
       <OverviewPositivePcrPercentageProvince cityTitle={cityTitle} />
      <OverviewSchoolsVaccinationPercentagePerGradeProvince cityTitle={cityTitle} />
      <OverviewSchoolVaccinationProvince cityTitle={cityTitle} />
      <TestsStatusProvince cityTitle={cityTitle} /> 
    </div>
  );
};

export default SchoolProvince;
