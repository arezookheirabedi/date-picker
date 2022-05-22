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
import passengerService from 'src/services/passenger.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Statistic from '../../../../containers/Guild/components/Statistic';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../constant';

const LatestOverviewOfStatusCard: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getPassengerVaccinateInfo = async () => {
    setLoading(true);
    try {
      const res = await passengerService.getDoses({}, {cancelToken: cancelToken.token});
      if (res.status === 200) {
        const newData = {...initialNumberOfDoses, ...res.data};
        setNumberOf(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPassengerVaccinateInfo();
    // getPcrResult();
    return () => {
      cancelRequest();
      setNumberOf(initialNumberOfDoses);
      // setGuildPcrInfo(initialPcrInfo);
    };
  }, []);

  return (
    <>
      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4 ">
            <Statistic
              hasInfo
              infoText="مجموع کارفرمایان صنفی که در اصناف فعالیت دارند."
              icon={guildIcon}
              text="مجموع کارفرمایان صنفی"
              count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
              loading={loading}
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              hasInfo
              infoText="تعداد کل دوز های تزریقی"
              icon={GreenVaccine}
              text="تعداد واکسیناسیون کل دوز"
              count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی  که دوز اول واکسن را دریافت کرده‌اند."
              hasInfo
              icon={YellowVaccine}
              text="تعداد واکسیناسیون دوز اول"
              count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی  که دوز دوم واکسن را دریافت کرده‌اند."
              icon={OrangeVaccine}
              text="تعداد واکسیناسیون دوز دوم"
              count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
              hasInfo
              loading={loading}
              isPercentage
            />
          </div>
        </div>

        {/* second card row */}

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4 ">
            <Statistic
              text="تعداد واکسیناسیون دوز سوم"
              hasInfo
              infoText="تعداد افرادی دوز سوم واکسن را دریافت کرده‌اند."
              icon={PurppleVaccine}
              count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی  که دوز چهارم  واکسن را دریافت کرده‌اند."
              icon={DarkgreenVaccine}
              text="تعداد واکسیناسیون دوز چهارم"
              count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
              hasInfo
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی  که دوز پنجم واکسن را دریافت کرده‌اند "
              hasInfo
              icon={BlueVaccine}
              text="تعداد واکسیناسیون دوز پنجم"
              count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
              loading={loading}
              isPercentage
            />
          </div>

          <div className="w-1/4 ">{/* cvxdvcv */}</div>
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
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
            icon={YellowVaccine}
            text="درصد افراد با دوز یک "
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
            hasInfo
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
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
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText=" درصد  افرادی که دوز پنجم واکسن را دریافت کرده‌اند ."
            hasInfo
            icon={BlueVaccine}
            text="درصد افراد با دوز پنجم"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            hasInfo
            icon={GrayVaccine}
            text="درصد واکسیناسیون انجام نشده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />

          <div className=" ">{/* cvxdvcv */}</div>
        </div>
      </div>
    </>
  );
};

export default LatestOverviewOfStatusCard;
