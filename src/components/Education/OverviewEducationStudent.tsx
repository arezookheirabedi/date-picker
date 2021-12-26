import React, {useEffect, useState} from 'react';

import Statistic from '../../containers/Guild/components/Statistic';
import totalStudent from '../../assets/images/icons/graduation.svg';
import sufferingIcon from '../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../assets/images/icons/save-color.svg';
import deadIcon from '../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../assets/images/icons/prescription.svg';
import testIcon from '../../assets/images/icons/test-color.svg';
import transportService from '../../services/transport.service';

const OverviewEducationStudents = () => {
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

  const getNumberOfDrivers = async () => {
    setNumberOfDriversLoading(true);
    try {
      const {data} = await transportService.numberOfDrivers();
      setNumberOfDrivers(data.numberOfDrivers);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfDriversLoading(false);
    }
  };

  const getNumberOfPlaqueVisited = async () => {
    setNumberOfPlaqueVisitedLoading(true);
    try {
      const {data} = await transportService.numberOfPlaqueVisited();
      setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false);
    }
  };

  const getNumberOfPositiveDrivers = async () => {
    setNumberOfPositiveDriversLoading(true);
    try {
      const {data} = await transportService.numberOfPositiveDrivers();
      setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPositiveDriversLoading(false);
    }
  };

  const getNumberOfPositivePlaqueVisited = async () => {
    setNumberOfPositivePlaqueVisitedLoading(true);
    try {
      const {data} = await transportService.numberOfPositivePlaqueVisited();
      setNumberOfPositivePlaqueVisited(data.numberOfPositivePlaqueVisited);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPositivePlaqueVisitedLoading(false);
    }
  };

  const getNumberOfRecoveredDrivers = async () => {
    setNumberOfRecoveredDriversLoading(true);
    try {
      const {data} = await transportService.numberOfRecoveredDrivers();
      setNumberOfRecoveredDrivers(data.numberOfRecoveredDrivers);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfRecoveredDriversLoading(false);
    }
  };

  const getNumberOfTestResults = async () => {
    setNumberOfTestResultsLoading(true);
    try {
      const {data} = await transportService.numberOfTestResults();
      setNumberOfTestResults(data.numberOfTestResults);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfTestResultsLoading(false);
    }
  };

  const getNumberOfVaccination = async () => {
    setNumberOfVaccinationLoading(true);
    try {
      const {data} = await transportService.numberOfVaccination();
      setNumberOfVaccination(data.numberOfVaccination);
    } catch (error) {
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
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به دانش آموزان کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={numberOfDrivers}
            loading={numberOfDriversLoading}
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
            text="مجموع افراد واکسینه شده"
            count={numberOfVaccination}
            loading={numberOfVaccinationLoading}
          />
          <Statistic
            icon={prescriptionIcon}
            text="مجموع استعلام‌های آموزش و پرورش"
            count={numberOfPositivePlaqueVisited}
            loading={numberOfPositivePlaqueVisitedLoading}
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfPlaqueVisited}
            loading={numberOfPlaqueVisitedLoading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های دانش آموزان"
            count={numberOfTestResults}
            loading={numberOfTestResultsLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewEducationStudents;
