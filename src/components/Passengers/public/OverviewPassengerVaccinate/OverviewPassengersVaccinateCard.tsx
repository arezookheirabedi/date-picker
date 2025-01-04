import React, {useEffect, useState} from 'react';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import GreenTotlaPassenger from 'src/assets/images/icons/green-totla-passenger.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Statistic from '../../../../containers/Guild/components/Statistic';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../constant';

const OverviewPassengerVaccinateCard: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }





  return (
    <>
      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={GreenTotlaPassenger}
            text="مجموع مسافران کل کشور"
        
          />
          <Statistic
            hasInfo
            infoText=" مجموع افرادی که واکسن دریافت کرده اند(یک دوز _ دو دوز _ سه دوز)"
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.gtDoses[0] || 0}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که فقط یک دوز واکسن دریافت کرده‌اند."
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که دو دوز واکسن دریافت کرده‌اند."
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="تعداد افرادی که سه دوز واکسن دریافت کرده‌اند."
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[3] || 0}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که چهار دوز واکسن دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.doses[4] || 0}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که پنج   دوز واکسن دریافت کرده‌اند."
            icon={VaccineIcon}
            text="تعداد واکسیناسیون دوز پنجم و بیشتر"
            count={numberOf.gtDoses[4] || 0}
          />
          <Statistic
            hasInfo
            infoText=" تعداد افرادی که اطلاعات آن‌ها در سامانه به درستی ثبت نشده است."
            icon={GreyVaccine}
            text="تعداد اطلاعات مخدوش"
            //
          />
        </div>

        {/* third card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="تعداد افرادی که برای دریافت واکسن مراجعه نکرده اند."
            hasInfo
            icon={GreyVaccine}
            text="تعداد واکسیناسیون انجام نشده   "
        
          />
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col justify-between space-y-8 border-t-4 border-solid border-gray-100 py-5">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="مجموع تعداد افراد واکسینه شده سطح کشور"
            hasInfo
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
 
            isPercentage
          />
          <Statistic
            text="درصد افراد با دوز یک"
            hasInfo
            infoText="مجموع درصد افرادی که  دوز اول را در سطح کشور دریافت کرده‌اند."
            icon={YellowVaccine}
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="مجموع درصد افرادی که دوز دوم واکسن را در سطح کشور دریافت نموده اند."
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
            isPercentage
          />
          <Statistic
            infoText="مجموع درصد افرادی که دوز سوم واکسن را در سطح کشور دریافت نموده اند."
            hasInfo
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم "
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            isPercentage
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="مجموع درصد افرادی که دوز چهارم واکسن را در سطح کشور دریافت نموده اند."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
            hasInfo
            isPercentage
          />

          <Statistic
            infoText="مجموع درصد افرادی که دوز پنجم واکسن را در سطح کشور دریافت نموده اند."
            icon={VaccineIcon}
            text="درصد افراد با دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            hasInfo
            isPercentage
          />
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPassengerVaccinateCard;
