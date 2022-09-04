import React from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import airplanIcon from '../../../assets/images/icons/airplan.svg';
// import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import carIcon from '../../../assets/images/icons/car.svg';
import railIcon from '../../../assets/images/icons/rail.svg';

const OverviewPligrimTripTypePercentage = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime({
    countZaerinAir: true,
    countTotal: true,
    countZaerinGround: true,
    countZaerinRail: true,
  });
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به درصد زائران اربعین براساس نوع سفر
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            {/* <Statistic
              icon={groupWithFlagIcon}
              text="درصد کل زائران"
              count={pilgrims.countTotalPercentage || 0}
              loading={loading}
              isPercentage
            /> */}
            <Statistic
              icon={airplanIcon}
              text="درصد کل زائران هوایی"
              count={pilgrims.countZaerinAirPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={carIcon}
              text="درصد کل زائران زمینی"
              count={pilgrims.countZaerinGroundPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={railIcon}
              text="درصد کل زائران ریلی"
              count={pilgrims.countZaerinRailPercentage || 0}
              loading={loading}
              isPercentage
            />
            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimTripTypePercentage;
