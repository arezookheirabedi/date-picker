import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import transportService from '../../../services/transport.service';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const {Line} = Charts;

const OverviewPositivePcr = () => {
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
    // status: 'POSITIVE',
    timeBoxType: 'DAILY',
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
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان در اصناف </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            <SearchableSingleSelect
              objectKey="categoryValue"
              placeholder="کل اصناف"
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
