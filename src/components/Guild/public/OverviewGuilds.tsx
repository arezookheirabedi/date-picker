import React from 'react';
import Statistic from 'src/containers/Overview/components/Statistic';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import scanIcon from 'src/assets/images/icons/scan-color.svg';
import scanDangerIcon from 'src/assets/images/icons/scan-danger-color.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';

const OverviewGuilds = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">وضعیت کلی اصناف کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={guildIcon} text="مجموع شاغلین" count={2800} />
          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800} />
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450} />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={654} />
          <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={654} />
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={428} />
          <Statistic icon={testIcon} text="تعداد آزمایش های کارمندان" count={864} />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewGuilds;
