import React from 'react';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
// import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import GrayVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import BlueVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import Statistic from 'src/containers/Guild/components/Statistic';
import {IInitialVacinatelInfo} from 'src/hooks/apis/useGetNumberOf';

const LatestOverviewOfStatusCard: React.FC<{loading?: boolean; numberOf: IInitialVacinatelInfo}> = ({
  loading=false,
  numberOf,
}) => {
  return (
    <>
      <div className="mt-7  flex flex-col justify-between space-y-8 border-gray-100 py-5">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            text="تعداد افراد با  دوز اول"
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها یک دوز واکسن است. "
            icon={YellowVaccine}
            count={numberOf.doses[1] || 0}
           
          />

          <Statistic
            hasInfo
            infoText="تعداد افرادی  که آخرین وضعیت واکسیناسیون انها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="تعداد افراد با  دوز دوم"
            count={numberOf.doses[2] || 0}
           
          />
          <Statistic
            infoText="تعداد افرادی  که آخرین وضعیت واکسیناسیون انها سه دوز واکسن است."
            hasInfo
            icon={PurppleVaccine}
            text="تعداد افراد با  دوز سوم"
            count={numberOf.doses[3] || 0}
           
          />
          <Statistic
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها چهاردوز واکسن است."
            icon={DarkgreenVaccine}
            text="تعداد افراد با  دوز چهارم"
            count={numberOf.doses[4] || 0}
            hasInfo
           
          />
        </div>

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها پنج دوز واکسن است."
            icon={BlueVaccine}
            text="تعداد افراد با  دوز پنجم"
            count={numberOf.doses[5] || 0}
            hasInfo
           
          />

          <Statistic
            infoText="تعداد افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount || 0}
           
          />

          <Statistic
            infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            icon={GrayVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            hasInfo
           
          />
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-col justify-between space-y-8 border-t-4 border-solid border-gray-100 py-5">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            text="درصد افراد با دوز یک"
            hasInfo
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها یک دوز واکسن است. "
            icon={YellowVaccine}
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
           
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="درصد  افراد با  دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
           
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی اخرین وضعیت واکسیناسیون انها سه دوز واکسن است."
            hasInfo
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم "
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
           
            isPercentage
          />
          <Statistic
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها چهاردوز واکسن است."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
            hasInfo
           
            isPercentage
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="درصد افرادی اخرین وضعیت واکسیناسیون انها پنج دوز واکسن است."
            icon={BlueVaccine}
            text="درصد افراد با دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
           
            isPercentage
          />

          <Statistic
            infoText="درصد  افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
            hasInfo
            icon={VaccineIcon}
            text="درصد  افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
           
            isPercentage
          />

          <Statistic
            hasInfo
            infoText=" درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            icon={GrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
           
            isPercentage
          />

          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestOverviewOfStatusCard;
