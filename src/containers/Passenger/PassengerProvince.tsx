import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewPassengerStatusCardProvince
  from 'src/components/Passengers/province/OverviewPassengersStatusCardProvince';
import OverviewAirPassengerStatusCardProvince
  from 'src/components/Passengers/province/OverviewAirPassengersStatusCardProvince';
import OverviewLandPassengerStatusCardProvince
  from 'src/components/Passengers/province/OverviewLandPassengersStatusCardProvince';
import OverviewRailPassengerStatusCardProvince
  from 'src/components/Passengers/province/OverviewRailPassengersStatusCardProvince';
import OverviewSeaPassengerStatusCardProvince
  from 'src/components/Passengers/province/OverviewSeaPassengersStatusCardProvince';
import OverviewPassengersVaccinateComponentProvince
  from 'src/components/Passengers/province/OverviewPassengerVaccinateProvince';
import {sideCities} from 'src/helpers/utils';
import OverviewPassengersVaccinePerDosesProvince
  from 'src/components/Passengers/province/OverviewPassengersVaccinePerDosesProvince';
// import OverviewPatientsPassengersProvince from 'src/components/Passengers/province/OverviewPatientsPassengersProvince';
import OverviewMap from '../../components/Passengers/province/OverviewMap';
import OverviewOfTripsMadeByPassengersByVehicleProvince
  from "../../components/Passengers/province/OverviewOfTripsMadeByPassengersByVehicleProvince";
import OverviewOfAffectedAfterTravelingInCountryProvince
  from "../../components/Passengers/province/OverviewOfAffectedAfterTravelingInCountryProvince";
import useHasProvinceResource from "../../hooks/useHasProvinceResource";
import AccessDenied from "../../components/Access/AccessDenied";

const PassengerProvince = () => {
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
        destinationId="passenger-overview"
        selectDefault
      />

      {!hasProvinceResources && <AccessDenied id="passenger-overview"/>}
      {hasProvinceResources && (
        <>
          <OverviewPassengerStatusCardProvince cityTitle={cityTitle}/>
          <OverviewAirPassengerStatusCardProvince cityTitle={cityTitle}/>
          <OverviewLandPassengerStatusCardProvince cityTitle={cityTitle}/>
          <OverviewRailPassengerStatusCardProvince cityTitle={cityTitle}/>
          <OverviewSeaPassengerStatusCardProvince cityTitle={cityTitle}/>
          <OverviewPassengersVaccinateComponentProvince cityTitle={cityTitle}/>
          <OverviewPassengersVaccinePerDosesProvince cityTitle={cityTitle}/>
          {/* comment */}
          {/* <OverviewPatientsPassengersProvince cityTitle={cityTitle}/> */}
          {/* comment */}
          <OverviewOfAffectedAfterTravelingInCountryProvince cityTitle={cityTitle}/>
          <OverviewOfTripsMadeByPassengersByVehicleProvince cityTitle={cityTitle}/>
        </>
      )}

    </div>
  );
};

export default PassengerProvince;
