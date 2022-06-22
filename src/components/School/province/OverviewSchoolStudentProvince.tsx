import React, {useEffect, useState} from 'react';
import axios from 'axios';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addTotalStudentMembersAc} from 'src/store/action_creators';
import {sideCities} from 'src/helpers/utils';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import studentPositiveTest from 'src/assets/images/icons/student-positive-test.svg';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalStudent from '../../../assets/images/icons/graduation.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import vaccineService from '../../../services/vaccine.service';
import hcsService from '../../../services/hcs.service';
import {
  IInitialPcrInfo,
  IInitialVacinatelInfo,
  initialPcrInfo,
  initialVacinatelInfo,
} from '../public/constant';

interface OverviewSchoolStudentsProps {
  cityTitle: any;
}

const OverviewSchoolStudents: React.FC<OverviewSchoolStudentsProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [testResultInfo, setTestResultInfo] = useState<IInitialPcrInfo>(initialPcrInfo);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
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
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
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
    };
  }, [location.search]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center" id="school-overview">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به دانش آموزان در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText={`مجموع دانش‌آموزان مشغول به تحصیل در استان ${cityTitle}`}
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
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
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
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
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
export default OverviewSchoolStudents;
