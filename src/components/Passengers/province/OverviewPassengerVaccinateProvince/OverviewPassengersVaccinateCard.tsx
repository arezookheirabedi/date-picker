import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import GreenTotlaPassenger from 'src/assets/images/icons/green-totla-passenger.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import Statistic from '../../../../containers/Guild/components/Statistic';
import hcsService from '../../../../services/hcs.service';
import {sideCities} from '../../../../helpers/utils';

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

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
      const {data} = await hcsService.tripVaccinationGeneral(
        {province},
        {cancelToken: source.token}
      );
      // console.log(data);
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
    } else {
      history.push('/dashboard/passenger/province');
    }

    return () => {
      setNumberOf(initialNumberOf);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return (
    <>
      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={GreenTotlaPassenger}
            text="مجموع مسافران کل کشور"
            count={numberOf.totalPopulation || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="یک دوز-دو دوز-سه در)مجموع افرادی که واکسن دریافت کرده‌اند)"
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که فقط یک دوز واکسن دریافت کرده‌اند."
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که دو دوز واکسن دریافت کرده‌اند."
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
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
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که چهار دوز واکسن دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.doses[4] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که پنج   دوز واکسن دریافت کرده‌اند."
            icon={VaccineIcon}
            text="تعداد واکسیناسیون دوز پنجم و بیشتر"
            count={numberOf.gtDoses[4] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=" تعداد افرادی که اطلاعات آن‌ها در سامانه به درستی ثبت نشده است."
            icon={GreyVaccine}
            text="تعداد اطلاعات مخدوش"
            count={numberOf.totalUnknownVaccinesCount || 0}
            loading={loading}
          />
        </div>

        {/* third card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <div className="w-1/4 ">
            <Statistic
              infoText="تعداد افرادی که برای دریافت واکسن مراجعه نکرده اند."
              hasInfo
              icon={GreyVaccine}
              text="تعداد واکسیناسیون انجام نشده   "
              count={numberOf.totalNonVaccinesCount || 0}
              loading={loading}
            />
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
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
          />
          <Statistic
            text="درصد افراد با دوز یک"
            hasInfo
            infoText="مجموع درصد افرادی که  دوز اول را در سطح کشور دریافت کرده‌اند."
            icon={YellowVaccine}
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={numberOf.dosesToTotalPopulationPercentage[2] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم "
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <div className="w-1/4 ">
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد افراد با دوز چهارم"
              count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
              hasInfo
              loading={loading}
              isPercentage
            />
          </div>
          <div className="w-1/4 ">
            <Statistic
              icon={VaccineIcon}
              text="درصد افراد با دوز پنجم"
              count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
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
