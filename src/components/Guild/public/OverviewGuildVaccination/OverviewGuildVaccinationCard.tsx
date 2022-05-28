import React, {useEffect, useState} from 'react';
// import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import GrayVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import guildIcon from 'src/assets/images/icons/guild-total.svg';

import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import BlueVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';

import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';

import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import Statistic from '../../../../containers/Guild/components/Statistic';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../constant';

const OverviewOfStatusCard: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [guildVacinateInfo, setGuildVacinateInfo] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getGuildVacinateInfo = async () => {
    setLoading(true);
    try {
      const res = await vaccineService.membersGeneral(
        {tag: 'guild'},
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) {
        const newData = {...guildVacinateInfo, ...res.data};
        setGuildVacinateInfo(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuildVacinateInfo();

    return () => {
      cancelRequest();
      setGuildVacinateInfo(initialVacinatelInfo);
    };
  }, []);

  return (
    <>
      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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

          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
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
      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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

          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewOfStatusCard;
