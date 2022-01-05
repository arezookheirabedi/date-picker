import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
// import {useLocation} from "react-router-dom";

import OverviewDriversMap from "../../components/Transport/OverviewDriversMap";
import OverviewDriversProvince from "../../components/Transport/OverviewDriversProvince";
import OverviewPublicPatientsProvince from "../../components/Transport/OverviewPublicPatientsProvince";
import TestsInTransportProvince from "../../components/Transport/TestsInTransportProvince";
import OverviewCategoriesProvince from "../../components/Transport/OverviewCategoriesProvince";
import OverviewOfVaccinationInPublicTransportProvince
  from "../../components/Transport/OverviewOfVaccinationInPublicTransportProvince";
import {sideCities} from "../../helpers/utils";

const TransportProvince = () => {
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
      <OverviewDriversMap cityTitle={cityTitle} sideCityStatus={sideCities} destinationId="province-overview"/>
      <OverviewDriversProvince cityTitle={cityTitle}/>
       <OverviewCategoriesProvince cityTitle={cityTitle}/>
      <OverviewPublicPatientsProvince cityTitle={cityTitle}/>
       <OverviewOfVaccinationInPublicTransportProvince cityTitle={cityTitle}/>
      <TestsInTransportProvince cityTitle={cityTitle}/>
    </div>
  )
}

export default TransportProvince;