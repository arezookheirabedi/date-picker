import React from 'react';
// import OverviewGuildRegisteredPercentage from 'src/components/Guild/public/OverviewGuildRegisteredPercentage';
import OverviewGuilds from 'src/components/Guild/public/OverviewGuilds';
import OverviewGuildsPerCategory from 'src/components/Guild/public/OverviewGuildsPerCategory';
import OverviewGuildsPerProvince from 'src/components/Guild/public/OverviewGuildsPerProvince';
// import OverviewOfTheLatestPublicGuildVaccinationStatus from 'src/components/Guild/public/OverviewOfTheLatestPublicGuildVaccinationStatus';
import OverviewOfVaccination from 'src/components/Guild/public/OverviewOfVaccination';
import TestStatus from 'src/components/Guild/public/TestStatus';
// import TheLatestOverwiewOfVaccination from 'src/components/Guild/public/TheLatestOverwiewOfVaccination';
// import OverviewOfGuildVaccinationProcess from 'src/components/Guild/public/OverviewOfGuildVaccinationProcess';

const GuildOwner: React.FC<any> = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewGuilds />
      <OverviewGuildsPerCategory />
      <OverviewGuildsPerProvince />
      <OverviewOfVaccination />
      <TestStatus />
      {/* <TheLatestOverwiewOfVaccination /> */}
      {/* <OverviewOfTheLatestPublicGuildVaccinationStatus /> */}
      {/* <OverviewOfGuildVaccinationProcess /> */}
      {/* <OverviewGuildRegisteredPercentage /> */}
    </div>
  );
};

export default GuildOwner;
