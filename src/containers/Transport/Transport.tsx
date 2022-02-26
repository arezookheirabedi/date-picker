import React from 'react';

// import avatar from "../../assets/images/logos/avatar.svg";
// import OverviewSamas from '../../components/Transport/public/OverviewSamas';
// import OverviewCategories from '../../components/Transport/public/OverviewCategories';
// import OverviewPublicPatients from '../../components/Transport/public/OverviewPublicPatients';
import OverviewOfVaccinationInPublicTransport
  from '../../components/Transport/public/OverviewOfVaccinationInPublicTransport';
// import TestsInTransport from '../../components/Transport/public/TestsInTransport';
// import OverviewDrivers from '../../components/Transport/public/OverviewDrivers';
import Information from '../../assets/images/icons/information.svg';
import AlertPattern from '../../assets/images/patterns/alert-white.svg';

// import IconWrapper from "../../components/IconWrapper";
const Transport = () => {
  return (
    <div className="space-y-16 mb-8">
      <div className="relative flex items-center mt-8 p-6 shadow rounded-md bg-gradient-to-r from-gray-200">
        <div className="relative z-20 flex items-start space-x-2 rtl:space-x-reverse">
          <img src={Information} className="inline " width="18" height="18" alt=""/>
          <span className="text-sm">
            کاربر گرامی توجه داشته باشید که تمامی آمار و گزارشات قابل مشاهده از زمان شیوع ویروس
            کرونا تا روز جاری است.
          </span>
        </div>
        <div
          className="absolute z-10 left-0 top-0 h-full w-full bg-contain bg-no-repeat"
          style={{backgroundImage: `url(${AlertPattern})`}}
        />
      </div>
      {/* <OverviewDrivers/> */}
      {/* <OverviewSamas /> */}
      {/* <OverviewCategories/> */}
      {/* <OverviewPublicPatients/> */}
          <OverviewOfVaccinationInPublicTransport />
      {/*  <TestsInTransport /> */}
    </div>
  );
};

export default Transport;
