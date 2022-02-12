import React, {useEffect, useState} from 'react';
import vaccineService from 'src/services/vaccine.service';

import Statistic from '../../../containers/Guild/components/Statistic';
import GreenVaccine from '../../../assets/images/icons/green-vaccine.svg';
import YellowVaccine from '../../../assets/images/icons/yellow-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/purpple-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine.svg';
import personGrayVaccine from '../../../assets/images/icons/personGrayVaccine.svg';
import greenVaccineBlackVirus from '../../../assets/images/icons/green-vaccine-black-virus.svg';
import blueVaccine from '../../../assets/images/icons/blue-vaccine-sm.svg';
import greyVaccine from '../../../assets/images/icons/gray-vaccine.svg';

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

const OverviewVaccinationStatus: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>({
    doses: {...initialDoses},
    dosesPercentage: {...initialDoses},
    dosesToTotalPopulationPercentage: {...initialDoses},
    gtDoses: {...initialDoses},
    gtDosesPercentage: {...initialDoses},
    gtDosesToTotalPopulationPercentage: {...initialDoses},
    totalPopulation: 0,
    totalVaccinesCount: 0,
    totalVaccinesCountToTotalPopulationPercentage: 0,
    totalVaccinesPercentage: 0,
  });

  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral({});

      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={(numberOf.totalVaccinesCountToTotalPopulationPercentage || 0).toFixed(3)}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={YellowVaccine}
            text="درصد افراد با دوز یک"
            count={(numberOf.dosesPercentage[1] || 0).toFixed(3)}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={PurppleVaccine}
            text="درصد افراد با دوز دوم"
            count={(numberOf.dosesPercentage[2] || 0).toFixed(3)}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={NavyVaccine}
            text="درصد افراد با دوز سوم"
            count={(numberOf.dosesPercentage[3] || 0).toFixed(3)}
            loading={loading}
            isPercentage
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={personGrayVaccine}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.doses[0] || 0}
            loading={loading}
          />
          <Statistic
            icon={personGrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={(numberOf.dosesPercentage[0] || 0).toFixed(3)}
            loading={loading}
            isPercentage
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
            count={(numberOf.gtDosesPercentage[3] || 0).toFixed(3)}
            loading={loading}
            isPercentage
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={greenVaccineBlackVirus}
            text="تعداد فوتی هایی که واکسینه شده"
            count="-"
          />
          <Statistic icon={greenVaccineBlackVirus} text="درصد فوتی های واکسینه شده" count="-" />
          <Statistic icon={greyVaccine} text="مجموع تعداد دوز واکسن تزریقی" count="-" />
          <Statistic
            icon={greyVaccine}
            text="تعداد اطلاعات مخدوش"
            count={numberOf.totalPopulation - (numberOf.gtDoses[0] + numberOf.doses[0]) || 0}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewVaccinationStatus;
