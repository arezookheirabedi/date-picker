import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {getProvinceParam, sideCities} from 'src/helpers/utils';
import OverviewInspectionStatusProvince from 'src/components/Bakery/Inspection/province/OverviewInspectionProvince';
import OverviewListOfInspectionsProvince
  from 'src/components/Bakery/Inspection/province/OverviewListOfInspectionsProvince';
import OverviewReportOfInspectedUnitProvince
  from 'src/components/Bakery/Inspection/province/OverviewReportOfInspectedUnitProvince';
import OverviewInspectionsDoneProvince from 'src/components/Bakery/Inspection/province/OverviewInspectionsDoneProvince';
import OverviewStatusOfListPriceProvince
  from 'src/components/Bakery/Inspection/province/OverviewStatusOfListPriceProvince'
import OverviewStatusOfBreadSupplyPriceProvince
  from 'src/components/Bakery/Inspection/province/OverviewStatusOfBreadSupplyPriceProvince'
import OverviewStatusOfCookingVarietyProvince
  from 'src/components/Bakery/Inspection/province/OverviewStatusOfCookingVarietyProvince'
import OverviewBreadQualityInInspectedUnitsProvince
  from 'src/components/Bakery/Inspection/province/OverviewBreadQualityInInspectedUnitsProvince'
import OverviewPublicHealthOfInspectedUnitsProvince
  from 'src/components/Bakery/Inspection/province/OverviewPublicHealthOfInspectedUnitsProvince'
import OverviewReportOfInspectedUnitsProvince
  from 'src/components/Bakery/Inspection/province/OverviewReportOfInspectedUnitsProvince';
import OverviewNumberOfInspectedUnitsProvince
  from 'src/components/Bakery/Inspection/province/OverviewNumberOfInspectedUnitsProvince';
import OverviewBakeryInspectionMap from '../../../components/Bakery/Inspection/province/OverviewBakeryInspectionMap';
import AccessDenied from "../../../components/Access/AccessDenied";
import useHasProvinceResource from "../../../hooks/useHasProvinceResource";

const InspectionProvince = () => {
    const location = useLocation()
    const history = useHistory()
    const [cityTitle, setCityTitle] = useState('تهران')

    const [hasProvinceResources] = useHasProvinceResource();

    useEffect(() => {
      if (getProvinceParam()) {
        setCityTitle(getProvinceParam());
      } else {
        history.push('/dashboard/health/transport/province')
      }
    }, [location.search]);

    const [query, setQuery] = useState({
      retry: false
    })



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

          <OverviewInspectionStatusProvince cityTitle={cityTitle} data={[]} loading={false}     />

          <OverviewListOfInspectionsProvince cityTitle={cityTitle}/>

          <div className='flex w-full gap-x-6'>
            <OverviewReportOfInspectedUnitsProvince cityTitle={cityTitle}
                                                    data={[]}
                                                    loading={false}     
                                                    error="cv"
                                                    setQuery={setQuery}/>

            <OverviewNumberOfInspectedUnitsProvince cityTitle={cityTitle}
                                                    data={[]}
                                                    loading={false}     
                                                    error="cv"
                                                    setQuery={setQuery}/>
          </div>


          <OverviewReportOfInspectedUnitProvince cityTitle={cityTitle}
                                                 data={[]}
                                                 loading={false}     
                                                 error="cv"
                                                 setQuery={setQuery}/>


          <OverviewInspectionsDoneProvince cityTitle={cityTitle}/>


          <div className='flex w-full gap-x-6'>
            <OverviewStatusOfListPriceProvince cityTitle={cityTitle}
                                               data={[]}
                                               loading={false}     
                                               error="cv"
                                               setQuery={setQuery}
            />
            <OverviewStatusOfBreadSupplyPriceProvince cityTitle={cityTitle}
                                                      data={[]}
                                                      loading={false}     
                                                      error="cv"
                                                      setQuery={setQuery}
            />
          </div>

          <OverviewStatusOfCookingVarietyProvince cityTitle={cityTitle}
                                                  data={[]}
                                                  loading={false}     
                                                  error="cv"
                                                  setQuery={setQuery}
          />


          <div className='flex w-full gap-x-6'>
            <OverviewBreadQualityInInspectedUnitsProvince cityTitle={cityTitle}
                                                          data={[]}
                                                          loading={false}     
                                                          error="cv"
                                                          setQuery={setQuery}
            />
            <OverviewPublicHealthOfInspectedUnitsProvince cityTitle={cityTitle}
                                                          data={[]}
                                                          loading={false}     
                                                          error="cv"
                                                          setQuery={setQuery}
            />
          </div>

        </>)}

      </div>
    );
  }
;

export default InspectionProvince;
