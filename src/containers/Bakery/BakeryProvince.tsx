import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewBakeryMap from 'src/components/Bakery/province/OverviewBakeryMap';
import OverviewBakeryProvince from 'src/components/Bakery/province/OverviewBakeryProvince';
import OverviewCategoriesProvince from 'src/components/Bakery/province/OverviewCategoriesProvince';
import OverviewAuditProvince from 'src/components/Bakery/province/OverviewAuditProvince';
import {sideCities} from 'src/helpers/utils';

const BakeryProvince = () => {
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
      <OverviewBakeryMap
        cityTitle={cityTitle}
        destinationId="bakery-overview"
        sideCityStatus={sideCities}
        selectDefault
      />
      <OverviewBakeryProvince cityTitle={cityTitle} />
      <OverviewCategoriesProvince cityTitle={cityTitle} />
      <OverviewAuditProvince cityTitle={cityTitle} />
    </div>
  );
};

export default BakeryProvince;
