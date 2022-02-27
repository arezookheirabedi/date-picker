import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {useDispatch} from 'react-redux';
import {addTotalStudentMembersAc} from 'src/store/action_creators';

import Statistic from '../../../containers/Guild/components/Statistic';
import totalStudent from '../../../assets/images/icons/graduation.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../../assets/images/icons/prescription.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import vaccineService from '../../../services/vaccine.service';
import hcsService from '../../../services/hcs.service';

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
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

const OverviewSchoolStudents = () => {
  // const [loading, setLoading] = useState(false);
  // const [numberOf, setNumberOf] = useState(null);
  // const [numberOfPositives, setNumberOfPositives] = useState(null);
  // // eslint-disable-next-line
  // const [numberOfNegatives, setNumberOfNegatives] = useState(null);

  // const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  // const [numberOfNanVaccinated, setNumberOfNanVaccinated] = useState(null);
  // const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  // const [numberOfTestResults, setNumberOfTestResults] = useState(null);

  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResultInfo, setTestResultInfo] = useState<any>(initialTestResults);

  const dispatch = useDispatch();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async () => {
    setLoading(true);
    try {
      // const {data} = await hcsService.membersGeneral(
      //   {
      //     organization: 'education',
      //     tags: ['#type# دانش آموز'].join(','),
      //     testResultCount: true,
      //     vaccinationCount: true,
      //     total: true,
      //   },
      //   {cancelToken: source.token}
      // );
      const {data} = await vaccineService.membersGeneral(
        {tag: 'edu', category: 'type', categoryValue: 'STUDENT'},
        {cancelToken: source.token}
      );
      setNumberOf((prev: any) => {
        return {
          ...prev,
          ...data,
        };
      });
      dispatch(addTotalStudentMembersAc(data.totalPopulation || 0));

      // setNumberOf(data.total || 0);
      // setNumberOfPositives(data.numberOfPositives || 0);
      // setNumberOfVaccination(data.numberOfVaccinated || 0);
      // setNumberOfNanVaccinated(data.numberOfNonVaccinated || 0);
      // setNumberOfRecovered(data.numberOfRecovered || 0);
      // setNumberOfTestResults(data.numberOfNegatives + data.numberOfPositives || 0);
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
        {cancelToken: source.token}
      );
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
      setNumberOf(null);
      setTestResultInfo(null);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به دانش آموزان کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
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
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic icon={prescriptionIcon} text="مجموع استعلام‌های آموزش و پرورش" count="-" />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های دانش آموزان"
            count={testResultInfo.testResultsCount}
            loading={testResultLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSchoolStudents;
