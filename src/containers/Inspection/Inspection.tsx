import React from 'react';

import OverviewInspectionStatus from 'src/components/Inspection/public/OverviewInspectionStatus';
import OverviewListOfInspection from 'src/components/Inspection/public/OverviewListOfInspection';
import OverviewRatioOfInspection from 'src/components/Inspection/public/OverviewRatioOfInspection';
import OverviewAverageFlourOfInspectedUnits from 'src/components/Inspection/public/OverviewAverageFlourOfInspectedUnits';
import OverviewStatusOfCookingVariety from 'src/components/Inspection/public/OverviewStatusOfCookingVariety';


const Inspection = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewInspectionStatus />
      <OverviewListOfInspection />
      <OverviewRatioOfInspection />
      <OverviewAverageFlourOfInspectedUnits />
      <OverviewStatusOfCookingVariety />
    </div>
  );
};

export default Inspection;
