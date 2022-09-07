import React from 'react';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import {IInitialCount} from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from 'src/containers/Guild/components/Statistic';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import personGrayVaccine from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccine from 'src/assets/images/icons/navy-vaccine-lg.svg';
import redVaccine from 'src/assets/images/icons/red-vaccine.svg';
import {IInitialVaccineValue} from '../constant';

interface IProps {
  loading: boolean;
  totalInfo: IInitialCount;
  pilgrims: IInitialVaccineValue;
  loadingPositiveTest: boolean;
}

const TheLatestOverviewPilgrimVaccineStatusPercentage: React.FC<IProps> = ({
  pilgrims,
  loading,
  totalInfo,
  loadingPositiveTest,
}) => {
  const getValue = (i: number) => {
    const data = pilgrims?.zaerinGroupByDoses?.find((item: any) => item.dose === i);
    return data?.countPercentage || 0;
  };

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به درصد آخرین وضعیت واکسیناسیون زائران
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={totalVacsinateStart}
              text="درصد زائران واکسن زده"
              count={pilgrims.totalVaccinesPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={sufferingIcon}
              text=" درصد زائران ثبت نامی با کوید مثبت"
              count={totalInfo.countLastPositiveTestResultPercentage || 0}
              loading={loadingPositiveTest}
              isPercentage
            />
            <Statistic
              icon={personGrayVaccine}
              text="درصد زائران واکسن نزده"
              count={pilgrims.totalNonVaccinesPercentage || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={YellowVaccine}
              text="درصد کل زائران  با دوز اول"
              count={getValue(1)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={OrangeVaccine}
              text="درصد کل زائران  با دوز دوم"
              count={getValue(2)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={PurppleVaccine}
              text="درصد کل زائران  با دوز سوم"
              count={getValue(3)}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد کل زائران  با دوز چهارم"
              count={getValue(4)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={NavyVaccine}
              text="درصد کل زائران  با دوز پنجم"
              count={getValue(5)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={redVaccine}
              text=" درصد زائران فاقد شرایط واکسیناسیون"
              count={pilgrims.pass6MonthFromLastVaccinesPercentage || 0}
              loading={loading}
              isPercentage
            />

            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default TheLatestOverviewPilgrimVaccineStatusPercentage;
