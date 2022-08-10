import React from 'react';

import OverviewInspectionStatus from 'src/components/Bakery/Inspection/public/OverviewInspectionStatus';
import OverviewListOfInspections from 'src/components/Bakery/Inspection/public/OverviewListOfInspections';
import OverviewReportOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewReportOfInspectedUnits';
import OverviewReportOfInspectedUnitsInCountry from 'src/components/Bakery/Inspection/public/OverviewReportOfInspectedUnitsInCountry';
import OverviewNumberOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewNumberOfInspectedUnits';
import OverviewInspectionsDone from 'src/components/Bakery/Inspection/public/OverviewInspectionsDone';
import OverviewRatioOfInspection from 'src/components/Bakery/Inspection/public/OverviewRatioOfInspection';
import OverviewStatusOfListPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfListPrice';
import OverviewStatusOfBreadSupplyPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfBreadSupplyPrice';
import OverviewAverageFlourOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewAverageFlourOfInspectedUnits';
import OverviewStatusOfCookingVariety from 'src/components/Bakery/Inspection/public/OverviewStatusOfCookingVariety';
import OverviewBreadQualityInInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewBreadQualityInInspectedUnits';
import OverviewPublicHealthOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewPublicHealthOfInspectedUnits';

const Inspection = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewInspectionStatus />
      <OverviewListOfInspections />
      <OverviewReportOfInspectedUnits />
      <div className='flex w-full gap-x-6'>
        <OverviewReportOfInspectedUnitsInCountry />
        <OverviewNumberOfInspectedUnits />
      </div>
      <OverviewInspectionsDone />
      <OverviewRatioOfInspection />
      <div className='flex w-full gap-x-6'>
        <OverviewStatusOfListPrice />
        <OverviewStatusOfBreadSupplyPrice />
      </div>
      <OverviewAverageFlourOfInspectedUnits />
      <OverviewStatusOfCookingVariety />
      <div className='flex w-full gap-x-6'>
        <OverviewBreadQualityInInspectedUnits />
        <OverviewPublicHealthOfInspectedUnits />
      </div>
    </div>
  );
};

export default Inspection;
