import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-lg.svg';
import inquiryPlaque from '../../../assets/images/icons/inquiry-plaque.svg';
import positiveInquiryPlaque from '../../../assets/images/icons/positive-inquiry-plaque.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import driverInfectedIcon from '../../../assets/images/icons/driver-infected.svg';
import transportService from '../../../services/transport.service';

const OverviewDrivers = () => {
  const [numberOfDrivers, setNumberOfDrivers] = useState(null);
  const [numberOfDriversLoading, setNumberOfDriversLoading] = useState(false);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  const [numberOfPositiveDrivers, setNumberOfPositiveDrivers] = useState(null);
  const [numberOfPositiveDriversLoading, setNumberOfPositiveDriversLoading] = useState(false);
  const [numberOfPositivePlaqueVisited, setNumberOfPositivePlaqueVisited] = useState(null);
  const [numberOfPositivePlaqueVisitedLoading, setNumberOfPositivePlaqueVisitedLoading] =
    useState(false);
  const [numberOfRecoveredDrivers, setNumberOfRecoveredDrivers] = useState(null);
  const [numberOfRecoveredDriversLoading, setNumberOfRecoveredDriversLoading] = useState(false);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOfDrivers = async () => {
    setNumberOfDriversLoading(true);
    try {
      const {data} = await transportService.numberOfDrivers(null, {cancelToken: source.token});
      setNumberOfDrivers(data.numberOfDrivers);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfDriversLoading(false);
    }
  };

  const getNumberOfPlaqueVisited = async () => {
    setNumberOfPlaqueVisitedLoading(true);
    try {
      const {data} = await transportService.numberOfPlaqueVisited(null, {
        cancelToken: source.token,
      });
      setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false);
    }
  };

  const getNumberOfPositiveDrivers = async () => {
    setNumberOfPositiveDriversLoading(true);
    try {
      const {data} = await transportService.numberOfPositiveDrivers(null, {
        cancelToken: source.token,
      });
      setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveDriversLoading(false);
    }
  };

  const getNumberOfPositivePlaqueVisited = async () => {
    setNumberOfPositivePlaqueVisitedLoading(true);
    try {
      const {data} = await transportService.numberOfPositivePlaqueVisited(null, {
        cancelToken: source.token,
      });
      setNumberOfPositivePlaqueVisited(data.numberOfPositivePlaqueVisited);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositivePlaqueVisitedLoading(false);
    }
  };

  const getNumberOfRecoveredDrivers = async () => {
    setNumberOfRecoveredDriversLoading(true);
    try {
      const {data} = await transportService.numberOfRecoveredDrivers(null, {
        cancelToken: source.token,
      });
      setNumberOfRecoveredDrivers(data.numberOfRecoveredDrivers);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfRecoveredDriversLoading(false);
    }
  };

  const getNumberOfTestResults = async () => {
    setNumberOfTestResultsLoading(true);
    try {
      const {data} = await transportService.numberOfTestResults(null, {cancelToken: source.token});
      setNumberOfTestResults(data.numberOfTestResults);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfTestResultsLoading(false);
    }
  };

  const getNumberOfVaccination = async () => {
    setNumberOfVaccinationLoading(true);
    try {
      const {data} = await transportService.numberOfVaccination(null, {cancelToken: source.token});
      setNumberOfVaccination(data.numberOfVaccination);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfVaccinationLoading(false);
    }
  };

  useEffect(() => {
    getNumberOfDrivers();
    getNumberOfPlaqueVisited();
    getNumberOfPositiveDrivers();
    getNumberOfPositivePlaqueVisited();
    getNumberOfRecoveredDrivers();
    getNumberOfTestResults();
    getNumberOfVaccination();

    return () => {
      setNumberOfDrivers(null);
      setNumberOfPlaqueVisited(null);
      setNumberOfPositiveDrivers(null);
      setNumberOfPositivePlaqueVisited(null);
      setNumberOfRecoveredDrivers(null);
      setNumberOfTestResults(null);
      setNumberOfVaccination(null);
      source.cancel('Operation canceled by the user.');
    };
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی رانندگان کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalDriver}
            text="مجموع رانندگان"
            count={numberOfDrivers}
            loading={numberOfDriversLoading}
            hasInfo
            infoText="مجموع رانندگانی که در حمل و نقل عمومی فعالیت دارند"
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={numberOfPositiveDrivers}
            loading={numberOfPositiveDriversLoading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={numberOfRecoveredDrivers}
            loading={numberOfRecoveredDriversLoading}
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع واکسن زده‌ها"
            count={numberOfVaccination}
            loading={numberOfVaccinationLoading}
            hasInfo
            infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع واکسن نزده‌ها"
            count={0}
            hasInfo
            infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
          />
          <Statistic icon={vaccineIcon} text="درصد واکسن زده‌ها" count={0} isPercentage />
          <Statistic icon={grayVaccineIcon} text="درصد واکسن نزده‌ها" count={0} isPercentage />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={driverInfectedIcon}
            text="درصد ابتلا به کل"
            count={0}
            isPercentage
            hasInfo
            infoText="این عدد استخراج شده از مجموع افراد فعال در این حوزه با نتایج مثبت آزمایش هایشان است"
          />
          <Statistic
            icon={inquiryPlaque}
            text="تعداد استعلام پلاک"
            count={numberOfPlaqueVisited}
            loading={numberOfPlaqueVisitedLoading}
            hasInfo
            infoText="تعداد استعلام‌های وسیله نقلیه عمومی که توسط مسافران انجام شده است"
          />
          <Statistic
            icon={positiveInquiryPlaque}
            text="تعداد استعلام‌های کوید مثبت"
            count={numberOfPositivePlaqueVisited}
            loading={numberOfPositivePlaqueVisitedLoading}
            hasInfo
            infoText="تعداد استعلام‌های وسیله نقلیه عمومی با نتیجه مثبت که توسط مسافران انجام شده است"
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های رانندگان"
            count={numberOfTestResults}
            loading={numberOfTestResultsLoading}
            hasInfo
            infoText="تعداد رانندگانی که برای تست به آزمایشگاه مراجعه کرده‌اند"
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewDrivers;
