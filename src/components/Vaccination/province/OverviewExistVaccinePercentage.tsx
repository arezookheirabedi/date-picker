import React from 'react';

import Statistic from '../../../containers/Guild/components/Statistic';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import barekat from '../../../assets/images/logos/barekat.svg';
import astrazeneca from '../../../assets/images/logos/astrazeneca.svg';
import covaxin from '../../../assets/images/logos/covaxin.svg';
import sinopharm from '../../../assets/images/logos/sinopharm.svg';
import sputnik from '../../../assets/images/logos/sputnik.svg';
import spikogen from '../../../assets/images/logos/spikogen.svg';

interface OverviewExistVaccinePercentageProps {
  cityTitle: any;
}

const OverviewExistVaccinePercentage: React.FC<OverviewExistVaccinePercentageProps> = ({
  cityTitle,
}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به درصد واکسن های موجود در استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={astrazeneca} text="درصد واکسن آسترازنکا" count="-" loading={false} isPercentage />
          <Statistic icon={sinopharm} text="درصد واکسن سینوفارم" count="-" loading={false} isPercentage/>
          <Statistic icon={covaxin} text="درصد واکسن کوواکسین" count="-" loading={false} isPercentage/>
          <Statistic icon={barekat} text="درصد واکسن برکت" count="-" loading={false} isPercentage/>
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={sputnik} text="درصد واکسن اسپوتینک" count="-" loading={false} isPercentage/>
          <Statistic icon={spikogen} text="درصد واکسن اسپایکوژن" count="-" loading={false} isPercentage/>
          <Statistic icon={NavyVaccine} text="" count="-" loading={false} />
          <Statistic icon={NavyVaccine} text="" count="-" />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewExistVaccinePercentage;
