import React from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import airplanIcon from '../../../assets/images/icons/airplan.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import carIcon from '../../../assets/images/icons/car.svg';
import railIcon from '../../../assets/images/icons/rail.svg';

const OverviewPligrimTripType: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime(
    {
      countZaerinAir: true,
      countTotal: true,
      countZaerinGround: true,
      countZaerinRail: true,
    },
    true
  );
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="mx-auto px-3 text-black">
          نگاه کلی به زائران اربعین استان &nbsp;{cityTitle}&nbsp;&nbsp;بر اساس نوع سفر
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.countTotal || 0}
              loading={loading}
              hasInfo
              infoText={`  تعداد کل زائران ثبت نام شده نهایی  در استان`}
            />
            <Statistic
              icon={airplanIcon}
              text="تعداد کل زائران هوایی"
              count={pilgrims.countZaerinAir || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را هوایی انتخاب کرده‌اند."
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران زمینی"
              count={pilgrims.countZaerinGround || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را زمینی انتخاب کرده‌اند."
            />
            <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.countZaerinRail || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را ریلی انتخاب کرده‌اند."
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimTripType;
