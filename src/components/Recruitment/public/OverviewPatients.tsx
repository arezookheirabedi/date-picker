import React, {useState} from 'react';

import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
import Spinner from '../../Spinner';
// import TagsSelect from '../../TagsSelect';
import SearchableSingleSelect from '../../SearchableSingleSelect';
import useGetOverviewOfPatients from "../../../hooks/apis/useGetOverviewOfPatients";
import DatepickerQuery from "../../DatepickerQuery";

const {Line} = Charts;

interface IParams {
  tag: string;
  category: string;
  timeBoxType?: string;
  from?: any;
  to?: any;
}

const OverviewPatients: React.FC<{}> = () => {

  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false
  }) as any;

  const [query, setQuery] = useState<IParams>({
    timeBoxType: 'DAILY',
    from: null,
    to: null,
    tag: 'employee',
    category: 'heName',
  }) as any;

  const {data, loading, error: errorMessage} = useGetOverviewOfPatients(query);

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;

  //     const tmp: any[] = [];
  //     let lastState = 'ANNUAL';

  //     const start = moment(finalFromDate, 'jYYYY/jM/jD');
  //     const end = moment(finalToDate, 'jYYYY/jM/jD');

  //     const duration = moment.duration(end.diff(start));

  //     if (!duration.years()) {
  //       tmp.push(3);
  //       lastState = 'MONTHLY';
  //     }

  //     if (!duration.months() && !duration.years()) {
  //       tmp.push(2);
  //       lastState = 'WEEKLY';
  //     }

  //     if (!duration.weeks() && !duration.months() && !duration.years()) {
  //       tmp.push(1);
  //       lastState = 'DAILY';
  //     }

  //     console.log(lastState)

  //     setQueryParams({
  //       ...queryParams,
  //       // type: lastState,
  //       type: "DAILY",
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'DAILY',
  //       from: null,
  //       to: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان کارکنان دولت</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            <SearchableSingleSelect
              objectKey="categoryValue"
              placeholder="کل کارکنان"
              tag="employee"
              category="heName"
              setQueryParams={setQuery}
              queryParams={query}
            />

            <div className="flex align-center justify-between mr-8">
              <DatepickerQuery query={query} setQuery={setQuery}/>
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
        {!loading && data.length > 0 && !errorMessage && <Line data={data} />}
        {data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPatients;
