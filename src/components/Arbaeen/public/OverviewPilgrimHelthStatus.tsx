import React from 'react';

import useGetArbaeenCountData from 'src/hooks/apis/useGetArbaeenCountData';

// components
import Statistic from '../../../containers/Guild/components/Statistic';

// images
import testIcon from '../../../assets/images/icons/test-color.svg';
import passengerNegativeTestIcon from '../../../assets/images/icons/passenger-negative-test.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import informationUpdatedIcon from '../../../assets/images/icons/information-updated.svg';

const OverviewPilgrimHelthStatus = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountData({
    countHasDiabetes: true,
    countHasHepatitis: true,
    countHeartDisease: true,
    countHasMetalInBody: true,
  });
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت سلامت زائران</legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={informationUpdatedIcon}
              text="تعداد زائران با بیماری دیابت"
              count={pilgrims.countHasDiabetes || 0}
              loading={loading}
            />
            <Statistic
              icon={testIcon}
              text="تعداد زائران با بیماری هپاتیت"
              count={pilgrims.countHasHepatitis || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerNegativeTestIcon}
              text="تعداد زائران با مشکلات قلبی "
              count={pilgrims.countHeartDisease || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerPositiveTest}
              text="تعداد زائران با وجود پلاتین در بدن"
              count={pilgrims.countHasMetalInBody || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrimHelthStatus;
