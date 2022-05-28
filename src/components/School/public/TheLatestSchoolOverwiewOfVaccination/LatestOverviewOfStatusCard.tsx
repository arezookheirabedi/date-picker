import React, {useEffect, useState} from 'react';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
// import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import GrayVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import BlueVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';

import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import hcsService from 'src/services/hcs.service';
import Statistic from '../../../../containers/Guild/components/Statistic';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../../../Guild/public/constant';

const LatestOverviewOfStatusCard: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getScoolLatestVaccinateInfo = async (params:any) => {
    setLoading(true);
    try {
      const res = await hcsService.peopleLatestVaccinationOverview(params, {cancelToken: cancelToken.token});
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
    getScoolLatestVaccinateInfo({tag: 'edu'});
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
          <Statistic
            text="تعداد افراد با  دوز اول"
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها یک دوز واکسن است. "
            icon={YellowVaccine}
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="تعداد افرادی  که آخرین وضعیت واکسیناسیون انها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="تعداد افراد با  دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="تعداد افرادی  که آخرین وضعیت واکسیناسیون انها سه دوز واکسن است."
            hasInfo
            icon={PurppleVaccine}
            text="تعداد افراد با  دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها چهاردوز واکسن است."
            icon={DarkgreenVaccine}
            text="تعداد افراد با  دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />
        </div>

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون انها پنج دوز واکسن است."
            icon={BlueVaccine}
            text="تعداد افراد با  دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText="تعداد افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            icon={GrayVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />
          <div className="flex-col align-center justify-center w-full hidden md:flex  p-4 relative">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            text="درصد افراد با دوز یک"
            hasInfo
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها یک دوز واکسن است. "
            icon={YellowVaccine}
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="درصد  افراد با  دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی اخرین وضعیت واکسیناسیون انها سه دوز واکسن است."
            hasInfo
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم "
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
            isPercentage
          />
          <Statistic
            infoText="درصد  افرادی اخرین وضعیت واکسیناسیون انها چهاردوز واکسن است."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="درصد افرادی اخرین وضعیت واکسیناسیون انها پنج دوز واکسن است."
            icon={BlueVaccine}
            text="درصد افراد با دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
            loading={loading}
            isPercentage
          />

          <Statistic
            infoText="درصد  افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
            hasInfo
            icon={VaccineIcon}
            text="درصد  افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
          />

          <Statistic
            hasInfo
            infoText=" درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            icon={GrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
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

export default LatestOverviewOfStatusCard;
