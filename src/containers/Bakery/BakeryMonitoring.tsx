import React from 'react';
import BakeryMonitoringList from 'src/components/Bakery/monitoring';

const BakeryMonitoring : React.FC<{}> = () => {
  return (
    <div className="mb-8 space-y-16">
      <BakeryMonitoringList />
    </div>
  );
};

export default BakeryMonitoring;
