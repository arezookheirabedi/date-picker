import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import DatePickerModal from '../../DatePickerModal';
// import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import {toPersianDigit} from '../../../helpers/utils';
import Spinner from '../../Spinner';
// import TagsSelect from '../../TagsSelect';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const {Line} = Charts;

const OverviewPatients = () => {
  const [data, setData] = useState([]);
  // const [serviceType, setServiceType] = useState(null) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  // const [queryParams, setQueryParams] = useState<IParams>({
  //   status: 'POSITIVE',
  //   type: 'MONTHLY',
  //   from: '',
  //   to: '',
  //   tags: '',
  // });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [query, setQuery] = useState({
    // status: 'POSITIVE',
    // type: 'MONTHLY',
    from: null,
    to: null,
    category: 'grade',
    categoryValue: null,
    tag: 'edu',
  });

  const getColumnChartTestResult = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await hcsService.columnChartTestResultService(params, {
        cancelToken: source.token,
      });
      console.log(response.data);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const getLinearOverviewPublicTransport = async (params: any) => {
  //   setLoading(true);
  //   setErrorMessage(null);
  //   try {
  //     const response = await hcsService.testResultTimeBased(params, {cancelToken: source.token});
  //     setData(response.data);
  //   } catch (error: any) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      // getLinearOverviewPublicTransport({organization: 'education', ...queryParams});
      getColumnChartTestResult(query);
    }, 500);

    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
      clearTimeout(idSetTimeOut);
    };
  }, [query]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQuery({
        ...query,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

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

  //     setQueryParams({
  //       ...queryParams,
  //       type: lastState,
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'MONTHLY',
  //       from: null,
  //       to: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان آموزش و پرورش</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between flex-grow px-8">
            {/* <TagsSelect
              placeholder="کل آموزش و پرورش"
              category="grade"
              tag="edu"
              setQueryParams={setQueryParams}
              queryParams={queryParams}
            /> */}

            <div className="flex align-center justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <Calendar
                action={focusFromDate}
                from={selectedDayRange.from}
                to={selectedDayRange.to}
                setSelectedDayRange={setSelectedDayRange}
              />
            </div>
          </div>
          {/* 
          <RangeDateSliderFilter
            changeType={v =>
              setQueryParams({
                ...queryParams,
                type: v,
              })
            }
            selectedType={queryParams.type}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          /> */}
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
