import React from 'react';
import Statistic from "../Overview/components/Statistic";

import totalCitizen from "../../assets/images/icons/total-citizens.svg";
import totalTests from "../../assets/images/icons/total-tests.svg";
import numberOfTotalRegisterToday from "../../assets/images/icons/number-of-total-register-today.svg";
import totalScanQr from "../../assets/images/icons/total-scan-qr.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import GrayVaccine from "../../assets/images/icons/gray-vaccine.svg";
import YellowVaccine from "../../assets/images/icons/yellow-vaccine.svg";
import GreenVaccine from "../../assets/images/icons/green-vaccine.svg";
import PcrLogo from "../../assets/images/icons/pcr-logo.svg";
import RapidLogo from "../../assets/images/icons/rapid-logo.svg";
import ElisaLogo from "../../assets/images/icons/elisa-logo.svg";
import GuildColor from "../../assets/images/icons/guild-color.svg";
import scanDangerIcon from "../../assets/images/icons/scan-danger.svg";
import scanSuccessIcon from "../../assets/images/icons/scan-success-color.svg";
import Charts from "../../components/Charts";

const {Map} = Charts;

const Citizens: React.FC<any> = () => {

  return (
    <div className="space-y-16 mb-8">
      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">وضعیت کلی شهروندان</legend>

        <div
          className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
          <div
            className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0  md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={totalCitizen} text="تعداد کل شهروندان در سامانه" count={1000000}/>
            <Statistic icon={totalTests} text="تعداد کل تست‌های انجام شده" count={100}/>
          </div>
          <div
            className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={totalScanQr} text="تعداد کل اسکن کد" count={100}/>
            <Statistic icon={numberOfTotalRegisterToday} text="تعداد ثبت نام شدگان امروز" count={1000}/>
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت استان‌ تهران</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={totalTests} text="تعداد تست‌های انجام شده در هر شهر" count={2800}/>
            <Statistic icon={totalScanQr} text="تعداد اسکن کد در هر شهر" count={1450}/>
            <Statistic icon={vaccineIcon} text="تعداد واکسیناسیون در هر شهر" count={1200}/>
          </div>
          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={PcrLogo} text="تعداد تست‌های pcr در هر شهر" count={654}/>
            <Statistic icon={RapidLogo} text="تعداد تست‌های rapid در هر شهر" count={428}/>
            <Statistic icon={ElisaLogo} text="تعداد تست‌های elisa در هر شهر" count={864}/>
          </div>

          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={GrayVaccine} text="تعداد واکسیناسیون انجام نشده در هر شهر" count={654}/>
            <Statistic icon={YellowVaccine} text="تعداد واکسیناسیون دوز اول در هر شهر" count={428}/>
            <Statistic icon={GreenVaccine} text="تعداد واکسیناسیون دوز دوم در هر شهر" count={864}/>
          </div>

          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={scanDangerIcon} text="تعداد اسکن QR کدهای مثبت" count={654}/>
            <Statistic icon={scanSuccessIcon} text="تعداد اسکن QR کدهای منفی" count={428}/>
            <Statistic icon={GuildColor} text="تعداد اسکن QR کدها در هر واحد صنفی" count={864}/>
          </div>

          <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Map/>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default Citizens;