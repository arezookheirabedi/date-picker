import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewMap from 'src/components/Guild/province/OverviewMap';
import OverviewGuilds from 'src/components/Guild/province/OverviewGuilds';
import OverviewGuildsPerCategory from 'src/components/Guild/province/OverviewGuildsPerCategory';
import TestStatus from 'src/components/Guild/province/TestStatus';
import {sideCities} from 'src/helpers/utils';
import OverviewGuildPositivePcr from 'src/components/Guild/province/OverviewGuildPositivePcr';
import OverviewOfGuildVaccinationProcess from 'src/components/Guild/province/OverviewOfGuildVaccinationProcess';
import TheLatestOverwiewOfVaccination from 'src/components/Guild/province/TheLatestOverwiewOfVaccination';
import OverviewVaccination from 'src/components/Guild/province/OverviewGuildVaccination';
import RegisterGuild from 'src/components/Guild/province/RegisterGuild';
import useHasProvinceResource from "../../hooks/useHasProvinceResource";
import AccessDenied from "../../components/Access/AccessDenied";

const GuildOwnerProvince: React.FC<any> = () => {
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
        destinationId="guild-overview"
        selectDefault
      />

      {!hasProvinceResources && <AccessDenied id="guild-overview"/>}
      {hasProvinceResources && (
        <>
          <OverviewGuilds cityTitle={cityTitle}/>
          <OverviewGuildsPerCategory cityTitle={cityTitle}/>
          <OverviewGuildPositivePcr cityTitle={cityTitle}/>
          <OverviewOfGuildVaccinationProcess cityTitle={cityTitle}/>
          <TheLatestOverwiewOfVaccination cityTitle={cityTitle}/>
          <OverviewVaccination cityTitle={cityTitle}/>
          <TestStatus cityTitle={cityTitle}/>
          <RegisterGuild cityTitle={cityTitle}/>
        </>
      )}

    </div>
  );
};

export default GuildOwnerProvince;
