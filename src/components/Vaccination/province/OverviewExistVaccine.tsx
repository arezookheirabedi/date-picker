import React from 'react';

import Statistic from '../../../containers/Guild/components/Statistic';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine.svg';

interface OverviewExistVaccineProps {
  cityTitle: any;
}

const OverviewExistVaccine: React.FC<OverviewExistVaccineProps> = ({cityTitle}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت واکسیناسیون استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={NavyVaccine} text="واکسن آسترازنکا" count={0} loading={false} />
          <Statistic icon={NavyVaccine} text="واکسن سینوفارم" count={0} loading={false} />
          <Statistic icon={NavyVaccine} text="واکسن کوواکسین" count={0} loading={false} />
          <Statistic icon={NavyVaccine} text="واکسن برکت" count="-" loading={false} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={NavyVaccine} text="واکسن اسپوتینک" count={342} loading={false} />
          <Statistic icon={NavyVaccine} text="واکسن اسپایکوژن" count={342} loading={false} />
          <Statistic icon={NavyVaccine} text="-" count={342} loading={false} />
          <Statistic icon={NavyVaccine} text="درصد افراد با دوز سوم" count="-" />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewExistVaccine;
