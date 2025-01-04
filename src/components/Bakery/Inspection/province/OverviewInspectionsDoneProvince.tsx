import React, {useState} from 'react';

import {isEmpty} from 'lodash';
import RangeDateSliderFilter from '../../../RangeDateSliderFilter';
import Spinner from '../../../Spinner';
import HeadlessChart from '../../HeadlessChart';
import RetryButton from "../../../RetryButton";

interface OverviewInspectionsDoneProvinceProps {
  cityTitle: any
}

const OverviewInspectionsDoneProvince: React.FC<OverviewInspectionsDoneProvinceProps> = ({cityTitle}) => {

  const [query, setQuery] = useState({
    timeBoxType: 'DAILY',
    retry: false
  });


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به بازرسی‌های انجام شده در استان {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-end mb-10 mt-6">
          <RangeDateSliderFilter
            changeType={v =>
              setQuery({
                ...query,
                timeBoxType: v,
              })
            }
            selectedType={query.timeBoxType}
            dates={null}
            wrapperClassName="w-1/4"
          />
        </div>

 
          <HeadlessChart data={[]} />
       
      </div>
    </fieldset>
  );
};

export default OverviewInspectionsDoneProvince;
