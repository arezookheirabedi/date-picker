import React from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import airplanIcon from '../../../assets/images/icons/airplan.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import carIcon from '../../../assets/images/icons/car.svg';
// import railIcon from '../../../assets/images/icons/rail.svg';

const OverviewPligrimGroundTripType = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime({
    countTaxi: true,
    countBusAndMiniBus: true,
    personal: true,
  });
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به زائران ایران براساس نوع عزیمت تا مرز
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="  اتوبوس"
              count={pilgrims.countBusAndMiniBus || 0}
              loading={loading}
            />
            <Statistic
              icon={airplanIcon}
              text=" تاکسی "
              count={pilgrims.countTaxi || 0}
              loading={loading}
            />
            <Statistic
              icon={carIcon}
              text=" وسیله شخصی"
              count={pilgrims.personal || 0}
              loading={loading}
            />
            {/* <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.countZaerinRail || 0}
              loading={loading}
            /> */}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimGroundTripType;
