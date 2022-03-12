import React, {useState} from 'react';
import axios from 'axios';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import GreenTotlaPassenger from 'src/assets/images/icons/green-totla-passenger.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import Statistic from '../../../../containers/Guild/components/Statistic';



const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalPassengerCount: 0,
  totalPassengerCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
};
const OverviewPassengerVaccinateCard: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const {CancelToken} = axios;
  // eslint-disable-next-line
  const source = CancelToken.source();

  return (
<>
      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={GreenTotlaPassenger} text="مجموع مسافران کل کشور" count={0} loading={loading} />
          <Statistic
            hasInfo
            infoText=" مجموع افرادی که واکسن دریافت کرده اند(یک دوز _ دو دوز _ سه دوز)"
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که فقط یک دوز واکسن دریافت کرده‌اند."
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که دو دوز واکسن دریافت کرده‌اند."
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={0}
            loading={loading}
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText="تعداد افرادی که سه دوز واکسن دریافت کرده‌اند."
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که چهار دوز واکسن دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که پنج   دوز واکسن دریافت کرده‌اند."
            icon={VaccineIcon}
            text="تعداد واکسیناسیون دوز پنجم"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText=" تعداد افرادی که اطلاعات آن‌ها در سامانه به درستی ثبت نشده است."
            icon={GreyVaccine}
            text="تعداد اطلاعات مخدوش"
            count={0}
            loading={loading}
            isPercentage
          />
        </div>

        {/* third card row */}

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی که برای دریافت واکسن مراجعه نکرده اند."
              hasInfo
              icon={GreyVaccine}
              text="تعداد واکسیناسیون انجام نشده   "
              count={0}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="مجموع تعداد افراد واکسینه شده سطح کشور"
            hasInfo
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={0}
            loading={loading}
          />
          <Statistic
            text="درصد افراد با دوز یک"
            hasInfo
            infoText="مجموع درصد افرادی که  دوز اول را در سطح کشور دریافت کرده‌اند."
            icon={YellowVaccine}
            count={0}
            loading={loading}
          />
          <Statistic
            hasInfo
infoText="مجموع درصد افرادی که دوز دوم واکسن را در سطح کشور دریافت نموده اند."

            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={0}
            loading={loading}
          />
          <Statistic
infoText="مجموع درصد افرادی که دوز سوم واکسن را در سطح کشور دریافت نموده اند."

            hasInfo
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم "
            count={0}
            loading={loading}
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  md:flex-row justify-start  space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4 ">
            <Statistic
infoText="مجموع درصد افرادی که دوز چهارم واکسن را در سطح کشور دریافت نموده اند."

              icon={DarkgreenVaccine}
              text="درصد افراد با دوز چهارم"
              count={0}
              hasInfo
              
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
infoText="مجموع درصد افرادی که دوز پنجم واکسن را در سطح کشور دریافت نموده اند."

              icon={VaccineIcon}
              text="درصد افراد با دوز پنجم"
              count={0}
              hasInfo
              loading={loading}
              isPercentage
            />
          </div>
        </div>
      </div>
      </>
  );
};

export default OverviewPassengerVaccinateCard;
