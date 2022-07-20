import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AccessDenied from 'src/components/Access/AccessDenied';
import OverviewMap from 'src/components/Arborean/province/OverviewMap';
import PilgrimsList from 'src/components/Arborean/province/PilgrimsList';
import { sideCities } from 'src/helpers/utils';
import useHasProvinceResource from 'src/hooks/useHasProvinceResource';


const ArboreanProvince = () => {
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
        selectDefault={hasProvinceResources}
      />

      {!hasProvinceResources && <AccessDenied id="arborean-overview"/>}
      {hasProvinceResources && (
        <>
           <PilgrimsList cityTitle={cityTitle}/> 
          </>
      )}

    </div>)
  };

export default ArboreanProvince;