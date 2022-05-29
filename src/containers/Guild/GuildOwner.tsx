import React from 'react';
import OverviewGuildPositivePcr from 'src/components/Guild/public/OverviewGuildPositivePcr';
import OverviewGuildPositivePcrPercentage from 'src/components/Guild/public/OverviewGuildPositivePcrPercentage';
import OverviewGuildRegisterNumber from 'src/components/Guild/public/OverviewGuildRegisterNumber';
import OverviewGuildRegisterPercentage from 'src/components/Guild/public/OverviewGuildRegisterPercentage';
import OverviewGuilds from 'src/components/Guild/public/OverviewGuilds';
import OverviewGuildsPerCategory from 'src/components/Guild/public/OverviewGuildsPerCategory';
import OverviewGuildsPerProvince from 'src/components/Guild/public/OverviewGuildsPerProvince';
import OverviewVaccination from 'src/components/Guild/public/OverviewGuildVaccination';
import OverviewOfGuildVaccinationProcess from 'src/components/Guild/public/OverviewOfGuildVaccinationProcess';
import TestStatus from 'src/components/Guild/public/TestStatus';
import TheLatestOverwiewOfVaccination from 'src/components/Guild/public/TheLatestOverwiewOfVaccination';

const GuildOwner: React.FC<any> = () => {
  return (
    <div className="space-y-16 mb-8">
      {/* <OverviewGuilds />
      <OverviewGuildsPerCategory />
      <OverviewGuildsPerProvince />
      <OverviewOfVaccination />
      <TestStatus /> */}
      <OverviewGuilds />
      <OverviewGuildsPerCategory />
      <OverviewGuildPositivePcr />
      <OverviewOfGuildVaccinationProcess />
      <TheLatestOverwiewOfVaccination />
      <OverviewGuildPositivePcrPercentage />
      <OverviewGuildRegisterPercentage />
      <OverviewGuildRegisterNumber />
      <OverviewVaccination />
      <OverviewGuildsPerProvince />
      <TestStatus />
    </div>
  );
};

export default GuildOwner;
