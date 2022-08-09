import React from 'react';

import OverviewInspectionStatus from 'src/components/Bakery/Inspection/public/OverviewInspectionStatus';
import OverviewListOfInspections from 'src/components/Bakery/Inspection/public/OverviewListOfInspections';
import OverviewReportOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewReportOfInspectedUnits';
import OverviewInspectionsDone from 'src/components/Bakery/Inspection/public/OverviewInspectionsDone';
import OverviewRatioOfInspection from 'src/components/Bakery/Inspection/public/OverviewRatioOfInspection';
import OverviewStatusOfListPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfListPrice';
import OverviewStatusOfBreadSupplyPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfBreadSupplyPrice';
import OverviewAverageFlourOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewAverageFlourOfInspectedUnits';
import OverviewStatusOfCookingVariety from 'src/components/Bakery/Inspection/public/OverviewStatusOfCookingVariety';


const Inspection = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewInspectionStatus />
      <OverviewListOfInspections />
      <OverviewReportOfInspectedUnits />
      <OverviewInspectionsDone />
      <OverviewRatioOfInspection />
      <div className='flex w-full gap-x-6'>
        <OverviewStatusOfListPrice />
        <OverviewStatusOfBreadSupplyPrice />
      </div>
      <OverviewAverageFlourOfInspectedUnits />
      <OverviewStatusOfCookingVariety />
    </div>
  );
};

export default Inspection;
