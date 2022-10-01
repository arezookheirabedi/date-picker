import React, {useState} from 'react';
// @ts-ignore
import {isEmpty} from 'lodash';

import RangeDateSliderFilter from '../../../RangeDateSliderFilter';
import Spinner from '../../../Spinner';
import HeadlessChart from '../../HeadlessChart';
import useGetOverviewOfInspectionsDone from '../../../../hooks/apis/inspection/useGetOverviewOfInspectionsDone';
import RetryButton from "../../../RetryButton";

const OverviewInspectionsDone: React.FC<{}> = () => {


  const [query, setQuery] = useState({
    timeBoxType: 'DAILY',
    retry: false
  });

  const {
    data: dataset,
    loading,
    error: errorMessage,
    optionChart: options
  } = useGetOverviewOfInspectionsDone(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به بازرسی‌های انجام شده در کشور
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

        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && !loading &&(
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}
        {!loading && !isEmpty(dataset) && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={options}/>
        )}
        {isEmpty(dataset) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewInspectionsDone;
