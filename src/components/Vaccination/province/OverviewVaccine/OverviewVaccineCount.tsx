import React from 'react';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import Statistic from 'src/containers/Guild/components/Statistic';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import NavyVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';
import personGrayVaccine from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import greenVaccineBlackVirus from 'src/assets/images/icons/green-vaccine-black-virus.svg';
import blueVaccine from 'src/assets/images/icons/blue-vaccine.svg';
import greyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import {IInitialVacinatelInfo} from 'src/hooks/apis/useGetNumberOf';

interface IVaccineStatus {
  loading: boolean;
  numberOf: IInitialVacinatelInfo;
}

const OverviewVaccineCount: React.FC<IVaccineStatus> = ({loading, numberOf}) => {
  return (
    <div className="flex flex-col justify-between space-y-8">
      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          icon={GreenVaccine}
          hasInfo
          infoText="تعداد افرادی که حداقل یک دوز واکسن را دریافت کرده اند."
          text="تعداد کل واکسیناسیون"
          count={numberOf.totalVaccinesCount || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          icon={YellowVaccine}
          text="تعداد واکسیناسیون دوز اول"
          count={numberOf.doses[1] || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          icon={OrangeVaccine}
          text="تعداد واکسیناسیون دوز دوم"
          count={numberOf.doses[2] || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          icon={PurppleVaccine}
          text="تعداد واکسیناسیون دوز سوم"
          count={numberOf.doses[3] || 0}
          loading={loading}
        />
      </div>
      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          hasInfo
          infoText="تعداد افرادی که دوز چهارم واکسن را دریافت کرده‌اند."
          icon={DarkgreenVaccine}
          text="تعداد واکسیناسیون دوز چهارم"
          count={numberOf.doses[4] || 0}
          loading={loading}
        />
        <Statistic
          icon={NavyVaccine}
          hasInfo
          infoText="تعداد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
          text="تعداد واکسیناسیون دوز پنجم و بیشتر"
          count={numberOf.gtDoses[4] || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          icon={personGrayVaccine}
          text="مجموع افراد واکسینه نشده"
          count={numberOf.totalNonVaccinesCount || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که در زمان شروع سامانه در طرح واکسیناسیون شرکت نکرده‌ بوداند."
          icon={personGrayVaccine}
          text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
          count={numberOf.totalNonVaccinesCountBeforeStartOfSystem || 0}
          loading={loading}
        />
      </div>
      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          hasInfo
          infoText="تعداد افرادی که حداقل یک دوز واکسن را دریافت کرده بوداند و بر اثر بیماری کرونا فوت کردند."
          icon={greenVaccineBlackVirus}
          text="تعداد فوتی هایی که واکسینه شده"
          count="-"
        />
        <Statistic
          hasInfo
          infoText=" مجموع تعداد دوز های تزریق شده در کل کشور"
          icon={blueVaccine}
          text="مجموع تعداد دوز واکسن تزریقی"
          count={numberOf.gtDoses[0] || 0}
          loading={loading}
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که اطلاعات آنها به درستی در سامانه ثبت نشده است."
          icon={greyVaccine}
          text="تعداد اطلاعات مخدوش"
          loading={loading}
          count="-"
        />
        <Statistic
          hasInfo
          infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
          icon={totalVacsinateStart}
          text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
          count={numberOf.totalVaccinesCountAfterStartOfSystem || 0}
          loading={loading}
        />{' '}
      </div>

      {/* <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={personGrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={blueVaccine}
            text="تعداد واکسیناسیون بیش از ۳ دوز"
            count={numberOf.gtDoses[3] || 0}
            loading={loading}
          />
          <Statistic
            icon={blueVaccine}
            text="درصد افراد با بیش از ۳ دوز"
            count={numberOf.gtDosesToTotalDosesPercentage[3] || 0}
            loading={loading}
            isPercentage
          />
        </div> */}

      {/* <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={greenVaccineBlackVirus} text="درصد فوتی های واکسینه شده" count="-" />
          <Statistic icon={greyVaccine} text="مجموع تعداد دوز واکسن تزریقی" count="-" />
          <Statistic icon={greyVaccine} text="تعداد اطلاعات مخدوش" loading={loading} count="-" />
        </div> */}
    </div>
  );
};

export default OverviewVaccineCount;
