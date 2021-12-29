import React, {useEffect, useState} from "react";
import {useLocation , useHistory } from "react-router-dom";

import Statistic from "../../containers/Guild/components/Statistic";
import transportService from "../../services/transport.service";
import totalDriver from "../../assets/images/icons/transport-color.svg";
import sufferingIcon from "../../assets/images/icons/suffering-color.svg";
import saveIcon from "../../assets/images/icons/save-color.svg";
import deadIcon from "../../assets/images/icons/dead-color.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import inquiryPlaque from "../../assets/images/icons/inquiry-plaque.svg";
import positiveInquiryPlaque from "../../assets/images/icons/positive-inquiry-plaque.svg";
import testIcon from "../../assets/images/icons/test-color.svg";


interface OverviewDriversProvinceProps {
  cityTitle: any
}

const sideCities = [
  {
    name: "هرمزگان",
    color: "#ccc"
  },
  {
    name: "بوشهر",
    color: "#ccc"
  },
  {
    name: "کهگیلویه و بویراحمد",
    color: "#ccc"
  },
  {
    name: "فارس",
    color: "#ccc"
  },
  {
    name: "اصفهان",
    color: "#ccc"
  },
  {
    name: "سمنان",
    color: "#ccc"
  },
  {
    name: "گلستان",
    color: "#ccc"
  },
  {
    name: "مازندران",
    color: "#ccc"
  },
  {
    name: "تهران",
    color: "#ccc"
  },
  {
    name: "مرکزی",
    color: "#ccc"
  },
  {
    name: "یزد",
    color: "#ccc"
  },
  {
    name: "چهارمحال و بختیاری",
    color: "#ccc"
  },
  {
    name: "خوزستان",
    color: "#ccc"
  },
  {
    name: "لرستان",
    color: "#ccc"
  },
  {
    name: "ایلام",
    color: "#ccc"
  },
  {
    name: "اردبیل",
    color: "#ccc"
  },
  {
    name: "قم",
    color: "#ccc"
  },
  {
    name: "همدان",
    color: "#ccc"
  },
  {
    name: "زنجان",
    color: "#ccc"
  },
  {
    name: "قزوین",
    color: "#ccc"
  },
  {
    name: "آذربایجان غربی",
    color: "#ccc"
  },
  {
    name: "آذربایجان شرقی",
    color: "#ccc"
  },
  {
    name: "کرمانشاه",
    color: "#ccc"
  },
  {
    name: "گیلان",
    color: "#ccc"
  },
  {
    name: "کردستان",
    color: "#ccc"
  },
  {
    name: "خراسان جنوبی",
    color: "#ccc"
  },
  {
    name: "خراسان رضوی",
    color: "#ccc"
  },
  {
    name: "خراسان شمالی",
    color: "#ccc"
  },
  {
    name: "سیستان و بلوچستان",
    color: "#ccc"
  },
  {
    name: "کرمان",
    color: "#ccc"
  },
  {
    name: "البرز",
    color: "#ccc"
  },
]

const OverviewDriversProvince: React.FC<OverviewDriversProvinceProps> = ({cityTitle}) => {

  const [numberOfDrivers, setNumberOfDrivers] = useState(null);
  const [numberOfDriversLoading, setNumberOfDriversLoading] = useState(false);
  const [numberOfPositiveDrivers, setNumberOfPositiveDrivers] = useState(null);
  const [numberOfPositiveDriversLoading, setNumberOfPositiveDriversLoading] = useState(false);
  const [numberOfRecoveredDrivers, setNumberOfRecoveredDrivers] = useState(null);
  const [numberOfRecoveredDriversLoading, setNumberOfRecoveredDriversLoading] = useState(false);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  const [numberOfPositivePlaqueVisited, setNumberOfPositivePlaqueVisited] = useState(null);
  const [numberOfPositivePlaqueVisitedLoading, setNumberOfPositivePlaqueVisitedLoading] = useState(false);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const getNumberOfDrivers = async (province: any) => {
    setNumberOfDriversLoading(true);
    try {
      const {data} = await transportService.numberOfDrivers(province);
      setNumberOfDrivers(data.numberOfDrivers)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfDriversLoading(false)
    }
  };

  const getNumberOfPositiveDrivers = async (province: any) => {
    setNumberOfPositiveDriversLoading(true)
    try {
      const {data} = await transportService.numberOfPositiveDrivers(province);
      setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveDriversLoading(false)
    }
  };

  const getNumberOfRecoveredDrivers = async (province: any) => {
    setNumberOfRecoveredDriversLoading(true)
    try {
      const {data} = await transportService.numberOfRecoveredDrivers(province);
      setNumberOfRecoveredDrivers(data.numberOfRecoveredDrivers);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfRecoveredDriversLoading(false)
    }
  };

  const getNumberOfVaccination = async (province: any) => {
    setNumberOfVaccinationLoading(true)
    try {
      const {data} = await transportService.numberOfVaccination(province);
      setNumberOfVaccination(data.numberOfVaccination);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfVaccinationLoading(false)
    }
  };

  const getNumberOfPlaqueVisited = async (province: any) => {
    setNumberOfPlaqueVisitedLoading(true)
    try {
      const {data} = await transportService.numberOfPlaqueVisited(province);
      setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false)
    }
  };

  const getNumberOfPositivePlaqueVisited = async (province: any) => {
    setNumberOfPositivePlaqueVisitedLoading(true)
    try {
      const {data} = await transportService.numberOfPositivePlaqueVisited(province);
      setNumberOfPositivePlaqueVisited(data.numberOfPositivePlaqueVisited);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositivePlaqueVisitedLoading(false)
    }
  };

  const getNumberOfTestResults = async (province: any) => {
    setNumberOfTestResultsLoading(true)
    try {
      const {data} = await transportService.numberOfTestResults(province);
      setNumberOfTestResults(data.numberOfTestResults);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfTestResultsLoading(false)
    }
  };




  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || 'تهران' as any;

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    })
    if (existsCity) {
      getNumberOfDrivers(provinceName);
      getNumberOfPositiveDrivers(provinceName);
      getNumberOfRecoveredDrivers(provinceName);
      getNumberOfVaccination(provinceName);
      getNumberOfPlaqueVisited(provinceName);
      getNumberOfPositivePlaqueVisited(provinceName);
      getNumberOfTestResults(provinceName)
    }else{
      history.push('/dashboard/transport/province');
    }

  }, [location.search])


  return (
    <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16" id="province-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان در استان
        &nbsp;
        {cityTitle}
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
          <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={numberOfVaccination}
                     loading={numberOfVaccinationLoading}/>
          <Statistic icon={inquiryPlaque} text="تعداد استعلام پلاک" count={numberOfPlaqueVisited} hasInfo
                     loading={numberOfPlaqueVisitedLoading}/>
          <Statistic icon={positiveInquiryPlaque} text="تعداد استعلام های نتیجه مثبت"
                     count={numberOfPositivePlaqueVisited} hasInfo loading={numberOfPositivePlaqueVisitedLoading}/>
          <Statistic icon={testIcon} text="تعداد آزمایش های رانندگان" count={numberOfTestResults}
                     loading={numberOfTestResultsLoading}/>
        </div>
      </div>
    </fieldset>
  )
}

export default OverviewDriversProvince;