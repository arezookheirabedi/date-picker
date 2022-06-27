import React, {useState} from 'react';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import DatepickerQuery from 'src/components/DatepickerQuery';
// import calendar from '../../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import transportService from '../../../services/transport.service';
import Spinner from '../../Spinner';
import useGetOverviewOfPatients from '../../../hooks/apis/useGetOverviewOfPatients';

const {Line} = Charts;

const OverviewPositivePcr = () => {
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const [query, setQuery] = useState({
    timeBoxType: 'DAILY',
    from: null,
    to: null,
    categoryValue: null,
    tag: 'guild',
    category: 'categoryDesc',
  });
  const {data, loading, error: errorMessage} = useGetOverviewOfPatients(query);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی مبتلایان در اصناف </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between">
          <div className="align-center flex flex-grow justify-start px-8">
            <SearchableSingleSelect
              objectKey="categoryValue"
              placeholder="کل اصناف"
              tag="guild"
              category="categoryDesc"
              setQueryParams={setQuery}
              queryParams={query}
            />
            <div className="align-center mr-8 flex justify-between">
              <DatepickerQuery query={query} setQuery={setQuery} />
            </div>
          </div>

          <RangeDateSliderFilter
            changeType={v =>
              setQuery({
                ...query,
                timeBoxType: v,
              })
            }
            selectedType={query.timeBoxType}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />
        </div>
        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}

        {!loading && !isEmpty(data) && !errorMessage && <Line data={data} />}
        {isEmpty(data) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPositivePcr;
