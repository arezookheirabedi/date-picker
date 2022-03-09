import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewMap from 'src/components/Guild/province/OverviewMap';
import OverviewGuilds from 'src/components/Guild/province/OverviewGuilds';
import OverviewGuildsProvince from 'src/components/Guild/province/OverviewGuildProvince';
import OverviewGuildsPerCategory from 'src/components/Guild/province/OverviewGuildsPerCategory';
import OverviewOfVaccination from 'src/components/Guild/province/OverviewOfVaccination';
import TestStatus from 'src/components/Guild/province/TestStatus';
import {sideCities} from 'src/helpers/utils';

const GuildOwnerProvince: React.FC<any> = () => {
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
        selectDefault
      />
      <OverviewGuilds cityTitle={cityTitle} />
      <OverviewGuildsPerCategory cityTitle={cityTitle} />
      <OverviewGuildsProvince cityTitle={cityTitle} />
      <OverviewOfVaccination cityTitle={cityTitle} />
      <TestStatus cityTitle={cityTitle} />
    </div>
  );
};

export default GuildOwnerProvince;
