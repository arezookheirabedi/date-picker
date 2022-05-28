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
import vaccineService from 'src/services/vaccine.service';
import hcsService from 'src/services/hcs.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  totalVaccinesCountAfterStartOfSystem: 0,
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  // dosesPercentage: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  // totalUnknownVaccinesCount: 0,
  // totalVaccinesPercentage: 0,
};

const initialTestResults = {
  positiveMembersCount: 0,
  positiveMembersCountToTestResultsCountPercentage: 0,
  positiveMembersCountToTotalPopulationPercentage: 0,
  recoveredMembersCount: 0,
  recoveredMembersCountToTotalPopulationPercentage: 0,
  testResultsCount: 0,
  totalPopulation: 0,
};

const OverviewSteudent = () => {
  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResultInfo, setTestResultInfo] = useState<any>(initialTestResults);

  const dispatch = useDispatch();

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {tag: 'edu', category: 'type', categoryValue: 'STUDENT'},
        {cancelToken: cancelToken.token}
      );
      console.log(data, 'vaccin');
      setNumberOf((prev: any) => {
        return {
          ...prev,
          ...data,
        };
      });
      dispatch(addTotalStudentMembersAc(data.totalPopulation || 0));
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async () => {
    setTestResultLoading(true);
    try {
      const {data} = await hcsService.testResults(
        {tag: 'edu', category: 'type', categoryValue: 'STUDENT'},
        {cancelToken: cancelToken.token}
      );
      console.log(data, 'test');
      setTestResultInfo((prev: any) => {
        return {
          ...prev,
          ...data,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTestResultLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
    getTestResults();
    return () => {
      setNumberOf(initialNumberOf);
      setTestResultInfo(initialTestResults);
      cancelRequest();
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به دانش آموزان کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="مجموع دانش‌آموزان مشغول به تحصیل در کل کشور"
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={numberOf.totalPopulation || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید"
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={testResultInfo.positiveMembersCount || 0}
            loading={testResultLoading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={testResultInfo.recoveredMembersCount || 0}
            loading={testResultLoading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."
            icon={deadIcon}
            text="مجموع فوت‌ شدگان"
            count="-"
            loading={false}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={numberOf.totalVaccinesCountAfterStartOfSystem || 0}
            loading={loading}
          />{' '}
          <Statistic
            hasInfo
            infoText="تعداد افرادی که در زمان شروع به کار سامانه در طرح واکسیناسیون شرکت نکرده بودند."
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={numberOf.totalNonVaccinesCountBeforeStartOfSystem || 0}
            loading={loading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="تعداد کل تست های pcr که  کارمندان انجام داده اند."
            icon={testIcon}
            text="تعداد آزمایش های دانش آموزان"
            count={testResultInfo.testResultsCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="نسبت مبتلایان  دانش آموزان به بیماری کرونا به کل جمعیت  دانش آموزان"
            icon={studentPositiveTest}
            text="درصد ابتلا به کل"
            count={testResultInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSteudent;
