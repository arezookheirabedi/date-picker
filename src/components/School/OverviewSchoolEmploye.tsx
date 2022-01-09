import React, {useEffect, useState} from 'react';

import Statistic from '../../containers/Guild/components/Statistic';
import totalRecritment from '../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../assets/images/icons/save-color.svg';
import deadIcon from '../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../assets/images/icons/prescription.svg';
import testIcon from '../../assets/images/icons/test-color.svg';
import hcsService from '../../services/hcs.service';

const OverviewSchoolEmploye = () => {
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfLoading, setNumberOfLoading] = useState(false);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfPositiveLoading, setNumberOfPositiveLoading] = useState(false);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfRecoveredLoading, setNumberOfRecoveredLoading] = useState(false);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);

  const getNumberOf = async () => {
    setNumberOfLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
      setNumberOf(data.total);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfLoading(false);
    }
  };

  const getNumberOfPlaqueVisited = async () => {
    setNumberOfPlaqueVisitedLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
      setNumberOfPlaqueVisited(data.numberOfNanVaccinated);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false);
    }
  };

  const getNumberOfPositive = async () => {
    setNumberOfPositiveLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
      setNumberOfPositive(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveLoading(false);
    }
  };

 

  const getNumberOfRecovered = async () => {
    setNumberOfRecoveredLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
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
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
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
      const {data} = await hcsService.membersGeneral({organization: 'school', tag: 'student'});
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
    getNumberOfPlaqueVisited();
    getNumberOfPositive();
    getNumberOfRecovered();
    getNumberOfTestResults();
    getNumberOfVaccination();
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به پرسنل اداری آموزش و پرورش کل کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارمندان آموزش پرورش"
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
            count={numberOfRecovered}
            loading={numberOfRecoveredLoading}
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
            count="-"
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfPlaqueVisited}
            loading={numberOfPlaqueVisitedLoading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            count={numberOfTestResults}
            loading={numberOfTestResultsLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSchoolEmploye;
