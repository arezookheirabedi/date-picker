import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import {cancelTokenSource, sideCities} from 'src/helpers/utils';
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


const OverviewLandPassengersStatusCardProvince: React.FC<any> = ({cityTitle}) => {
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





  // const getNumberOfInquiry = async (province: any) => {
  //   setNumberOfInquiryLoading(true);
  //   try {
  //     const {data} = await hcsService.getPassengerPermissionsCount({
  //       province,
  //       permissionStatus: 'DISQUALIFIED',
  //       type: 'BUS'
  //     }, {cancelToken: cancelToken.token});
  //     setInquiryCount(data.count);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setNumberOfInquiryLoading(false);
  //   }
  // }

  // const getIllegalTicketsSold = async (province: any) => {
  //   setIllegalTicketsSoldLoading(true);
  //   try {
  //     const {data} = await hcsService.getPassengerPermissionsCount({
  //       province,
  //       forSale: true,
  //       permissionStatus: 'DISQUALIFIED',
  //       type: 'BUS'
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



  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران زمینی در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalPassengers}
            text="مجموع مسافران زمینی"
            hasInfo
            infoText="مجموع افرادی که حداقل یک  بلیط سفر زمینی برای آن‌ها صادر شده است."
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
            hasInfo
            infoText="مجموع مسافران زمینی که تا ۱۵ روز بعد از سفر تست کوید آن‌ها مبثت شده است."
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            hasInfo
            infoText="مجموع مسافران زمینی که به دلیل همسفری با افراد مبتلا ، مشکوک  ابتلا به کوید هستند."
            // loading={pcrLoading}
          />
          <Statistic
            icon={deadIcon}
            text="مجموع مسافران با تست نامشخص"
            hasInfo
            infoText="مجموع مسافرانی زمینی  که وضعیت کوید آنها مشخص نیست."
            // loading={pcrLoading}
          />
        </div>

        {/* second card row */}

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            hasInfo
            infoText="تعداد مسافران زمینی که حداقل یک دوز واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            hasInfo
            infoText="تعداد مسافرانی زمینی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
            isPercentage
            hasInfo
            infoText="درصد مسافران زمینی که حداقل یک دوز واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            isPercentage
            hasInfo
            infoText="درصد مسافران زمینی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        {/* third card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={redBaggage}
            text="تعداد استعلام فاقد مجوز"
            hasInfo
            infoText="تعداد مسافران زمینی که به دلیل محدودیت‌های اعلام شده اجازه سفر ندارند."
            // loading={numberOfInquiryLoading}
          />
          <Statistic
            icon={grayBaggage}
            text="مجموع سفرهای صورت گرفته"
            hasInfo
            infoText="مجموع تمام سفرهای زمینی انجام شده از ابتدای راه اندازی سامانه"
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            isPercentage
            hasInfo
            infoText="مجموع مسافران زمینی با تست کوید مثبت تا ۱۵ روز بعد از سفر"
          />
          <Statistic
            icon={redBaggage}
            text="بلیط های غیرمجاز فروخته شده"
            hasInfo
            infoText="تعداد بلیط زمینی فروخته شده به افرادی که مجوز خرید بلیط را ندارند."
            // loading={illegalTicketsSoldLoading}
          />
        </div>
        {/* fourth card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های مسافران"
            hasInfo
            infoText="تعداد آزمایش های کوید انجام شده توسط مسافران زمینی"
          />
          <Statistic
            icon={negetiveTestIcon}
            text="تعداد تست‌های منفی"
            hasInfo
            infoText="تعداد نتایج منفی آزمایش هایش های کوید انجام شده توسط مسافران زمینی"
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
            
          />
          <Statistic
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            // loading={pcrLoading}
            
          /> */}
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewLandPassengersStatusCardProvince;

