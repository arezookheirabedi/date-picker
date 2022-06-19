import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios';

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
import {sideCities} from '../../../helpers/utils';
import vaccineService from '../../../services/vaccine.service';
import hcsService from '../../../services/hcs.service';
import driverInfectedIcon from "../../../assets/images/icons/driver-infected.svg";
import totalVaccinateStart from "../../../assets/images/icons/total-vaccinate-start-work-panel.svg";
import noneVaccinateStart from "../../../assets/images/icons/none-vaccinate-start-wok-panel.svg";


interface OverviewDriversProvinceProps {
  cityTitle: any;
}

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

const OverviewDriversProvince: React.FC<OverviewDriversProvinceProps> = ({cityTitle}) => {
  // const [numberOfDrivers, setNumberOfDrivers] = useState(null);
  // const [numberOfDriversLoading, setNumberOfDriversLoading] = useState(false);
  // const [numberOfPositiveDrivers, setNumberOfPositiveDrivers] = useState(null);
  // const [numberOfPositiveDriversLoading, setNumberOfPositiveDriversLoading] = useState(false);
  // const [numberOfRecoveredDrivers, setNumberOfRecoveredDrivers] = useState(null);
  // const [numberOfRecoveredDriversLoading, setNumberOfRecoveredDriversLoading] = useState(false);
  // const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  // const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);
  // const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  // const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  // const [numberOfPositivePlaqueVisited, setNumberOfPositivePlaqueVisited] = useState(null);
  // const [numberOfPositivePlaqueVisitedLoading, setNumberOfPositivePlaqueVisitedLoading] =
  //   useState(false);
  // const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  // const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testResultLoading, setTestResultLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResultInfo, setTestResultInfo] = useState<any>(initialTestResults);

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async (province: any) => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async (province: any) => {
    setTestResultLoading(true);
    try {
      const {data} = await hcsService.testResults(
        {tag: 'transport', province},
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

  // const getNumberOfDrivers = async (province: any) => {
  //   setNumberOfDriversLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfDrivers(province, {cancelToken: source.token});
  //     setNumberOfDrivers(data.numberOfDrivers);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfDriversLoading(false);
  //   }
  // };

  // const getNumberOfPositiveDrivers = async (province: any) => {
  //   setNumberOfPositiveDriversLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfPositiveDrivers(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfPositiveDriversLoading(false);
  //   }
  // };

  // const getNumberOfRecoveredDrivers = async (province: any) => {
  //   setNumberOfRecoveredDriversLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfRecoveredDrivers(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfRecoveredDrivers(data.numberOfRecoveredDrivers);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfRecoveredDriversLoading(false);
  //   }
  // };

  // const getNumberOfVaccination = async (province: any) => {
  //   setNumberOfVaccinationLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfVaccination(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfVaccination(data.numberOfVaccination);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfVaccinationLoading(false);
  //   }
  // };

  // const getNumberOfPlaqueVisited = async (province: any) => {
  //   setNumberOfPlaqueVisitedLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfPlaqueVisited(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfPlaqueVisitedLoading(false);
  //   }
  // };

  // const getNumberOfPositivePlaqueVisited = async (province: any) => {
  //   setNumberOfPositivePlaqueVisitedLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfPositivePlaqueVisited(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfPositivePlaqueVisited(data.numberOfPositivePlaqueVisited);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfPositivePlaqueVisitedLoading(false);
  //   }
  // };

  // const getNumberOfTestResults = async (province: any) => {
  //   setNumberOfTestResultsLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfTestResults(province, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfTestResults(data.numberOfTestResults);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfTestResultsLoading(false);
  //   }
  // };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      // getNumberOfDrivers(provinceName);
      // getNumberOfPositiveDrivers(provinceName);
      // getNumberOfRecoveredDrivers(provinceName);
      // getNumberOfVaccination(provinceName);
      getNumberOf(provinceName);
      getTestResults(provinceName);
      // getNumberOfPlaqueVisited(provinceName);
      // getNumberOfPositivePlaqueVisited(provinceName);
      // getNumberOfTestResults(provinceName);
    } else {
      history.push('/dashboard/transport/province');
    }

    return () => {
      // setNumberOfDrivers(null);
      // setNumberOfPlaqueVisited(null);
      // setNumberOfPositiveDrivers(null);
      // setNumberOfPositivePlaqueVisited(null);
      // setNumberOfRecoveredDrivers(null);
      // setNumberOfTestResults(null);
      // setNumberOfVaccination(null);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16" >
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
          <Statistic icon={deadIcon} text="مجموع فوت‌شدگان" count="-" loading={false} hasInfo infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند." />
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
