import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import {useLocation} from "react-router-dom";
import {sideCities} from 'src/helpers/utils';
import OverviewMap from '../../components/Recruitment/OverviewMap';
// import OverviewProvince from '../../components/Recruitment/OverviewProvince';
import OverviewPatientsProvince from '../../components/Recruitment/OverviewPatientsProvince';
// import TestsStatusProvince from '../../components/Recruitment/TestStatusProvince';
import OverviewCategoriesProvince from '../../components/Recruitment/OverviewCategoriesProvince';
// import OverviewOfVaccinationProvince from '../../components/Recruitment/OverviewOfVaccinationProvince';

const RecruitmentProvince = () => {
  const location = useLocation();
  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    // console.log(provinceName)
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    })

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [location.search])

  return (
    <div className="space-y-16 mb-8">
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="recruitment-overview"
      />
      {/* <OverviewProvince cityTitle={cityTitle} /> */}
      <OverviewCategoriesProvince cityTitle={cityTitle}/>
      <OverviewPatientsProvince cityTitle={cityTitle}/>
      {/* <OverviewOfVaccinationProvince cityTitle={cityTitle} /> */}
      {/* <TestsStatusProvince cityTitle={cityTitle} /> */}
    </div>
  );
};

export default RecruitmentProvince;
