import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewNotScaned from 'src/components/Guild/monitoring/OverviewNotScaned';
import OverviewPositive from 'src/components/Guild/monitoring/OverviewPositive';
import OverviewUnVaccinated from 'src/components/Guild/monitoring/OverviewUnVaccinated';
import OverviewMap from 'src/components/Guild/monitoring/OverviewMap';
import {sideCities} from 'src/helpers/utils';

const GuildMonitoring = () => {
  const location = useLocation();

  const [cityTitle, setCityTitle] = useState<string | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      setCityTitle(provinceName);
    } else {
      setCityTitle(undefined);
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="guild-overview"
      />
      <OverviewNotScaned cityTitle={cityTitle} />
      <OverviewPositive cityTitle={cityTitle} />
      <OverviewUnVaccinated cityTitle={cityTitle} />
    </div>
  );
};

export default GuildMonitoring;
