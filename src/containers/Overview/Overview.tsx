import React from 'react';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import transportIcon from 'src/assets/images/icons/transport-color.svg';
import passengerIcon from 'src/assets/images/icons/passenger-color.svg';
import Statistic from './components/Statistic';

const Overview: React.FC<any> = () => (
  <div className="space-y-16">
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">آمار کلی</legend>

      <div className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
        <div className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0  md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={sufferingIcon} text="تعداد مبتلایان روز جاری" count={1000000} />
          <Statistic icon={saveIcon} text="تعداد بهبود‌یافتگان روز جاری" count={100} />
        </div>
        <div className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={deadIcon} text="تعداد فوت‌شدگان روز جاری" count={100} />
          <Statistic icon={vaccineIcon} text="تعداد واکسیناسیون روز جاری" count={1000} />
        </div>
      </div>
    </fieldset>
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت استان‌ تهران</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800} />
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450} />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={guildIcon} text="مجموع مبتلایان در اصناف" count={654} />
          <Statistic icon={transportIcon} text="مجموع مبتلایان در حمل و نقل عمومی" count={428} />
          <Statistic icon={passengerIcon} text="مجموع مسافران مبتلا" count={864} />
        </div>

        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          map
        </div>
      </div>
    </fieldset>

    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت کرونا کشور</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        chart
      </div>
    </fieldset>

    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون کشور</legend>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        chart
      </div>
    </fieldset>
  </div>
);

export default Overview;
