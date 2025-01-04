import React, {useState} from "react";
import Statistic from '../../../containers/Guild/components/Statistic';
import totalRecruitment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-lg.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import totalVaccinateStart from "../../../assets/images/icons/total-vaccinate-start-work-panel.svg";
import noneVaccinateStart from "../../../assets/images/icons/none-vaccinate-start-wok-panel.svg";
import passengerPositiveTest from "../../../assets/images/icons/passenger-positive-test.svg";
import useGetNumberOf from "../../../hooks/apis/useGetNumberOf";
import useGetTestResults from "../../../hooks/apis/useGetTestResults";


const OverviewRecruitment: React.FC<{}> = () => {

  const [query] = useState({tag: 'employee'})

  // eslint-disable-next-line
  const {data: numberOf, loading, error} = useGetNumberOf(query);
  const {
    data: testResultInfo,
    loading: testResultLoading,
    // eslint-disable-next-line
    error: testResultError
  } = useGetTestResults(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت کارکنان دولت در کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecruitment}
            text="مجموع کارکنان دولت"
            count={numberOf.totalPopulation}
           
            hasInfo
            infoText="مجموع  کل کارکنان دولت در کشور"
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={testResultInfo.positiveMembersCount}
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کووید در دسته کارکنان کشور."
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={testResultInfo.recoveredMembersCount}
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان"  loading={false} hasInfo
                     infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
           
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
           
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={totalVaccinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
           
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار به سامانه دوز اول واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={noneVaccinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
           
            hasInfo
            infoText="تعداد افرادی که در زمان شروع سامانه در طرح واکسیناسیون شرکت نکرده‌ بوداند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های کارکنان دولت"
            count={testResultInfo.testResultsCount}
            hasInfo
            infoText="تعداد کل تست های  PCR که کارکنان دولت انجام داده‌اند."
          />
          <Statistic
            icon={grayVaccineIcon}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
           
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
           
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={testResultInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            hasInfo
            infoText="نسبت مبتلایان به بیماری کرونا به کل جمعیت کارکنان دولت."
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewRecruitment;
