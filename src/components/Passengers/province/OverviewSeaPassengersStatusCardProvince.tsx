import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import Statistic from '../../../containers/Guild/components/Statistic';
import GreyVaccine from '../../../assets/images/icons/big-gray-vaccine.svg';
import totalPassengers from '../../../assets/images/icons/total-passengers.svg';
import suspiciousCovid from '../../../assets/images/icons/suspicious-covid.svg';
import grayBaggage from '../../../assets/images/icons/gray-baggage.svg';
import redBaggage from '../../../assets/images/icons/red-baggage.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import negetiveTestIcon from '../../../assets/images/icons/negetive-test-icon.svg';
import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import noneVacsinateStart from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';
import hcsService from '../../../services/hcs.service';
import {sideCities} from '../../../helpers/utils';

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalPassengerCount: 0,
  totalPassengerCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
};

const initialTestResults = {
  totalPopulation: 0,
  positiveMembersCountAfterTrip: 0,
  testResultsCount: 0,
  negativeTestResultsCount: 0,
  positiveMembersCountAfterTripToTotalPopulationPercentage: 0,
};

const OverviewSeaPassengersStatusCardProvince: React.FC<any> = ({cityTitle}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [testResultloading, setTestResultloading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [testResults, setTestResults] = useState<any>(initialTestResults);
  const [tripCount, setTripCount] = useState(0);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
      const {data} = await hcsService.tripVaccinationGeneral(
        {province, type: 'SHIP'},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async (province: string) => {
    setTestResultloading(true);
    try {
      const {data} = await hcsService.tripTestResultsGeneral(
        {province, type: 'SHIP'},
        {cancelToken: source.token}
      );
      // console.log(data);
      setTestResults({...data});
      // setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setTestResultloading(false);
    }
  };

  const getTripCount = async (province: string) => {
    setLoading(true);
    try {
      const {data} = await hcsService.tripsCount(
        {province, type: 'SHIP'},
        {cancelToken: source.token}
      );
      setTripCount(data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
      getTestResults(provinceName);
      getTripCount(provinceName);
    } else {
      history.push('/dashboard/passenger/province');
    }

    return () => {
      setNumberOf(initialNumberOf);
      setTestResults(initialTestResults);
      setTripCount(0);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="passenger-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران دریایی در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalPassengers}
            text="مجموع مسافران "
            count={numberOf.totalPopulation}
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
            count={testResults.positiveMembersCountAfterTrip}
            loading={testResultloading}
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            count="-"
            loading={false}
          />
          <Statistic icon={deadIcon} text="مجموع مسافران با تست نامشخص" count="-" loading={false} />
        </div>

        {/* second card row */}

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="افرادی که دو دوز واکسن دریافت نموده اند واکسینه شده تلقی می گردند.      "
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
        </div>
        {/* third card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="افرادی که در هنگام صدور بلیط مجاز به خرید بلیط تشخیص داده نشده اند."
            hasInfo
            icon={redBaggage}
            text="تعداد سفر های جلوگیری شده"
            count="-"
            loading={false}
          />
          <Statistic
            infoText="      "
            icon={grayBaggage}
            text="مجموع سفر های صورت گرفته"
            count={tripCount}
            loading={false}
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={testResults.positiveMembersCountAfterTripToTotalPopulationPercentage || 0}
            loading={testResultloading}
            isPercentage
          />
          <Statistic
            infoText="مرجع صادر کننده بلیط اجازه صدور بلیط نداشته ولی بلیط صادر شده است."
            hasInfo
            icon={redBaggage}
            text="مجموع سفر های غیر مجاز"
            count="-"
            loading={false}
            isPercentage
          />
        </div>
        {/* fourth card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های مسافران"
            count={testResults.testResultsCount || 0}
            loading={testResultloading}
          />
          <Statistic
            icon={negetiveTestIcon}
            text="تعداد تست‌های منفی"
            count={testResults.negativeTestResultsCount || 0}
            loading={testResultloading}
          />
          <Statistic
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count="-"
          />
          <Statistic
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count="-"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewSeaPassengersStatusCardProvince;
