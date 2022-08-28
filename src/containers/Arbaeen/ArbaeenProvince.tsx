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
          <PilgrimsList cityTitle={cityTitle} />
          <OverviewOfExistBordersProvince cityTitle={cityTitle} />
          <OverviewPligrimAgeProvince cityTitle={cityTitle} />
          <OverviewPilgrimGenderByProvince cityTitle={cityTitle} />
          <ThePligrimsCitiesList cityTitle={cityTitle} />
        </>
      )}
    </div>
  );
};

export default ArbaeenProvince;
