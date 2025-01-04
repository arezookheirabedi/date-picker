import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTotalStudentMembersAc} from 'src/store/action_creators';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import studentPositiveTest from 'src/assets/images/icons/student-positive-test.svg';
import Statistic from 'src/containers/Guild/components/Statistic';
import totalStudent from 'src/assets/images/icons/graduation.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import useGetNumberOf from 'src/hooks/apis/useGetNumberOf';
import useGetTestResults from 'src/hooks/apis/useGetTestResults';

const OverviewSteudent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState<any>({tag: 'edu', category: 'type', categoryValue: 'STUDENT'});
  const dispatch = useDispatch();
  const {
    data: numberOf,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useGetNumberOf(query);
  const {
    data: testResultInfo,
    loading: testResultLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: errorTestResult,
  } = useGetTestResults(query);

  useEffect(() => {
    dispatch(addTotalStudentMembersAc(numberOf.totalPopulation || 0));
  }, [numberOf]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی به دانش آموزان کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع دانش‌آموزان مشغول به تحصیل در کل کشور"
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={numberOf.totalPopulation || 0}
           
          />
          <Statistic
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید"
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={testResultInfo.positiveMembersCount || 0}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={testResultInfo.recoveredMembersCount || 0}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."
            icon={deadIcon}
            text="مجموع فوت‌ شدگان"
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
           
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
           
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={numberOf.totalVaccinesCountAfterStartOfSystem || 0}
           
          />{' '}
          <Statistic
            hasInfo
            infoText="تعداد افرادی که در زمان شروع به کار سامانه در طرح واکسیناسیون شرکت نکرده بودند."
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={numberOf.totalNonVaccinesCountBeforeStartOfSystem || 0}
           
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="تعداد کل تست های pcr که  کارمندان انجام داده اند."
            icon={testIcon}
            text="تعداد آزمایش های دانش آموزان"
            count={testResultInfo.testResultsCount || 0}
           
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
           
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
           
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="نسبت مبتلایان  دانش آموزان به بیماری کرونا به کل جمعیت  دانش آموزان"
            icon={studentPositiveTest}
            text="درصد ابتلا به کل"
            count={testResultInfo.positiveMembersCountToTotalPopulationPercentage || 0}
           
            isPercentage
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSteudent;
