import React, {useEffect, useState} from 'react';
import hcsService from 'src/services/hcs.service';
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import passengerService from 'src/services/passenger.service';
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
import {
  IInitialPcrInfo,
  IInitialTotalVacinatelInfo,
  initialpcrInfo,
  initialTotalVacinatelInfo,
} from './constant';

const OverviewAirlinesPassengersStatusCard: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passengerPcrInfo, setPassengerPcrInfo] = useState<IInitialPcrInfo>(initialpcrInfo);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [tripCount, setTripCount] = useState(0);
  const [passengerVaccinateInfo, setPassengerVaccinateInfo] =
    useState<IInitialTotalVacinatelInfo>(initialTotalVacinatelInfo);
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getPcrResult = async (): Promise<any> => {
    setPcrLoading(true);
    try {
      const res = await passengerService.passengerTestResult(
        {type: 'AIRPLANE'},
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) {
        const newData = {...passengerPcrInfo, ...res.data};
        setPassengerPcrInfo(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setPcrLoading(false);
    }
  };
  const getPassengerVaccinateInfo = async () => {
    setLoading(true);
    try {
      const res = await passengerService.getDoses(
        {type: 'AIRPLANE'},
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) {
        const newData = {...passengerVaccinateInfo, ...res.data};
        setPassengerVaccinateInfo(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTripCount = async () => {
    setTripLoading(true);
    try {
      const {data} = await hcsService.tripsCount(
        {type: 'AIRPLANE'},
        {cancelToken: cancelToken.token}
      );
      setTripCount(data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setTripLoading(false);
    }
  };

  useEffect(() => {
    getPassengerVaccinateInfo();
    getPcrResult();
    getTripCount();
    return () => {
      cancelRequest();
      setPassengerVaccinateInfo(initialTotalVacinatelInfo);
      setPassengerPcrInfo(initialpcrInfo);
      setTripCount(0);
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران هوایی در کل کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalPassengers}
            text="مجموع مسافران هوایی"
            count={passengerVaccinateInfo.totalPopulation}
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
            count={passengerPcrInfo.positiveMembersCountAfterTrip || 0}
            loading={pcrLoading}
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            count="-"
            // loading={pcrLoading}
          />
          <Statistic
            icon={deadIcon}
            text="مجموع مسافران با تست نامشخص"
            count="-"
            // loading={pcrLoading}
          />
        </div>

        {/* second card row */}

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="افرادی که دو دوز واکسن دریافت نموده اند واکسینه شده تلقی می گردند.      "
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={passengerVaccinateInfo.totalVaccinesCount}
            loading={loading}
          />
          <Statistic
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={passengerVaccinateInfo.totalNonVaccinesCount}
            loading={loading}
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
            count={passengerVaccinateInfo.totalVaccinesCountToTotalPopulationPercentage}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={passengerVaccinateInfo.totalNonVaccinesCountToTotalPopulationPercentage}
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
            text="تعداد سفرهای جلوگیری شده"
            count="-"
            // loading={pcrLoading}
          />
          <Statistic
            icon={grayBaggage}
            text="مجموع سفرهای صورت گرفته"
            count={tripCount}
            loading={tripLoading}
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={passengerPcrInfo.positiveMembersCountAfterTripToTotalPopulationPercentage || 0}
            loading={pcrLoading}
            isPercentage
          />
          <Statistic
            infoText="مرجع صادر کننده بلیط اجازه صدور بلیط نداشته ولی بلیط صادر شده است."
            hasInfo
            icon={redBaggage}
            text="مجموع سفر های غیر مجاز"
            count="-"
            // loading={pcrLoading}
            isPercentage
          />
        </div>
        {/* fourth card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            loading={pcrLoading}
            icon={testIcon}
            text="تعداد آزمایش‌های مسافران"
            count={passengerPcrInfo.testResultsCount || 0}
          />
          <Statistic
            loading={pcrLoading}
            icon={negetiveTestIcon}
            text="تعداد تست‌های منفی"
            count={passengerPcrInfo.negativeTestResultsCount || 0}
          />
          <Statistic
            //  loading={pcrLoading}
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count="-"
          />
          <Statistic
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            // loading={pcrLoading}
            count="-"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewAirlinesPassengersStatusCard;
