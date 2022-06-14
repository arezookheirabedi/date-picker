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
import {IInitialVacinatelInfo} from '../constant';

interface IVaccineStatus {
  loading: boolean;
  numberOf: IInitialVacinatelInfo;
  thelatestNumberOf: IInitialVacinatelInfo;
  theLatestloading: boolean;
}

const OverviewVaccinePercentage: React.FC<IVaccineStatus> = ({
  loading,
  numberOf,
  thelatestNumberOf,
  theLatestloading,
}) => {
  return (
    <div className="flex flex-col justify-between space-y-8">
      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
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
          count={thelatestNumberOf.dosesToTotalPopulationPercentage[1] || 0}
          loading={theLatestloading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          icon={OrangeVaccine}
          text="درصد افراد دوز دوم"
          count={thelatestNumberOf.dosesToTotalPopulationPercentage[2] || 0}
          loading={theLatestloading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          icon={PurppleVaccine}
          text="درصد افراد دوز سوم"
          count={thelatestNumberOf.dosesToTotalPopulationPercentage[3] || 0}
          loading={theLatestloading}
        />
      </div>
      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          isPercentage
          hasInfo
          infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          icon={DarkgreenVaccine}
          text="درصد افراد دوز چهارم"
          count={thelatestNumberOf.dosesToTotalPopulationPercentage[4] || 0}
          loading={theLatestloading}
        />
        <Statistic
          isPercentage
          icon={NavyVaccine}
          hasInfo
          infoText="درصد افرادی دوز پنجم واکسن را دریافت کرده‌اند."
          text="درصد افراد دوز پنجم"
          count={thelatestNumberOf.dosesToTotalPopulationPercentage[5] || 0}
          loading={theLatestloading}
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

      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          isPercentage
          hasInfo
          infoText=""
          icon={YellowVaccine}
          text="وضعیت دوز اول در سطح کشور"
          count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText=""
          icon={OrangeVaccine}
          text="وضعیت دوز دوم در سطح کشور"
          count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText=""
          icon={PurppleVaccine}
          text="وضعیت دوز سوم در سطح کشور"
          count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
          loading={loading}
        />
        <Statistic
          isPercentage
          hasInfo
          infoText=""
          icon={DarkgreenVaccine}
          text="وضعیت دوز چهارم در سطح کشور"
          count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
          loading={loading}
        />
      </div>

      <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          isPercentage
          icon={NavyVaccine}
          hasInfo
          infoText=""
          text="وضعیت دوز پنجم در سطح کشور"
          count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
          loading={loading}
        />
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
        <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
          {/* cvxdvcv */}
        </div>
      </div>
    </div>
  );
};

export default OverviewVaccinePercentage;
