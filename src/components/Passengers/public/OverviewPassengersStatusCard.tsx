import React, {useEffect, useState} from 'react';
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Statistic from 'src/containers/Guild/components/Statistic';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import totalPassengers from 'src/assets/images/icons/total-passengers.svg';
import suspiciousCovid from 'src/assets/images/icons/suspicious-covid.svg';
import grayBaggage from 'src/assets/images/icons/gray-baggage.svg';
import redBaggage from 'src/assets/images/icons/red-baggage.svg';
import passengerPositiveTest from 'src/assets/images/icons/passenger-positive-test.svg';
import negetiveTestIcon from 'src/assets/images/icons/negetive-test-icon.svg';
// import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
// import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';

import {
  IInitialPcrInfo,
  IInitialTotalVacinatelInfo,
  initialpcrInfo,
  initialTotalVacinatelInfo,
} from './constant';

const OverviewPassengerStatusCard: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [numberOfInquiryLoading, setNumberOfInquiryLoading] = useState<boolean>(false);
  const [inquiryCount, setInquiryCount] = useState<number>(0);
  const [illegalTicketsSoldLoading, setIllegalTicketsSoldLoading] = useState<boolean>(false);
  const [illegalTicketsSold, setIllegalTicketsSold] = useState<number>(0);
  const [tripCount, setTripCount] = useState(0);
  const [passengerPcrInfo, setPassengerPcrInfo] = useState<IInitialPcrInfo>(initialpcrInfo);
  const [passengerVaccinateInfo, setPassengerVaccinateInfo] =
    useState<IInitialTotalVacinatelInfo>(initialTotalVacinatelInfo);
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

 



  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت مسافران در کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalPassengers}
            text="مجموع مسافران "
  
            hasInfo
            infoText="مجموع افرادی که حداقل یک بلیط مسافرتی برای آنها صادر شده است."
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
         
            hasInfo
            infoText="مجموع مسافرانی که تا ۱۵ روز بعد از سفر تست کوید آنها مثبت شده است."
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            hasInfo
            infoText="مجموع مسافرانی که به دلیل همسفری با افراد مبتلا، مشکوک ابتلا به کوید هستند."
            // loading={pcrLoading}
          />
          <Statistic
            icon={deadIcon}
            text="مجموع مسافران با تست نامشخص"
            hasInfo
            infoText="مجموع مسافرانی که وضعیت کوید آنها مشخص نیست."
            // loading={pcrLoading}
          />
        </div>

        {/* second card row */}

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="تعداد مسافرانی که حداقل یک دوز واکسن را دریافت کرده اند."
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
           
          />
          <Statistic
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
          
            hasInfo
            infoText="تعداد مسافرانی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
      
            isPercentage
            hasInfo
            infoText="درصد مسافرانی که حداقل یک دوز واکسن را دریافت کرده اند."
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            
            isPercentage
            hasInfo
            infoText="درصد مسافرانی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        {/* third card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={redBaggage}
            text="تعداد استعلام فاقد مجوز"
     
            hasInfo
            infoText="تعداد مسافرانی که به دلیل محدودیت‌های اعلام شده اجازه سفر ندارند."
          />
          <Statistic
            icon={grayBaggage}
            text="مجموع سفرهای صورت گرفته"
         
            hasInfo
            infoText="مجموع تمام سفرهای انجام شده از ابتدای راه اندازی سامانه."
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
           
            isPercentage
            hasInfo
            infoText="درصد مسافران با تست کوید مثبت"
          />
          <Statistic
            icon={redBaggage}
            text="بلیط های غیرمجاز فروخته شده"
          
            hasInfo
            infoText="تعداد بلیط فروخته شده به افرادی که مجوز خرید بلیط را ندارند."
          />
        </div>
        {/* fourth card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های مسافران"
            hasInfo
            infoText="تعداد آزمایش های کوید انجام شده توسط مسافران"
          />
          <Statistic
            icon={negetiveTestIcon}
            text="تعداد تست‌های منفی"
            hasInfo
            infoText="تعداد نتایج منفی آزمایش‌هایش های کوید انجام شده توسط مسافران"
          />
          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
          {/* <Statistic */}
          {/*   //  loading={pcrLoading} */}
          {/*   icon={totalVacsinateStart} */}
          {/*   text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه" */}
          {/*    */}
          {/* /> */}
          {/* <Statistic */}
          {/*   icon={noneVacsinateStart} */}
          {/*   text="مجموع افراد واکسینه نشده در زمان شروع سامانه" */}
          {/*   // loading={pcrLoading} */}
          {/*    */}
          {/* /> */}
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewPassengerStatusCard;
