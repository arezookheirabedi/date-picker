import React, {useEffect, useState} from "react";


import Statistic from "../../containers/Guild/components/Statistic";
import totalDriver from "../../assets/images/icons/transport-color.svg";
import sufferingIcon from "../../assets/images/icons/suffering-color.svg";
import saveIcon from "../../assets/images/icons/save-color.svg";
import deadIcon from "../../assets/images/icons/dead-color.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import inquiryPlaque from "../../assets/images/icons/inquiry-plaque.svg";
import positiveInquiryPlaque from "../../assets/images/icons/positive-inquiry-plaque.svg";
import testIcon from "../../assets/images/icons/test-color.svg";
import transportService from "../../services/transport.service";


const OverviewDrivers = () => {
  const [numberOfDrivers, setNumberOfDrivers] = useState(null);
  const [numberOfDriversLoading, setNumberOfDriversLoading] = useState(false);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  const [numberOfPositiveDrivers, setNumberOfPositiveDrivers] = useState(null);
  const [numberOfPositiveDriversLoading, setNumberOfPositiveDriversLoading] = useState(false);
  const [numberOfPositivePlaqueVisited, setNumberOfPositivePlaqueVisited] = useState(null);
  const [numberOfPositivePlaqueVisitedLoading, setNumberOfPositivePlaqueVisitedLoading] = useState(false);
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
      setNumberOfDrivers(data.numberOfDrivers)
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfDriversLoading(false)
    }
  };

  const getNumberOfPlaqueVisited = async () => {
    setNumberOfPlaqueVisitedLoading(true)
    try {
      const {data} = await transportService.numberOfPlaqueVisited();
      setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false)
    }
  };

  const getNumberOfPositiveDrivers = async () => {
    setNumberOfPositiveDriversLoading(true)
    try {
      const {data} = await transportService.numberOfPositiveDrivers();
      setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPositiveDriversLoading(false)
    }
  };

  const getNumberOfPositivePlaqueVisited = async () => {
    setNumberOfPositivePlaqueVisitedLoading(true)
    try {
      const {data} = await transportService.numberOfPositivePlaqueVisited();
      setNumberOfPositivePlaqueVisited(data.numberOfPositivePlaqueVisited);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfPositivePlaqueVisitedLoading(false)
    }
  };

  const getNumberOfRecoveredDrivers = async () => {
    setNumberOfRecoveredDriversLoading(true)
    try {
      const {data} = await transportService.numberOfRecoveredDrivers();
      setNumberOfRecoveredDrivers(data.numberOfRecoveredDrivers);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfRecoveredDriversLoading(false)
    }
  };

  const getNumberOfTestResults = async () => {
    setNumberOfTestResultsLoading(true)
    try {
      const {data} = await transportService.numberOfTestResults();
      setNumberOfTestResults(data.numberOfTestResults);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfTestResultsLoading(false)
    }
  };

  const getNumberOfVaccination = async () => {
    setNumberOfVaccinationLoading(true)
    try {
      const {data} = await transportService.numberOfVaccination();
      setNumberOfVaccination(data.numberOfVaccination);
    } catch (error) {
      console.log(error);
    } finally {
      setNumberOfVaccinationLoading(false)
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
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={totalDriver} text="مجموع رانندگان" count={numberOfDrivers} loading={numberOfDriversLoading}/>
          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={numberOfPositiveDrivers}
                     loading={numberOfPositiveDriversLoading}/>
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={numberOfRecoveredDrivers}
                     loading={numberOfRecoveredDriversLoading}/>
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false}/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={numberOfVaccination} loading={numberOfVaccinationLoading}/>
          <Statistic icon={inquiryPlaque} text="تعداد استعلام پلاک" count={numberOfPlaqueVisited} hasInfo
                     loading={numberOfPlaqueVisitedLoading}/>
          <Statistic icon={positiveInquiryPlaque} text="تعداد استعلام‌های کوید مثبت"
                     count={numberOfPositivePlaqueVisited} hasInfo loading={numberOfPositivePlaqueVisitedLoading}/>
          <Statistic icon={testIcon} text="تعداد آزمایش های رانندگان" count={numberOfTestResults}
                     loading={numberOfTestResultsLoading}/>
        </div>
      </div>
    </fieldset>
  )
}
export default OverviewDrivers;