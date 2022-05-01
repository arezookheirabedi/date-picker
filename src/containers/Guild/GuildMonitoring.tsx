import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import OverviewNotScaned from 'src/components/Guild/monitoring/OverviewNotScaned';
// import OverviewPositive from 'src/components/Guild/monitoring/OverviewPositive';
import OverviewUnVaccinated from 'src/components/Guild/monitoring/OverviewUnVaccinated';
import OverviewMap from 'src/components/Guild/monitoring/OverviewMap';
import {sideCities} from 'src/helpers/utils';

const GuildMonitoring = () => {
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
        destinationId="guild-overview"
      />
      {/* <OverviewNotScaned cityTitle={cityTitle} />
      <OverviewPositive cityTitle={cityTitle} /> */}
      <OverviewUnVaccinated cityTitle={cityTitle} />
    </div>
  );
};

export default GuildMonitoring;
