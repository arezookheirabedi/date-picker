import React from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import taxiPilgrim from '../../../assets/images/icons/taxi-pilgrim.svg';
import busPilgrim from '../../../assets/images/icons/bus-pilgrim.svg';
import carIcon from '../../../assets/images/icons/car.svg';
// import railIcon from '../../../assets/images/icons/rail.svg';

const OverviewPligrimGroundTripType = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime({
    countTaxi: true,
    countBusAndMinibus: true,
    countPersonal: true,
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
              icon={busPilgrim}
              text="تعداد کل زائران با اتوبوس"
              count={pilgrims.countBusAndMinibus || 0}
              loading={loading}
            />
            <Statistic
              icon={taxiPilgrim}
              text="تعداد کل زائران با تاکسی "
              count={pilgrims.countTaxi || 0}
              loading={loading}
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران با وسیله شخصی "
              count={pilgrims.countPersonal || 0}
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
