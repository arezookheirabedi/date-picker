import React from 'react';
import OverviewBakery from 'src/components/Bakery/public/OverviewBakery';
import OverviewBakeryInspectionNeed from 'src/components/Bakery/public/OverviewBakeryInspectionNeed';
import OverviewAudit from 'src/components/Bakery/public/OverviewAudit';
import OverviewInvalidGuildCode from 'src/components/Bakery/public/OverviewInvalidGuildCode';
import OverviewDeadOwner from 'src/components/Bakery/public/OverviewDeadOwner';
import OverviewPermission from 'src/components/Bakery/public/OverviewPermission';
// import OverviewCategories from 'src/components/Bakery/public/OverviewCategories';
import OverviewLicence from 'src/components/Bakery/public/OverviewLicence';
import OverviewActiveTime from 'src/components/Bakery/public/OverviewActiveTime';
import OverviewSellCostAverage from 'src/components/Bakery/public/OverviewSellCostAverage';
import OverviewSellRate from 'src/components/Bakery/public/OverviewSellRate';
// import OverviewSoldCount from 'src/components/Bakery/public/OverviewSoldCount';
import OverviewSupplyFlour from 'src/components/Bakery/public/OverviewSupplyFlour';


const Bakery = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewBakery />
      <OverviewBakeryInspectionNeed />
      <OverviewAudit />
      <OverviewInvalidGuildCode />
      <OverviewDeadOwner />
      <OverviewPermission />
      {/* <OverviewCategories /> */}
      <OverviewLicence />
      <OverviewActiveTime />
      <OverviewSellCostAverage />
      <OverviewSellRate />
      {/* <OverviewSoldCount /> */}
      <OverviewSupplyFlour /> 
    </div>
  );
};

export default Bakery;
