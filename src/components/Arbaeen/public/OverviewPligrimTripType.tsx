import React from 'react';
import useGetArbaeenCountData from 'src/hooks/apis/useGetArbaeenCountData';
import Statistic from '../../../containers/Guild/components/Statistic';
import airplanIcon from '../../../assets/images/icons/airplan.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import carIcon from '../../../assets/images/icons/car.svg';
import railIcon from '../../../assets/images/icons/rail.svg';

const OverviewPligrimTripType = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountData({
    countZaerinAir: true,
    countTotal: true,
    countZaerinGround: true,
    countZaerinRail: true,
  });
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به زائران اربعین براساس نوع سفر
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.countTotal || 0}
              loading={loading}
            />
            <Statistic
              icon={airplanIcon}
              text="تعداد کل زائران هوایی"
              count={pilgrims.countZaerinAir || 0}
              loading={loading}
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران زمینی"
              count={pilgrims.countZaerinGround || 0}
              loading={loading}
            />
            <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.countZaerinRail || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimTripType;
