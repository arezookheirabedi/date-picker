import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {sideCities} from 'src/helpers/utils';
import OverviewMap from 'src/components/Vaccination/province/OverviewMap';
import OverviewVaccinationStatus from 'src/components/Vaccination/province/OverviewVaccinationStatus';
import OverviewExistVaccine from 'src/components/Vaccination/province/OverviewExistVaccine';
import OverviewVaccinePerDoses from 'src/components/Vaccination/province/OverviewVaccinePerDoses';

const Vaccination: React.FC<{}> = () => {
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
        destinationId="vaccination-overview"
        selectDefault
      />

      <OverviewVaccinationStatus cityTitle={cityTitle} />
      <OverviewExistVaccine cityTitle={cityTitle} />
      <OverviewVaccinePerDoses cityTitle={cityTitle} />
    </div>
  );
};

export default Vaccination;
