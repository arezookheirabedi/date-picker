import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import {useLocation} from "react-router-dom";
import {sideCities} from 'src/helpers/utils';
import OverviewMap from '../../components/School/province/OverviewMap';
// import OverviewProvince from '../../components/School/province/OverviewProvince';
// import OverviewSchoolEmployeProvince from '../../components/School/province/OverviewSchoolEmployeProvince';
import OverviewSchoolStudentProvince from '../../components/School/province/OverviewSchoolStudentProvince';
import OverviewPatientsProvince from '../../components/School/province/OverviewPatientsProvince';
import TestsStatusProvince from '../../components/School/province/TestStatusProvince';
import OverviewCategoriesProvince from '../../components/School/province/OverviewCategoriesProvince';
import OverviewOfVaccinationProvince from '../../components/School/province/OverviewOfVaccinationProvince';

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
      />

      {/* <OverviewProvince cityTitle={cityTitle} /> */}
      {/* <OverviewSchoolEmployeProvince cityTitle={cityTitle} /> */}

      <OverviewSchoolStudentProvince cityTitle={cityTitle} />
      <OverviewCategoriesProvince cityTitle={cityTitle} />
      <OverviewPatientsProvince cityTitle={cityTitle} />
      <OverviewOfVaccinationProvince cityTitle={cityTitle} />
      <TestsStatusProvince cityTitle={cityTitle} />
    </div>
  );
};

export default SchoolProvince;
