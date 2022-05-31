import React from 'react';
import OverviewBakery from 'src/components/Bakery/public/OverviewBakery';
import OverviewCategories from 'src/components/Bakery/public/OverviewCategories';
import OverviewLicence from 'src/components/Bakery/public/OverviewLicence';
import OverviewActiveTime from 'src/components/Bakery/public/OverviewActiveTime';
import OverviewSellRate from 'src/components/Bakery/public/OverviewSellRate';
import OverviewSoldCount from 'src/components/Bakery/public/OverviewSoldCount';
import OverviewSupplyFlour from 'src/components/Bakery/public/OverviewSupplyFlour';

const Bakery = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewBakery />
      <OverviewCategories />
      <OverviewLicence />
      <OverviewActiveTime />
      <OverviewSellRate />
      <OverviewSoldCount />
      <OverviewSupplyFlour />
    </div>
  );
};

export default Bakery;
