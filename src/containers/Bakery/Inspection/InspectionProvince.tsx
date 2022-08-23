import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import OverviewInspectionStatusProvince from 'src/components/Bakery/Inspection/province/OverviewInspectionProvince';
import OverviewListOfInspectionsProvince from 'src/components/Bakery/Inspection/province/OverviewListOfInspectionsProvince';
import OverviewReportOfInspectedUnitProvince from 'src/components/Bakery/Inspection/province/OverviewReportOfInspectedUnitProvince'
import OverviewInspectionsDoneProvince from 'src/components/Bakery/Inspection/province/OverviewInspectionsDoneProvince'
import OverviewStatusOfListPriceProvince from 'src/components/Bakery/Inspection/province/OverviewStatusOfListPriceProvince'
import OverviewStatusOfBreadSupplyPriceProvince from 'src/components/Bakery/Inspection/province/OverviewStatusOfBreadSupplyPriceProvince'
import OverviewStatusOfCookingVarietyProvince from 'src/components/Bakery/Inspection/province/OverviewStatusOfCookingVarietyProvince'
import OverviewBreadQualityInInspectedUnitsProvince from 'src/components/Bakery/Inspection/province/OverviewBreadQualityInInspectedUnitsProvince'
import OverviewPublicHealthOfInspectedUnitsProvince from 'src/components/Bakery/Inspection/province/OverviewPublicHealthOfInspectedUnitsProvince'
import OverviewReportOfInspectedUnitsProvince from 'src/components/Bakery/Inspection/province/OverviewReportOfInspectedUnitsProvince';
import OverviewNumberOfInspectedUnitsProvince from 'src/components/Bakery/Inspection/province/OverviewNumberOfInspectedUnitsProvince';
import OverviewBakeryInspectionMap from '../../../components/Bakery/Inspection/province/OverviewBakeryInspectionMap';
import AccessDenied from "../../../components/Access/AccessDenied";
import useHasProvinceResource from "../../../hooks/useHasProvinceResource";

const InspectionProvince = () => {
  const location = useLocation()
  const history = useHistory()
  const [cityTitle, setCityTitle] = useState('تهران')

  const [hasProvinceResources] = useHasProvinceResource();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      setCityTitle(provinceName);
    } else {
      history.push('/dashboard/guilds/inspection/bakery/province')
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewBakeryInspectionMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="bakery-inspection-overview"
        selectDefault
      />
      {!hasProvinceResources && <AccessDenied id="bakery-inspection-overview"/>}
      {hasProvinceResources && (<>
        <OverviewInspectionStatusProvince cityTitle={cityTitle} />
        <OverviewListOfInspectionsProvince cityTitle={cityTitle} />
        <div className='flex w-full gap-x-6'>
          <OverviewReportOfInspectedUnitsProvince cityTitle={cityTitle}/>
          <OverviewNumberOfInspectedUnitsProvince cityTitle={cityTitle} />
        </div>
        <OverviewReportOfInspectedUnitProvince cityTitle={cityTitle} />
        <OverviewInspectionsDoneProvince cityTitle={cityTitle} />
        <div className='flex w-full gap-x-6'>
          <OverviewStatusOfListPriceProvince cityTitle={cityTitle} />
          <OverviewStatusOfBreadSupplyPriceProvince cityTitle={cityTitle}/>
        </div>
        <OverviewStatusOfCookingVarietyProvince cityTitle={cityTitle} />
        <div className='flex w-full gap-x-6'>
          <OverviewBreadQualityInInspectedUnitsProvince cityTitle={cityTitle} />
          <OverviewPublicHealthOfInspectedUnitsProvince cityTitle={cityTitle} />
      </div>
      </>)}
      
    </div>
  );
};

export default InspectionProvince;
