import React from "react";

// import avatar from "../../assets/images/logos/avatar.svg";
import OverviewCategories from "../../components/Transport/OverviewCategories";
import OverviewPublicPatients from "../../components/Transport/OverviewPublicPatients";
import OverviewOfVaccinationInPublicTransport from "../../components/Transport/OverviewOfVaccinationInPublicTransport";
import TestsInTransport from "../../components/Transport/TestsInTransport";
import OverviewDrivers from "../../components/Transport/OverviewDrivers";

// import IconWrapper from "../../components/IconWrapper";
const Transport = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewDrivers/>
      <OverviewCategories/>
      <OverviewPublicPatients/>
      <OverviewOfVaccinationInPublicTransport/>
      <TestsInTransport/>
    </div>
  )
}

export default Transport;