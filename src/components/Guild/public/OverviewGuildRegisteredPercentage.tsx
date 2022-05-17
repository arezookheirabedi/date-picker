import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import passengerService from 'src/services/passenger.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import SearchableSelect from 'src/components/SearchableSelect';
import DatePickerModal from '../../DatePickerModal';
// import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
import Spinner from '../../Spinner';
// import TagsSelect from '../../TagsSelect';
import Calendar from '../../Calendar';
// import hcsService from '../../../services/hcs.service';

const {Line} = Charts;

const OverviewGuildRegisteredPercentage: React.FC<{}> = () => {
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

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [query, setQuery] = useState({
    from: null,
    to: null,
  });

  const getColumnChartTestResult = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await passengerService.columnChartTestResultService(params, {
        cancelToken: cancelToken.token,
      });
      debugger;
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

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getColumnChartTestResult(query);
    }, 500);

    return () => {
      setData([]);
      cancelRequest();
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
      <legend className="text-black mx-auto px-3">
        نگاه کلی به مبتلا شدگان بعد از سفر در کل کشور
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between flex-grow px-8">
            <SearchableSelect
              placeholder="کل آموزش و پرورش"
              category="grade"
              tag="edu"
              setQueryParams={setQuery}
              queryParams={query}
            />

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

export default OverviewGuildRegisteredPercentage;
