import React, {useEffect, useState} from 'react';
import axios from "axios";

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

import hcsService from "../../../services/hcs.service";
import vaccineService from "../../../services/vaccine.service";

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalPassengerCount: 0,
  totalPassengerCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
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

const OverviewRecruitment: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResultInfo, setTestResultInfo] = useState<any>(initialTestResults);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {tag: 'employee'},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async () => {
    setTestResultLoading(true);
    try {
      const {data} = await hcsService.testResults({tag: 'employee'}, {cancelToken: source.token});
      setTestResultInfo((prev: any) => {
        return {
          ...prev,
          ...data,
        };
      });
      // setNumberOf({...data});
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
      source.cancel('Operation canceled by the user.');
    };
  }, []);

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
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={testResultInfo.positiveMembersCount}
            loading={testResultLoading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={testResultInfo.recoveredMembersCount}
            loading={testResultLoading}
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false}/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={totalVaccinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={numberOf.totalVaccinesCountAfterStartOfSystem || '-'}
            loading={loading}
          />
          <Statistic
            icon={noneVaccinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={numberOf.totalNonVaccinesCountBeforeStartOfSystem || '-'}
            loading={loading}
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های کارکنان دولت"
            count={testResultInfo.testResultsCount}
            loading={testResultLoading}
          />
          <Statistic
            icon={grayVaccineIcon}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
          />
          <Statistic
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={testResultInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            loading={testResultLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewRecruitment;
