import React, {useEffect, useState} from 'react';

import Statistic from '../../containers/Guild/components/Statistic';
import totalRecritment from '../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../assets/images/icons/save-color.svg';
import deadIcon from '../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../assets/images/icons/gray-vaccine-lg.svg';
import prescriptionIcon from '../../assets/images/icons/prescription.svg';
import testIcon from '../../assets/images/icons/test-color.svg';
import hcsServices from '../../services/hcs.service';

const OverviewRecruitment = () => {
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfLoading, setNumberOfLoading] = useState(false);
  const [numberOfNanVaccinated, setNumberOfNanVaccinated] = useState(null);
  const [numberOfNanVaccinatedLoading, setNumberOfNanVaccinatedLoading] = useState(false);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfPositiveLoading, setNumberOfPositiveLoading] = useState(false);
  const [numberOfPositiveNanVaccinated, setNumberOfPositiveNanVaccinated] = useState(null);
  const [numberOfPositiveNanVaccinatedLoading, setNumberOfPositiveNanVaccinatedLoading] =
    useState(false);
  // eslint-disable-next-line
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  // eslint-disable-next-line
  const [numberOfRecoveredLoading, setNumberOfRecoveredLoading] = useState(false);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);

  const getNumberOf = async () => {
    setNumberOfLoading(true);
    try {
      const {data} = await hcsServices.membersGeneral();
      setNumberOf(data.total);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfLoading(false);
    }
  };

  const getNumberOfNanVaccinated = async () => {
    setNumberOfNanVaccinatedLoading(true);
    try {
      const {data} = await hcsServices.membersGeneral();
      setNumberOfNanVaccinated(data.numberOfNanVaccinated);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfNanVaccinatedLoading(false);
    }
  };

  const getNumberOfPositive = async () => {
    setNumberOfPositiveLoading(true);
    try {
      const {data} = await hcsServices.membersGeneral();
      setNumberOfPositive(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveLoading(false);
    }
  };

  const getNumberOfPositiveNanVaccinated = async () => {
    setNumberOfPositiveNanVaccinatedLoading(true);
    try {
      // const {data} = await hcsServices.membersGeneral();
      // @ts-ignore
      setNumberOfPositiveNanVaccinated(0);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveNanVaccinatedLoading(false);
    }
  };

  const getNumberOfRecovered = async () => {
    setNumberOfRecoveredLoading(true);
    try {
      const {data} = await hcsServices.membersGeneral();
      setNumberOfRecovered(data.numberOfRecovered);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfRecoveredLoading(false);
    }
  };

  const getNumberOfTestResults = async () => {
    setNumberOfTestResultsLoading(true);
    try {
      const {data} = await hcsServices.membersGeneral();
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
      const {data} = await hcsServices.membersGeneral();
      setNumberOfVaccination(data.numberOfVaccinated);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfVaccinationLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
    getNumberOfNanVaccinated();
    getNumberOfPositive();
    getNumberOfPositiveNanVaccinated();
    getNumberOfRecovered();
    getNumberOfTestResults();
    getNumberOfVaccination();
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت کارکنان دولت در کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارکنان دولت"
            count={numberOf}
            loading={numberOfLoading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={numberOfPositive}
            loading={numberOfPositiveLoading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count="-"
            // loading={numberOfRecoveredLoading}
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
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfNanVaccinated}
            loading={numberOfNanVaccinatedLoading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            count={numberOfTestResults}
            loading={numberOfTestResultsLoading}
          />
          <Statistic
            icon={prescriptionIcon}
            text="مجموع استعلام از مراجعین دولتی"
            count={numberOfPositiveNanVaccinated}
            loading={numberOfPositiveNanVaccinatedLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewRecruitment;
