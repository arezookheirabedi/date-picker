import React from 'react';
import Statistic from 'src/containers/Guild/components/Statistic';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import guildPositiveIcon from 'src/assets/images/icons/guild-positive.svg';
import useGetNumberOf from 'src/hooks/apis/useGetNumberOf';
import useGetTestResults from 'src/hooks/apis/useGetTestResults';

interface OverviewGuildsProvinceProps {
  cityTitle?: any;
}

const OverviewGuildsProvince: React.FC<OverviewGuildsProvinceProps> = ({cityTitle}) => {
  // eslint-disable-next-line
  const {data: guildVacinateInfo, loading, error} = useGetNumberOf({tag: 'guild'}, true);
  // eslint-disable-next-line
  const {
    data: guildPcrInfo,
    loading: pcrLoading,
    // eslint-disable-next-line
    error: testResultError,
  } = useGetTestResults({tag: 'guild'}, true);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center" id="guild-overview">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به وضعیت اصناف در استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع کارفرمایانی که در اصناف فعالیت دارند."
            icon={guildIcon}
            text="مجموع کارفرمایان صنفی"
            count={guildVacinateInfo.totalPopulation}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید"
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={guildPcrInfo.positiveMembersCount}
            loading={pcrLoading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={guildPcrInfo.recoveredMembersCount}
            loading={pcrLoading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."
            icon={deadIcon}
            text="مجموع فوت‌ شدگان"
            count="-"
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={guildVacinateInfo.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={guildVacinateInfo.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={guildVacinateInfo.totalVaccinesCountAfterStartOfSystem || 0}
            loading={loading}
          />{' '}
          <Statistic
            hasInfo
            infoText="تعداد افرادی که در زمان شروع به کار سامانه در طرح واکسیناسیون شرکت نکرده بودند."
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={guildVacinateInfo.totalNonVaccinesCountBeforeStartOfSystem || 0}
            loading={loading}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="تعداد کل تست های pcr که کارفرمایان صنفی انجام داده اند."
            icon={testIcon}
            text="تعداد آزمایش های کارفرمایان صنفی"
            count={guildPcrInfo.testResultsCount}
            loading={pcrLoading}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={guildVacinateInfo.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={guildVacinateInfo.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="نسبت مبتلایان کارفرمایان صنفی به بیماری کرونا به کل جمعیت کارفرمایان صنفی"
            icon={guildPositiveIcon}
            text="درصد ابتلا به کل"
            count={guildPcrInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            loading={pcrLoading}
            isPercentage
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewGuildsProvince;
