import React from 'react';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import Statistic from 'src/containers/Guild/components/Statistic';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import NavyVaccine from 'src/assets/images/icons/navy-vaccine-lg.svg';
import personGrayVaccine from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import greenVaccineBlackVirus from 'src/assets/images/icons/green-vaccine-black-virus.svg';
import {IInitialVacinatelInfo} from '../../public/constant';

interface IVaccineStatus {
  loading: boolean;
  numberOf: IInitialVacinatelInfo;
}

const OverviewVaccinePercentage: React.FC<IVaccineStatus> = ({loading, numberOf}) => {
  return (
    <div className="flex flex-col justify-between space-y-8">
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
        <Statistic
          isPercentage
          icon={GreenVaccine}
          hasInfo
          infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده اند."
          text=" درصد واکسیناسیون کل کشور"
          count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          icon={YellowVaccine}
          text="درصد افراد دوز یک"
          count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          icon={OrangeVaccine}
          text="درصد افراد دوز دوم"
          count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          icon={PurppleVaccine}
          text="درصد افراد دوز سوم"
          count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
          loading={loading}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          icon={DarkgreenVaccine}
          text="درصد افراد دوز چهارم"
          count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          icon={NavyVaccine}
          hasInfo
          infoText="درصد افرادی دوز پنجم واکسن را دریافت کرده‌اند."
          text="درصد افراد دوز پنجم"
          count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد  افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          icon={personGrayVaccine}
          text="درصد افراد واکسینه نشده"
          count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText=" درصد افرادی که در زمان شروع سامانه در طرح واکسیناسیون شرکت نکرده‌ بوداند."
          icon={personGrayVaccine}
          text="درصد افراد واکسینه نشده در زمان شروع سامانه"
          count={numberOf.totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage || 0}
          loading={loading}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده بوداند و بر اثر بیماری کرونا فوت کردند."
          icon={greenVaccineBlackVirus}
          text="درصد فوتی هایی که واکسینه شده"
          count="-"
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
          icon={totalVacsinateStart}
          text="درصد مراجعات واکسیناسیون بعد از شروع سامانه"
          count={numberOf.totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage || 0}
          loading={loading}
        />{' '}
        <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
          {/* cvxdvcv */}
        </div>
        <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
          {/* cvxdvcv */}
        </div>
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

export default OverviewVaccinePercentage;
