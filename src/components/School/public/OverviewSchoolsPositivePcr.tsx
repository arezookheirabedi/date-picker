import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import transportService from '../../../services/transport.service';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const {Line} = Charts;

const OverviewSchoolsPositivePcr = () => {
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [query, setQuery] = useState({
    type: 'MONTHLY',
    from: null,
    to: null,
    categoryValue: null,
    tag: 'guild',
    category: 'categoryDesc',
  });

  const getColumnChartTestResult = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await hcsService.columnChartTestResultService(params, {
        cancelToken: source.token,
      });
      // console.log(response.data);
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
  //     const response = await transportService.linearOverviewPublicTransport(params, {
  //       cancelToken: source.token,
  //     });
  //     setData(response.data);
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
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
  //       fromDate: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       toDate: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'MONTHLY',
  //       fromDate: null,
  //       toDate: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان دراصناف</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            <SearchableSingleSelect
              placeholder="کل اصناف "
              tag="guild"
              category="categoryDesc"
              setQueryParams={setQuery}
              queryParams={query}
            />
            <div className="flex align-center justify-between mr-8">
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

          <RangeDateSliderFilter
            changeType={v =>
              setQuery({
                ...query,
                type: v,
              })
            }
            selectedType={query.type}
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

export default OverviewSchoolsPositivePcr;
