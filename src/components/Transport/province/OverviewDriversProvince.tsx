import React from 'react';

import useGetNumberOf from "../../../hooks/apis/useGetNumberOf";
import useGetTestResults from "../../../hooks/apis/useGetTestResults";
import Statistic from '../../../containers/Guild/components/Statistic';
// import transportService from '../../../services/transport.service';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-lg.svg';
// import inquiryPlaque from '../../../assets/images/icons/inquiry-plaque.svg';
// import positiveInquiryPlaque from '../../../assets/images/icons/positive-inquiry-plaque.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import driverInfectedIcon from "../../../assets/images/icons/driver-infected.svg";
import totalVaccinateStart from "../../../assets/images/icons/total-vaccinate-start-work-panel.svg";
import noneVaccinateStart from "../../../assets/images/icons/none-vaccinate-start-wok-panel.svg";



interface OverviewDriversProvinceProps {
  cityTitle: any;
}

const OverviewDriversProvince: React.FC<OverviewDriversProvinceProps> = ({cityTitle}) => {

  // eslint-disable-next-line
  const {data: numberOf, loading, error} = useGetNumberOf({tag: 'transport'}, true);
  const {
    data: testResultInfo,
    loading: testResultLoading,
    // eslint-disable-next-line
    error: testResultError
  } = useGetTestResults({tag: 'transport'}, true);

  return (
    <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16" id="province-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalDriver}
            text="مجموع رانندگان فعال"
            count={numberOf.totalPopulation}
            loading={loading}
            hasInfo
            infoText="مجموع رانندگانی که در حمل‌ و نقل عمومی فعالیت دارند."
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={testResultInfo.positiveMembersCount}
            loading={testResultLoading}
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید."
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبودیافتگان"
            count={testResultInfo.recoveredMembersCount}
            loading={testResultLoading}
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌شدگان" count="-" loading={false} hasInfo
                     infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."/>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع واکسن زده‌ها"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع واکسن نزده‌ها"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={vaccineIcon}
            text="درصد واکسن زده‌ها"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
          />
          <Statistic
            icon={grayVaccineIcon}
            text="درصد واکسن نزده‌ها"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={driverInfectedIcon}
            text="درصد ابتلا به کل"
            count={testResultInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            loading={testResultLoading}
            isPercentage
            hasInfo
            infoText="نسبت مبتلایان به بیماری کرونا به کل جمعیت رانندگان."
          />
          <Statistic
            icon={totalVaccinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={numberOf.totalVaccinesCountAfterStartOfSystem || '-'}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار به سامانه دوز اول واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={noneVaccinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={numberOf.totalNonVaccinesCountBeforeStartOfSystem || '-'}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که در زمان شروع سامانه در طرح واکسیناسیون شرکت نکرده‌ بوداند."
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های رانندگان"
            count={testResultInfo.testResultsCount}
            loading={testResultLoading}
            hasInfo
            infoText="تعداد کل تست های PCR که رانندگان انجام داده‌اند."
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewDriversProvince;
