import React, {useEffect, useState} from 'react';

import vaccineService from 'src/services/vaccine.service';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../../containers/Guild/components/Statistic';
import GreenVaccine from '../../../assets/images/icons/green-vaccine.svg';
import YellowVaccine from '../../../assets/images/icons/yellow-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/purpple-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine.svg';
import personGrayVaccine from '../../../assets/images/icons/personGrayVaccine.svg';
import greenVaccineBlackVirus from '../../../assets/images/icons/green-vaccine-black-virus.svg';
import blueVaccine from '../../../assets/images/icons/blue-vaccine-sm.svg';
import greyVaccine from '../../../assets/images/icons/gray-vaccine.svg';

interface OverviewVaccinationStatusProps {
  cityTitle: string;
}

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumber = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesPercentage: {...initialDoses},
  gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
}
const OverviewVaccinationStatus: React.FC<OverviewVaccinationStatusProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumber);
  const {CancelToken} = axios;
  const source = CancelToken.source();
  const getNumberOf = async (provinceName: string) => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {province: provinceName},
        {cancelToken: source.token}
      );

      setNumberOf((prev : any)=>{
        return {
          ...prev,
          ...data
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
    } else {
      history.push('/dashboard/vaccination/province');
    }

    return () => {
      source.cancel('Operation canceled by the user.');
      setNumberOf(initialNumber);
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="vaccination-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به واکسن‌های موجود در استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="تعداد کل واکسیناسیون"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
          />
          <Statistic
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
          />
          <Statistic
            icon={NavyVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[3] || 0}
            loading={loading}
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={(numberOf.totalVaccinesCountToTotalPopulationPercentage || 0)}
            loading={loading}
          />
          <Statistic
            icon={YellowVaccine}
            text="درصد افراد با دوز یک"
            count={(numberOf.dosesToTotalPopulationPercentage[1] || 0).toFixed(3)}
            loading={loading}
          />
          <Statistic
            icon={PurppleVaccine}
            text="درصد افراد با دوز دوم"
            count={(numberOf.dosesToTotalPopulationPercentage[2] || 0).toFixed(3)}
            loading={loading}
          />
          <Statistic
            icon={NavyVaccine}
            text="درصد افراد با دوز سوم"
            count={(numberOf.dosesToTotalPopulationPercentage[3] || 0).toFixed(3)}
          />
        </div>

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={personGrayVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={personGrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={(numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0)}
            loading={loading}
          />
          <Statistic
            icon={blueVaccine}
            text="تعداد واکسیناسیون بیش از ۳ دوز"
            count={numberOf.gtDoses[3] || 0}
            loading={loading}
          />
          <Statistic
            icon={blueVaccine}
            text="درصد افراد با بیش از ۳ دوز"
            count={(numberOf.gtDosesToTotalDosesPercentage[3] || 0)}
            loading={loading}
          />
        </div>

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={greenVaccineBlackVirus}
            text="تعداد فوتی هایی که واکسینه شده"
            count="-"
            loading={loading}
          />
          <Statistic
            icon={greenVaccineBlackVirus}
            text="درصد فوتی های واکسینه شده"
            count="-"
            loading={loading}
          />
          <Statistic
            icon={greyVaccine}
            text="مجموع تعداد دوز واکسن تزریقی"
            count="-"
            loading={loading}
          />
          <Statistic
            icon={greyVaccine}
            text="تعداد اطلاعات مخدوش"
            loading={loading}
            count="-"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewVaccinationStatus;
