import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addTotalStudentMembersAc} from 'src/store/action_creators';
import {sideCities} from 'src/helpers/utils';
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

interface OverviewSchoolStudentsProps {
  cityTitle: any;
}

const OverviewSchoolStudents: React.FC<OverviewSchoolStudentsProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResultInfo, setTestResultInfo] = useState<any>(initialTestResults);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
      // const {data} = await hcsService.membersGeneral({
      //   organization: 'education',
      //   tags: ['#type# دانش آموز', `#province# استان ${province}`].join(','),
      //   testResultCount: true,
      //   vaccinationCount: true,
      //   total: true,
      // }, {cancelToken: source.token});

      const {data} = await vaccineService.membersGeneral(
        {tag: 'edu', category: 'type', categoryValue: 'STUDENT', province},
        {cancelToken: source.token}
      );
      setNumberOf((prev: any) => {
        return {
          ...prev,
          ...data,
        };
      });
      dispatch(addTotalStudentMembersAc(data.totalPopulation || 0));

      // dispatch(addTotalStudentMembersAc(data.total || 0));
      // setNumberOf(data.total || 0);
      // setNumberOfPositives(data.numberOfPositives || 0);
      // setNumberOfVaccination(data.numberOfVaccinated || 0);
      // setNumberOfNanVaccinated(data.numberOfNonVaccinated || 0);
      // setNumberOfRecovered(data.numberOfRecovered || 0);
      // setNumberOfTestResults(data.numberOfNegatives + data.numberOfPositives || 0);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);

      // // @ts-ignore
      // setNumberOf(0);
      // // @ts-ignore
      // setNumberOfPlaqueVisited(0);
      // // @ts-ignore
      // setNumberOfPositive(0);
      // // @ts-ignore
      // setNumberOfRecovered(0);
      // // @ts-ignore
      // setNumberOfTestResults(0);
      // // @ts-ignore
      // setNumberOfVaccination(0);
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async (province: any) => {
    setTestResultLoading(true);
    try {
      const {data} = await hcsService.testResults(
        {tag: 'edu', category: 'type', categoryValue: 'STUDENT', province},
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
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getNumberOf(provinceName);
      getTestResults(provinceName);
    } else {
      history.push('/dashboard/school/province');
    }

    return () => {
      source.cancel('Operation canceled by the user.');
      // setNumberOf(null);
      // setTestResultInfo(null);
      // setNumberOfPositives(null);
      // setNumberOfNegatives(null);
      // setNumberOfVaccination(null);
      // setNumberOfNanVaccinated(null);
      // setNumberOfRecovered(null);
      // setNumberOfTestResults(null);
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="school-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به دانش آموزان در استان &nbsp; {cityTitle}
      </legend>

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
