import React, {useEffect, useState} from 'react';
import axios from "axios";
// @ts-ignore
import moment from 'moment-jalaali';
import Charts from '../Charts';
import DatePickerModal from '../DatePickerModal';
import {toPersianDigit, getColorByServiceTypeName, getServiceTypeName} from '../../helpers/utils';
import calendar from '../../assets/images/icons/calendar.svg';
import transportService from '../../services/transport.service';
import Spinner from '../Spinner';

const {Pyramid} = Charts;

const TestsInTransport = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [pyramidData, setPyramidData] = useState([]);

  // {day: 20, month: 9, year: 1400}
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from
      ? // eslint-disable-next-line
      selectedDayRange.from.year +
      '/' +
      selectedDayRange.from.month +
      '/' +
      selectedDayRange.from.day
      : '';
  };

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to
      ? // eslint-disable-next-line
      selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
      : '';
  };

  const getTestInTransport = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await transportService.testsInTransport(params, {cancelToken: source.token});

      let normalizedDate = [] as any;
      data.map((item: any) => {
        if (item.total !== 0) {
          return normalizedDate.push({
            title: getServiceTypeName(item.serviceType),
            percentage: ((item.count * 100) / item.total).toFixed(2),
            color: getColorByServiceTypeName(item.serviceType),
          });
        }
        return null;
      });

      normalizedDate = normalizedDate.sort((a: any, b: any) => {
        return b.percentage - a.percentage;
      });

      setPyramidData(normalizedDate);
      // // setPyramidData(data);
      // // console.log(data);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTestInTransport({count: true, total: true, testResultStatusList: 'POSITIVE,NEGATIVE'});
    return () => {
      source.cancel('Operation canceled by the user.');
      setPyramidData([]);
    }
  }, []);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      getTestInTransport({
        count: true,
        total: true,
        testResultStatusList: 'POSITIVE,NEGATIVE',
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">آزمایش در حمل و نقل</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <div className="flex align-center justify-start">
          {showDatePicker ? (
            <DatePickerModal
              setSelectedDayRange={setSelectedDayRange}
              selectedDayRange={selectedDayRange}
              setShowDatePicker={setShowDatePicker}
              showDatePicker
            />
          ) : null}
          <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
            <div
              className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              {selectedDayRange.from && (
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateFromDate())}
                </span>
              )}
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
          <div className="flex items-center justify-start mx-4">
            <span className="dash-separator"/>
          </div>
          <div className="shadow-custom rounded-lg px-4 py-1">
            <div
              className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              {selectedDayRange.to && (
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateToDate())}
                </span>
              )}
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
        </div>
        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && pyramidData.length > 0 && !errorMessage && <Pyramid data={pyramidData}/>}
        {pyramidData.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default TestsInTransport;
