import React from "react";

// import avatar from "../../assets/images/logos/avatar.svg";
import OverviewCategories from "../../components/Transport/OverviewCategories";
// import OverviewPublicPatients from "../../components/Transport/OverviewPublicPatients";
// import OverviewOfVaccinationInPublicTransport from "../../components/Transport/OverviewOfVaccinationInPublicTransport";
// import TestsInTransport from "../../components/Transport/TestsInTransport";
import OverviewDrivers from "../../components/Transport/OverviewDrivers";

// import IconWrapper from "../../components/IconWrapper";
const Transport = () => {
  return (
    <div className="space-y-16 mb-8">
      {/* <fieldset className="text-center border rounded-xl p-4"> */}
      {/*  <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت سرویس‌ها</legend> */}

      {/*  /!* <div>head</div> *!/ */}
      {/*  <div className="md:flex  justify-between space-y-5 lg:space-y-0"> */}
      {/*    <div className="w-full lg:w-7/12"> */}
      {/*      <Column/> */}
      {/*    </div> */}
      {/*    <div className="w-full lg:w-5/12">* /}
      {/*      <Gauge/> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </fieldset> */}
      <OverviewDrivers/>
      <OverviewCategories/>
      {/* <OverviewPublicPatients/> */}
      {/* <OverviewOfVaccinationInPublicTransport/> */}
      {/* <TestsInTransport /> */}
    </div>
  )
}

export default Transport;