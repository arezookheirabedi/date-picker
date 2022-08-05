import React from 'react';

import OverviewInspectionStatus from 'src/components/Inspection/public/OverviewInspectionStatus';
import OverviewListOfInspection from 'src/components/Inspection/public/OverviewListOfInspection';

const Inspection = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewInspectionStatus />
      <OverviewListOfInspection />
    </div>
  );
};

export default Inspection;
