import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewPassengerStatusCardProvince from 'src/components/Pasengers/province/OverviewPasengersStatusCardProvince';
import OverviewAirPassengerStatusCardProvince from 'src/components/Pasengers/province/OverviewAirPasengersStatusCardProvince';
import OverviewLandPassengerStatusCardProvince from 'src/components/Pasengers/province/OverviewLandPasengersStatusCardProvince';
import OverviewRailPassengerStatusCardProvince from 'src/components/Pasengers/province/OverviewRailPasengersStatusCardProvince';
import OverviewSeaPassengerStatusCardProvince from 'src/components/Pasengers/province/OverviewSeaPasengersStatusCardProvince';
import OverviewPasengersVaccinateComponentProvince from 'src/components/Pasengers/province/OverViewPassengerVaccinateProvince';
import {sideCities} from 'src/helpers/utils';
import OverviewPaasengersVaccinePerDosesProvince from 'src/components/Pasengers/province/OverviewPaasengersVaccinePerDosesProvince';
import OverviewPatientsPassengersProvince from 'src/components/Pasengers/province/OverviewPatientsPassengersProvince';
import OverviewMap from '../../components/Pasengers/province/OverviewMap';

const PasengerProvince = () => {
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
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="passenger-overview"
      />
      <OverviewPassengerStatusCardProvince cityTitle={cityTitle} />
      <OverviewAirPassengerStatusCardProvince cityTitle={cityTitle} />
      <OverviewLandPassengerStatusCardProvince cityTitle={cityTitle} />
      <OverviewRailPassengerStatusCardProvince cityTitle={cityTitle} />
      <OverviewSeaPassengerStatusCardProvince cityTitle={cityTitle} />
      <OverviewPasengersVaccinateComponentProvince cityTitle={cityTitle} />
      <OverviewPaasengersVaccinePerDosesProvince cityTitle={cityTitle} />
      <OverviewPatientsPassengersProvince cityTitle={cityTitle} />
    </div>
  );
};

export default PasengerProvince;
