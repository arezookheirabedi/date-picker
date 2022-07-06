import React, {useState} from 'react';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import DatepickerQuery from 'src/components/DatepickerQuery';
import useGetOverviewOfPatients from 'src/hooks/apis/useGetOverviewOfPatients';
import RetryButton from 'src/components/RetryButton';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
import Spinner from '../../Spinner';

const {Line} = Charts;

const OverviewSchoolsPositivePcr = () => {
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
    tag: 'edu',
    category: 'grade',
    retry: false,
  });
  const {data, loading, error: errorMessage} = useGetOverviewOfPatients(query);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی مبتلایان در آموزش و پرورش</legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between">
          <div className="align-center flex flex-grow justify-start px-8">
            <SearchableSingleSelect
              objectKey="categoryValue"
              placeholder="کل آموزش و پرورش"
              tag="edu"
              category="grade"
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
        {errorMessage && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        )}
        {!loading && data && data.length > 0 && !errorMessage && <Line data={data} />}
        {data && data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewSchoolsPositivePcr;
