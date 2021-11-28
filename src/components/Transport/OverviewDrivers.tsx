import React from "react";

import Statistic from "../../containers/Guild/components/Statistic";
import totalDriver from "../../assets/images/icons/transport-color.svg";
import sufferingIcon from "../../assets/images/icons/suffering-color.svg";
import saveIcon from "../../assets/images/icons/save-color.svg";
import deadIcon from "../../assets/images/icons/dead-color.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import inquiryPlaque from "../../assets/images/icons/inquiry-plaque.svg";
import positiveInquiryPlaque from "../../assets/images/icons/positive-inquiry-plaque.svg";
import testIcon from "../../assets/images/icons/test-color.svg";

const OverviewDrivers = ()=>{
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={totalDriver} text="مجموع رانندگان" count={1257}/>
          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800}/>
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450}/>
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200}/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={654}/>
          <Statistic icon={inquiryPlaque} text="تعداد استعلام پلاک" count={654} hasInfo/>
          <Statistic icon={positiveInquiryPlaque} text="تعداد استعلام های نتیجه مثبت" count={428} hasInfo/>
          <Statistic icon={testIcon} text="تعداد آزمایش های رانندگان" count={864}/>
        </div>
      </div>
    </fieldset>
  )
}
export default OverviewDrivers;