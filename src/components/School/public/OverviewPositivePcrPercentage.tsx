import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import hcsService from 'src/services/hcs.service';
import {isEmpty} from 'lodash';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import DatePickerModal from '../../DatePickerModal';
import Calendar from '../../Calendar';
import {converters} from './constant';

const {HeadlessChart} = Charts;

interface IOverviewGuildPositivePcrPercentage {}

const OverviewGuildPositivePcrPercentage: React.FC<IOverviewGuildPositivePcrPercentage> = () => {
  const [dataset, setDataset] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getColumnChartPositivePcrPercentage = async (from: any, to: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await hcsService.tableOverviewTestResults(
        'edu',
        'grade',
        {
          lang: 'fa',
          from,
          to,
        },
        {cancelToken: cancelToken.token}
      );
      const categoryValue: any[] = [];

      const positiveMembersCountToMembersCountPercentage: any[] = [];
      data.forEach((item: any) => {
        categoryValue.push(item.categoryValue);
        positiveMembersCountToMembersCountPercentage.push(
          item.positiveMembersCountToMembersCountPercentage
        );
      });
      const sortPositiveMembersCountToMembersCountPercentage =
        positiveMembersCountToMembersCountPercentage.sort((a, b) => (a > b ? 1 : -1));

      // setCategories([...province]);
      const newData = [
        {
          showInLegend: false,
          name: 'درصد ابتلا',
          data: [...sortPositiveMembersCountToMembersCountPercentage],
        },
      ];
      // setDataset([...newData]);
      setDataset({categories: [...categoryValue], series: [...newData]});
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
      getColumnChartPositivePcrPercentage(queryParams.from, queryParams.to);
    }, 500);
    // normalizeData(mockRegisterPercentage);
    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset({});
    };
  }, [queryParams]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const optionChart = {
    chart: {
      type: 'column',
      numberFormatter() {
        // eslint-disable-next-line prefer-rest-params
        const ret = Highcharts.numberFormat.apply(0, arguments as any);
        return converters.fa(ret);
      },
      className: 'transport-line-chart',
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    colors: ['#FE2D2F'],
    plotOptions: {
      column: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: {
                // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }
                // stops: [
                //   [0, "#FFCC00"], // start
                //   [1, "#FF9400"] // end
                // ]
              },
              lineColor: '#fff',
              lineWidth: 3,
            },
          },
        },
        lineWidth: 2,
        threshold: null,
        borderRadius: 2,
        // pointWidth: pointWidth || 0,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
      },
    },
    yAxis: {
      gridLineDashStyle: 'dash',
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
      opposite: true,
      title: {
        enabled: false,
      },
      labels: {
        format: '٪{text}',
      },
    },
    xAxis: {
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: '٪',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
        fontSize: 10,
      },
      borderWidth: 0,
    },
    series: [
      {
        lineWidth: 4,
        showInLegend: false,
        dataLabels: {
          // enabled: true,
        },
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد ابتلای آموزش و پرورش در هر مقطع تحصیلی
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            {/* <div className="flex items-center">
              <SearchableSingleSelect
                objectKey="categoryValue"
                placeholder="کل آموزش و پرورش"
                category="grade"
                tag="edu"
                setQueryParams={setQueryParams}
                queryParams={queryParams}
              />
            </div> */}
            <div className="flex items-center">
              {' '}
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
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isEmpty(dataset) && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}
        {isEmpty(dataset) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewGuildPositivePcrPercentage;
