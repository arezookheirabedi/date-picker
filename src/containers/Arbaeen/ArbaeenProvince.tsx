import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import AccessDenied from 'src/components/Access/AccessDenied';
import OverviewMap from 'src/components/Arbaeen/province/OverviewMap';
import OverviewOfExistBordersProvince from 'src/components/Arbaeen/province/OverviewOfExistBordersProvince';
import OverviewPilgrimGenderByProvince from 'src/components/Arbaeen/province/OverviewPilgrimGenderByProvince';
import OverviewPligrimAgeProvince from 'src/components/Arbaeen/province/OverviewPligrimAgeProvince';
import PilgrimsList from 'src/components/Arbaeen/province/PilgrimsList';
import ThePligrimsCitiesList from 'src/components/Arbaeen/province/ThePligrimsCitiesList';
import {sideCities} from 'src/helpers/utils';
import useHasProvinceResource from 'src/hooks/useHasProvinceResource';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
import OverviewPilgrim from 'src/components/Arbaeen/province/OverviewPilgrim';
import OverviewPligrimTripType from 'src/components/Arbaeen/province/OverviewPligrimTripType';
import OverviewPilgrimVaccineStatus from 'src/components/Arbaeen/province/OverviewPilgrimVaccineStatus';

const ArbaeenProvince = () => {
  const location = useLocation();
  const [cityTitle, setCityTitle] = useState('تهران');

  const [hasProvinceResources] = useHasProvinceResource();

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
        destinationId="arborean-overview"
        selectDefault
      />

      {!hasProvinceResources && <AccessDenied id="arborean-overview" />}
      {hasProvinceResources && (
        <>
          <OverviewPilgrim cityTitle={cityTitle} />
          <OverviewPligrimTripType cityTitle={cityTitle} />
          <OverviewPilgrimVaccineStatus cityTitle={cityTitle} />

          <PilgrimsList cityTitle={cityTitle} />
          <OverviewOfExistBordersProvince cityTitle={cityTitle} />
          <OverviewPligrimAgeProvince cityTitle={cityTitle} />
          <OverviewPilgrimGenderByProvince cityTitle={cityTitle} />
          <ThePligrimsCitiesList cityTitle={cityTitle} />
          <fieldset className=" rounded-xl border py-2 px-4 text-center">
            <div className=" flex justify-between">
              <div className="flex items-center justify-start">
                <img src={Irancell} className="inline" alt="irancell-logo" />
                <span className="px-2">باهمکاری ایرانسل</span>
              </div>
              <div>
                <img src={Vasl} className="inline " alt="vasl-logo" />
              </div>
            </div>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default ArbaeenProvince;
