import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import useHasProvinceResource from 'src/hooks/useHasProvinceResource';

import AccessDenied from '../../components/Access/AccessDenied';
import OverviewDriversMap from '../../components/Transport/province/OverviewDriversMap';
import OverviewDriversProvince from '../../components/Transport/province/OverviewDriversProvince';
import OverviewOfDriverVaccinationProcessProvince from '../../components/Transport/province/OverviewOfDriverVaccinationProcessProvince';
import OverviewSamasProvince from '../../components/Transport/province/OverviewSamasProvince';
import OverviewPublicPatientsProvince from '../../components/Transport/province/OverviewPublicPatientsProvince';
// import TestsInTransportProvince from '../../components/Transport/province/TestsInTransportProvince';
import OverviewCategoriesProvince from '../../components/Transport/province/OverviewCategoriesProvince';
import OverviewOfVaccinationInPublicTransportProvince from '../../components/Transport/province/OverviewOfVaccinationInPublicTransportProvince';
import OverviewOfTheLatestPublicTransportVaccinationStatusCardProvince from '../../components/Transport/province/OverviewOfTheLatestPublicTransportVaccinationStatusCardProvince';
import OverviewOfTheLatestPublicTransportVaccinationStatusProvince from '../../components/Transport/province/OverviewOfTheLatestPublicTransportVaccinationStatusProvince';
import TableOfTestsInTransportProvince from '../../components/Transport/province/TableOfTestsInTransportProvince';
import Information from '../../assets/images/icons/information.svg';
import AlertPattern from '../../assets/images/patterns/alert-white.svg';
import {getProvinceParam, sideCities} from '../../helpers/utils';

const TransportProvince = () => {
  const location = useLocation();
  const history = useHistory()
  const [cityTitle, setCityTitle] = useState();

  const [hasProvinceResources] = useHasProvinceResource();

  useEffect(() => {
    if (getProvinceParam()) {
      setCityTitle(getProvinceParam());
    } else {
      history.push('/dashboard/health/transport/province')
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

      {!hasProvinceResources && <AccessDenied id="province-overview" />}
      {hasProvinceResources && (
        <>
          <OverviewDriversProvince cityTitle={cityTitle} />
          <OverviewSamasProvince cityTitle={cityTitle} />
          <OverviewCategoriesProvince cityTitle={cityTitle} />
          <OverviewPublicPatientsProvince cityTitle={cityTitle} />
          <OverviewOfDriverVaccinationProcessProvince cityTitle={cityTitle} />
          <OverviewOfTheLatestPublicTransportVaccinationStatusCardProvince cityTitle={cityTitle} />
          <OverviewOfTheLatestPublicTransportVaccinationStatusProvince cityTitle={cityTitle} />
          <OverviewOfVaccinationInPublicTransportProvince cityTitle={cityTitle} />
          <TableOfTestsInTransportProvince cityTitle={cityTitle} />
        </>
      )}

      {/* deprecate component */}
      {/* <TestsInTransportProvince cityTitle={cityTitle} /> */}
    </div>
  );
};

export default TransportProvince;
