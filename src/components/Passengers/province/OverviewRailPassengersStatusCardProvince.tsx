import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import hcsService from 'src/services/hcs.service';
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import {cancelTokenSource, sideCities} from 'src/helpers/utils';
import passengerService from 'src/services/passenger.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import GreyVaccine from '../../../assets/images/icons/big-gray-vaccine.svg';
import totalPassengers from '../../../assets/images/icons/total-passengers.svg';
import suspiciousCovid from '../../../assets/images/icons/suspicious-covid.svg';
import grayBaggage from '../../../assets/images/icons/gray-baggage.svg';
import redBaggage from '../../../assets/images/icons/red-baggage.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import negetiveTestIcon from '../../../assets/images/icons/negetive-test-icon.svg';
// import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
// import noneVacsinateStart from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';

import {
  IInitialPcrInfo,
  IInitialTotalVacinatelInfo,
  initialpcrInfo,
  initialTotalVacinatelInfo,
} from '../public/constant';


const OverviewRailPassengersStatusCardProvince: React.FC<any> = ({cityTitle}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passengerPcrInfo, setPassengerPcrInfo] = useState<IInitialPcrInfo>(initialpcrInfo);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [tripCount, setTripCount] = useState(0);
  // const [numberOfInquiryLoading, setNumberOfInquiryLoading] = useState<boolean>(false);
  // const [inquiryCount, setInquiryCount] = useState<number>(0);
  // const [illegalTicketsSoldLoading, setIllegalTicketsSoldLoading] = useState<boolean>(false);
  // const [illegalTicketsSold, setIllegalTicketsSold] = useState<number>(0);
  const [passengerVaccinateInfo, setPassengerVaccinateInfo] =
    useState<IInitialTotalVacinatelInfo>(initialTotalVacinatelInfo);
  const cancelToken = cancelTokenSource();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getPcrResult = async (province: any): Promise<any> => {
    setPcrLoading(true);
    try {
      const res = await passengerService.passengerTestResult(
        {province, type: 'TRAIN'},
        {cancelToken: source.token}
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
  const getPassengerVaccinateInfo = async (province: any) => {
    setLoading(true);
    try {
      const res = await passengerService.getDoses(
        {province, type: 'TRAIN'},
        {cancelToken: source.token}
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

  const getTripCount = async (province: any) => {
    setTripLoading(true);
    try {
      const {data} = await hcsService.tripsCount({province, type: 'TRAIN'}, {cancelToken: cancelToken.token});
      setTripCount(data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setTripLoading(false);
    }
  };

  // const getNumberOfInquiry = async (province: any) => {
  //   setNumberOfInquiryLoading(true);
  //   try {
  //     const {data} = await hcsService.getPassengerPermissionsCount({
  //       province,
  //       permissionStatus: 'DISQUALIFIED',
  //       type: 'TRAIN'
  //     }, {cancelToken: cancelToken.token});
  //     setInquiryCount(data.count);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setNumberOfInquiryLoading(false);
  //   }
  // }
  //
  // const getIllegalTicketsSold = async (province: any) => {
  //   setIllegalTicketsSoldLoading(true);
  //   try {
  //     const {data} = await hcsService.getPassengerPermissionsCount({
  //       province,
  //       forSale: true,
  //       permissionStatus: 'DISQUALIFIED',
  //       type: 'TRAIN'
  //     }, {cancelToken: cancelToken.token});
  //     setIllegalTicketsSold(data.count);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIllegalTicketsSoldLoading(false);
  //   }
  // }

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getPassengerVaccinateInfo(provinceName);
      getPcrResult(provinceName);
      getTripCount(provinceName);
      // getNumberOfInquiry(provinceName);
      // getIllegalTicketsSold(provinceName);
    } else {
      history.push('/dashboard/passenger/province');
    }

    return () => {
      setPassengerVaccinateInfo(initialTotalVacinatelInfo);
      setPassengerPcrInfo(initialpcrInfo);
      setTripCount(0);
      // setInquiryCount(0);
      // setIllegalTicketsSold(0);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران ریلی در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalPassengers}
            text="مجموع مسافران ریلی"
            count={passengerVaccinateInfo.totalPopulation}
            loading={loading}
            hasInfo
            infoText="مجموع افرادی که حداقل یک  بلیط سفر ریلی  برای آن‌ها صادر شده است."
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
            count={passengerPcrInfo.positiveMembersCountAfterTrip || 0}
            loading={pcrLoading}
            hasInfo
            infoText="مجموع مسافران ریلی  که تا ۱۵ روز بعد از سفر تست کوید آن‌ها مبثت شده است."
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            count="-"
            hasInfo
            infoText="مجموع مسافران ریلی که به دلیل همسفری با افراد مبتلا ، مشکوک  ابتلا به کوید هستند."
            // loading={pcrLoading}
          />
          <Statistic
            icon={deadIcon}
            text="مجموع مسافران با تست نامشخص"
            count="-"
            hasInfo
            infoText="مجموع مسافرانی ریلی  که وضعیت کوید آنها مشخص نیست."
            // loading={pcrLoading}
          />
        </div>

        {/* second card row */}

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="تعداد مسافران ریلی که حداقل یک دوز واکسن را دریافت کرده اند."
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
            hasInfo
            infoText="تعداد مسافرانی ریلی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
            count={passengerVaccinateInfo.totalVaccinesCountToTotalPopulationPercentage}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد مسافران ریلی که حداقل یک دوز واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={passengerVaccinateInfo.totalNonVaccinesCountToTotalPopulationPercentage}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد مسافران ریلی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        {/* third card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="تعداد مسافران ریلی که به دلیل محدودیت‌های اعلام شده اجازه سفر ندارند."
            icon={redBaggage}
            text="تعداد استعلام فاقد مجوز"
            count="-"
            // loading={numberOfInquiryLoading}
          />
          <Statistic
            icon={grayBaggage}
            text="مجموع سفرهای صورت گرفته"
            count={tripCount}
            loading={tripLoading}
            hasInfo
            infoText="مجموع تمام سفرهای ریلی انجام شده از ابتدای راه اندازی سامانه"
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={passengerPcrInfo.positiveMembersCountAfterTripToTotalPopulationPercentage || 0}
            loading={pcrLoading}
            isPercentage
            hasInfo
            infoText="مجموع مسافران ریلی با تست کوید مثبت تا ۱۵ روز بعد از سفر"
          />
          <Statistic
            icon={redBaggage}
            text="بلیط های غیرمجاز فروخته شده"
            count="-"
            hasInfo
            infoText="تعداد بلیط ریلی فروخته شده به افرادی که مجوز خرید بلیط را ندارند."
            // loading={illegalTicketsSoldLoading}
          />
        </div>
        {/* fourth card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            loading={pcrLoading}
            icon={testIcon}
            text="تعداد آزمایش‌های مسافران"
            count={passengerPcrInfo.testResultsCount || 0}
            hasInfo
            infoText="تعداد آزمایش های کوید انجام شده توسط مسافران ریلی"
          />
          <Statistic
            loading={pcrLoading}
            icon={negetiveTestIcon}
            text="تعداد تست‌های منفی"
            count={passengerPcrInfo.negativeTestResultsCount || 0}
            hasInfo
            infoText="تعداد نتایج منفی آزمایش هایش های کوید انجام شده توسط مسافران ریلی"
          />
          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
          {/* <Statistic
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
          /> */}
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewRailPassengersStatusCardProvince;

