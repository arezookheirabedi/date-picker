import React from 'react';

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
  cityTitle: any;
}

const OverviewVaccinationStatus: React.FC<OverviewVaccinationStatusProps> = ({cityTitle}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="vaccination-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به واکسن‌های موجود در استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={GreenVaccine} text="تعداد کل واکسیناسیون" count={0} loading={false} />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={0}
            loading={false}
          />
          <Statistic
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={0}
            loading={false}
          />
          <Statistic
            icon={NavyVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count="-"
            loading={false}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={0}
            loading={false}
          />
          <Statistic icon={YellowVaccine} text="درصد افراد با دوز یک" count={0} loading={false} />
          <Statistic icon={PurppleVaccine} text="درصد افراد با دوز دوم" count={0} loading={false} />
          <Statistic icon={NavyVaccine} text="درصد افراد با دوز سوم" count="-" />
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={personGrayVaccine}
            text="مجموع افراد واکسینه نشده"
            count={0}
            loading={false}
          />
          <Statistic
            icon={personGrayVaccine}
            text="درصد افراد واکسینه نشده"
            count={0}
            loading={false}
          />
          <Statistic
            icon={blueVaccine}
            text="تعداد واکسیناسیون بیش از ۳ دوز"
            count={0}
            loading={false}
          />
          <Statistic
            icon={blueVaccine}
            text="درصد افراد با بیش از ۳ دوز"
            count={0}
            loading={false}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={greenVaccineBlackVirus}
            text="تعداد فوتی هایی که واکسینه شده"
            count="-"
            loading={false}
          />
          <Statistic
            icon={greenVaccineBlackVirus}
            text="درصد فوتی های واکسینه شده"
            count="-"
            loading={false}
          />
          <Statistic
            icon={greyVaccine}
            text="مجموع تعداد دوز واکسن تزریقی"
            count="-"
            loading={false}
          />
          <Statistic icon={greyVaccine} text="تعداد اطلاعات مخدوش" count="-" />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewVaccinationStatus;
