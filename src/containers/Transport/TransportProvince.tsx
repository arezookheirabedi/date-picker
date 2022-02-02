import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import {useLocation} from "react-router-dom";

import OverviewDriversMap from '../../components/Transport/OverviewDriversMap';
import OverviewDriversProvince from '../../components/Transport/OverviewDriversProvince';
import OverviewSamasProvince from '../../components/Transport/OverviewSamasProvince';
import OverviewPublicPatientsProvince from '../../components/Transport/OverviewPublicPatientsProvince';
import TestsInTransportProvince from '../../components/Transport/TestsInTransportProvince';
import OverviewCategoriesProvince from '../../components/Transport/OverviewCategoriesProvince';
import OverviewOfVaccinationInPublicTransportProvince from '../../components/Transport/OverviewOfVaccinationInPublicTransportProvince';
import Information from '../../assets/images/icons/information.svg';
import AlertPattern from '../../assets/images/patterns/alert-white.svg';
import {sideCities} from '../../helpers/utils';

const TransportProvince = () => {
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
      <div className="relative flex items-center mt-8 p-6 shadow rounded-md bg-gradient-to-r from-gray-200">
        <div className="relative z-20 flex items-start space-x-2 rtl:space-x-reverse">
          <img src={Information} className="inline " width="18" height="18" alt="" />
          <span className="text-sm">
            کاربر گرامی توجه داشته باشید که تمامی آمار و گزارشات قابل مشاهده از زمان شیوع ویروس
            کرونا تا روز جاری است.
          </span>
        </div>
        <div
          className="absolute z-10 left-0 top-0 h-full w-full bg-contain bg-no-repeat"
          style={{backgroundImage: `url(${AlertPattern})`}}
        />
      </div>
      <OverviewDriversMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="province-overview"
        selectDefault
      />
      <OverviewDriversProvince cityTitle={cityTitle} />
      <OverviewSamasProvince cityTitle={cityTitle} />
      <OverviewCategoriesProvince cityTitle={cityTitle} />
      <OverviewPublicPatientsProvince cityTitle={cityTitle} />
      <OverviewOfVaccinationInPublicTransportProvince cityTitle={cityTitle} />
      <TestsInTransportProvince cityTitle={cityTitle} />
    </div>
  );
};

export default TransportProvince;
