import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {sideCities} from 'src/helpers/utils';
import OverviewMap from 'src/components/Vaccination/OverviewMap';
import OverviewVaccinePerDoses from 'src/components/Vaccination/OverviewVaccinePerDoses';

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
      />

      <div id="vaccination-overview" />
      {/*  */}
      {/*  */}

      <OverviewVaccinePerDoses cityTitle={cityTitle} />
    </div>
  );
};

export default Vaccination;
