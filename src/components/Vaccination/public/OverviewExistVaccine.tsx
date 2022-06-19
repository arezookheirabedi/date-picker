import React from 'react';

import NavyVaccine from 'src/assets/images/icons/navy-vaccine-lg.svg';
import Statistic from '../../../containers/Guild/components/Statistic';

import barekat from '../../../assets/images/logos/barekat.svg';
import astrazeneca from '../../../assets/images/logos/astrazeneca.svg';
import covaxin from '../../../assets/images/logos/covaxin.svg';
import sinopharm from '../../../assets/images/logos/sinopharm.svg';
import sputnik from '../../../assets/images/logos/sputnik.svg';
import spikogen from '../../../assets/images/logos/spikogen.svg';

const OverviewExistVaccine = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به واکسن های موجود در کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={astrazeneca} text="واکسن آسترازنکا" count="-" loading={false} />
          <Statistic icon={sinopharm} text="واکسن سینوفارم" count="-" loading={false} />
          <Statistic icon={covaxin} text="واکسن کوواکسین" count="-" loading={false} />
          <Statistic icon={barekat} text="واکسن برکت" count="-" loading={false} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={sputnik} text="واکسن اسپوتینک" count="-" loading={false} />
          <Statistic icon={spikogen} text="واکسن اسپایکوژن" count="-" loading={false} />
          <Statistic icon={NavyVaccine} text="" count="-" loading={false} />
          <Statistic icon={NavyVaccine} text="" count="-" />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewExistVaccine;
