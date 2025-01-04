import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
import moment from 'moment-jalaali';

import Charts from '../../Charts';
import DatePickerModal from '../../DatePickerModal';
import {sideCities, getColorByServiceTypeName} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';

const {Pyramid} = Charts;

interface TestsInTransportProvinceProps {
  cityTitle: any;
}

const TestsInTransportProvince: React.FC<TestsInTransportProvinceProps> = ({cityTitle}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pyramidData, setPyramidData] = useState([]);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const [query, setQuery] = useState({
    resultReceiptDateFrom: null,
    resultReceiptDateTo: null,
    province: null,
  }) as any;

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const [queryParams, setQueryParams] = useState({
  //   count: true,
  //   total: true,
  //   resultReceiptDateFrom: null,
  //   resultReceiptDateTo: null,
  //   testResultStatusList: 'POSITIVE,NEGATIVE',
  // });

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  

  // const getTestInTransport = async (params: any) => {
  //   setLoading(true);
  //   setErrorMessage(null);
  //   try {
  //     const {data} = await transportService.testsInTransport(params, {cancelToken: source.token});

  //     let normalizedData = [] as any;
  //     data.map((item: any) => {
  //       if (item.total !== 0) {
  //         return normalizedData.push({
  //           title: getServiceTypeName(item.serviceType),
  //           percentage: ((item.count * 100) / item.total).toFixed(4),
  //           color: getColorByServiceTypeName(item.serviceType),
  //         });
  //       }
  //       return null;
  //     });

  //     normalizedData = normalizedData.sort((a: any, b: any) => {
  //       return b.percentage - a.percentage;
  //     });

  //     setPyramidData(normalizedData);
  //   } catch (error: any) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //     setErrorMessage(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQuery({
        ...query,
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      setQuery({
        ...query,
        resultReceiptDateFrom: null,
        resultReceiptDateTo: null,
      });
    }
  }, [selectedDayRange]);

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
          <Calendar
            action={focusFromDate}
            from={selectedDayRange.from}
            to={selectedDayRange.to}
            setSelectedDayRange={setSelectedDayRange}
          />
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
