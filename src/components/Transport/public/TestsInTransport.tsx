import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import Charts from '../../Charts';
import DatePickerModal from '../../DatePickerModal';
// eslint-disable-next-line
import {getColorByServiceTypeName} from '../../../helpers/utils';
// import transportService from '../../../services/transport.service';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const {Pyramid} = Charts;

const TestsInTransport = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [pyramidData, setPyramidData] = useState([]);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const [query, setQuery] = useState({
    resultReceiptDateFrom: null,
    resultReceiptDateTo: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const overviewTestResults = async (from: any = null, to: any = null) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const {data} = await hcsService.testResultsCategory('transport', 'serviceType', {
        lang: 'fa',
        from,
        to,
      });
      console.log(data);

      let normalizedData = [] as any;
      data.map((item: any) => {
        if (item.total !== 0) {
          return normalizedData.push({
            title: item.categoryValue,
            percentage: item.testResultsCountToTotalTestResultsCountPercentage,
            color: getColorByServiceTypeName(item.categoryValue),
          });
        }
        return null;
      });

      normalizedData = normalizedData.sort((a: any, b: any) => {
        return b.percentage - a.percentage;
      });

      setPyramidData(normalizedData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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
  //     // // setPyramidData(data);
  //     // // console.log(data);
  //   } catch (error: any) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //     setErrorMessage(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    // getTestInTransport({count: true, total: true, testResultStatusList: 'POSITIVE,NEGATIVE'});
    overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setPyramidData([]);
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
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        resultReceiptDateFrom: null,
        resultReceiptDateTo: null,
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

export default TestsInTransport;
