import React from 'react';
// import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import GrayVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import guildIcon from 'src/assets/images/icons/guild-total.svg';

import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import BlueVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import useGetNumberOf from 'src/hooks/apis/useGetNumberOf';
import Statistic from '../../../../containers/Guild/components/Statistic';

const OverviewOfStatusCard: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: guildVacinateInfo, loading, error} = useGetNumberOf({tag: 'guild'});

  return (
    <>
      <div className="mt-7  flex flex-col justify-between space-y-8 border-solid border-gray-100 py-5">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع کارفرمایان صنفی که در اصناف فعالیت دارند."
            icon={guildIcon}
            text="مجموع کارفرمایان صنفی"
            count={guildVacinateInfo.totalPopulation}
            loading={loading}
          />

          <Statistic
            hasInfo
            infoText="تعداد کل دوز های تزریقی"
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={guildVacinateInfo.gtDoses[0]}
            loading={loading}
          />

          <Statistic
            infoText="تعداد افرادی  که دوز اول واکسن را دریافت کرده‌اند."
            hasInfo
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={guildVacinateInfo.doses[1]}
            loading={loading}
          />

          <Statistic
            infoText="تعداد افرادی  که دوز دوم واکسن را دریافت کرده‌اند."
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={guildVacinateInfo.doses[2]}
            hasInfo
            loading={loading}
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            text="تعداد واکسیناسیون دوز سوم"
            hasInfo
            infoText="تعداد افرادی دوز سوم واکسن را دریافت کرده‌اند."
            icon={PurppleVaccine}
            count={guildVacinateInfo.doses[3]}
            loading={loading}
          />

          <Statistic
            infoText="تعداد افرادی  که دوز چهارم  واکسن را دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={guildVacinateInfo.doses[4]}
            hasInfo
            loading={loading}
          />

          <Statistic
            infoText="تعداد افرادی  که دوز پنجم واکسن را دریافت کرده‌اند "
            hasInfo
            icon={BlueVaccine}
            text="تعداد واکسیناسیون دوز پنجم"
            count={guildVacinateInfo.doses[5]}
            loading={loading}
          />

          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
          {/* <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی که اطلاعات آنها به درستی در سامانه ثبت نشده است"
              icon={GrayVaccine}
              text=" تعداد اطلاعات مخدوش"
              count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
              hasInfo
              loading={loading}
              isPercentage
            />
          </div> */}
        </div>
        {/* <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4 ">
            <Statistic
              text=" تعداد واکسیناسیون انجام نشده"
              hasInfo
              infoText=" تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              icon={GrayVaccine}
              count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
              loading={loading}
              isPercentage
            />
          </div>
        </div> */}
      </div>
      <div className="mt-7 flex flex-col justify-between space-y-8 border-t-4 border-solid border-gray-100 py-5">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            text="درصد واکسیناسیون کل کشور"
            hasInfo
            infoText=" درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
            icon={GreenVaccine}
            count={guildVacinateInfo.totalVaccinesCountToTotalPopulationPercentage}
            loading={loading}
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
            icon={YellowVaccine}
            text="درصد افراد با دوز یک "
            count={guildVacinateInfo.dosesToTotalPopulationPercentage[1]}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
            hasInfo
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={guildVacinateInfo.dosesToTotalPopulationPercentage[2]}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم"
            count={guildVacinateInfo.dosesToTotalPopulationPercentage[3]}
            hasInfo
            loading={loading}
            isPercentage
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={guildVacinateInfo.dosesToTotalPopulationPercentage[4]}
            hasInfo
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText=" درصد  افرادی که دوز پنجم واکسن را دریافت کرده‌اند ."
            hasInfo
            icon={BlueVaccine}
            text="درصد افراد با دوز پنجم"
            count={guildVacinateInfo.dosesToTotalPopulationPercentage[5]}
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            hasInfo
            icon={GrayVaccine}
            text="درصد واکسیناسیون انجام نشده"
            count={guildVacinateInfo.totalNonVaccinesCountToTotalPopulationPercentage}
            loading={loading}
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

export default OverviewOfStatusCard;
