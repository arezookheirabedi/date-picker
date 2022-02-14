import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
import moment from 'moment-jalaali';

import Charts from '../Charts';
import DatePickerModal from '../DatePickerModal';
import {
  toPersianDigit,
  sideCities,
  getColorByServiceTypeName,
  getServiceTypeName,
} from '../../helpers/utils';
import calendar from '../../assets/images/icons/calendar.svg';
import transportService from '../../services/transport.service';
import Spinner from '../Spinner';

const {Pyramid} = Charts;

interface TestsInTransportProvinceProps {
  cityTitle: any;
}

const TestsInTransportProvince: React.FC<TestsInTransportProvinceProps> = ({cityTitle}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pyramidData, setPyramidData] = useState([]);

  // {day: 20, month: 9, year: 1400}
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const [queryParams, setQueryParams] = useState({
    count: true,
    total: true,
    resultReceiptDateFrom: null,
    resultReceiptDateTo: null,
    testResultStatusList: 'POSITIVE,NEGATIVE',
  });

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
            percentage: ((item.count * 100) / item.total).toFixed(4),
            color: getColorByServiceTypeName(item.serviceType),
          });
        }
        return null;
      });

      normalizedDate = normalizedDate.sort((a: any, b: any) => {
        return b.percentage - a.percentage;
      });

      setPyramidData(normalizedDate);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    let idSetTimeOut: any;
    if (existsCity) {
      idSetTimeOut = setTimeout(() => {
        getTestInTransport({...queryParams, province: provinceName});
      }, 500);
    } else {
      history.push('/dashboard/transport/province');
    }
    return () => {
      if (existsCity) {
        source.cancel('Operation canceled by the user.');
        setPyramidData([]);
        clearTimeout(idSetTimeOut);
      }
    };
  }, [queryParams, location.search]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQueryParams({
        ...queryParams,
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      setQueryParams({
        ...queryParams,
        resultReceiptDateFrom: null,
        resultReceiptDateTo: null,
      });
    }
  }, [selectedDayRange]);

  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
    });
  };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        آزمایش در حمل و نقل عمومی استان &nbsp;
        {cityTitle}
      </legend>
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
              {selectedDayRange.to || selectedDayRange.from ? (
                <button type="button" onClick={clearSelectedDayRange}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              ) : (
                <img src={calendar} alt="x" className="w-5 h-5" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-start mx-4">
            <span className="dash-separator" />
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
              {selectedDayRange.to || selectedDayRange.from ? (
                <button type="button" onClick={clearSelectedDayRange}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              ) : (
                <img src={calendar} alt="x" className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>
        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && pyramidData.length > 0 && !errorMessage && <Pyramid data={pyramidData} />}
        {pyramidData.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default TestsInTransportProvince;
