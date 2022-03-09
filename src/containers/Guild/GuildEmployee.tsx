import React from 'react';
import OverviewGuilds from 'src/components/Guild/public/OverviewGuilds';
import OverviewGuildsPerCategory from 'src/components/Guild/public/OverviewGuildsPerCategory';
import OverviewGuildsPerProvince from 'src/components/Guild/public/OverviewGuildsPerProvince';
import OverviewOfVaccination from 'src/components/Guild/public/OverviewOfVaccination';
import TestStatus from 'src/components/Guild/public/TestStatus';

const GuildEmployee: React.FC<any> = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewGuilds />
      <OverviewGuildsPerCategory />
      <OverviewGuildsPerProvince />
      <OverviewOfVaccination />
      <TestStatus />
    </div>
  );
};

export default GuildEmployee;
