import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import guildService from 'src/services/guild.service';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import DatePickerModal from '../../DatePickerModal';
import Calendar from '../../Calendar';
import {converters} from './constant';

const {HeadlessChart} = Charts;

interface IOverviewGuildRegisterPercentage {}

const OverviewGuildRegisterPercentage: React.FC<IOverviewGuildRegisterPercentage> = () => {
  const [dataset, setDataset] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getColumnChartRegisterPercentage = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.percentageOfRegisteredGuilds(params, {
        cancelToken: cancelToken.token,
      });
      const sortData = data.sort((a: any, b: any) => (a.percentage > b.percentage ? 1 : -1));
      const province: any[] = [];
      const registered: any[] = [];
      sortData.forEach((item: any) => {
        province.push(item.province ? item.province.trim() : '');
        registered.push(item.percentage);
      });
      const newData = [
        {
          showInLegend: false,
          name: 'ثبت نام شده',
          data: [...registered],
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#7DA6B8'], // start
              [1, '#175A76'], // end
            ],
          },
        },
      ];

      // if (data.length > 0) {
      setDataset({categories: [...province], series: [...newData]});

      // }
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
      getColumnChartRegisterPercentage(queryParams);
    }, 500);
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
    }
    if (selectedDayRange.clear) {
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
      scrollablePlotArea: {
        // minWidth: 700,
        scrollPositionX: 1,
      },
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
    // colors: ['#175A76'],
    plotOptions: {
      column: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                  [0, '#7DA6B8'], // start
                  [1, '#175A76'], // end
                ],
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
      tickInterval: 25,
      tickAmount: 5,
      labels: {
        format: '٪{text}',
      },
      gridLineDashStyle: 'dash',
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
      opposite: true,
      title: {
        enabled: false,
      },
    },
    xAxis: {
      scrollbar: {
        enabled: true,
        barBackgroundColor: '#656565',
        barBorderColor: '#eee',
        barBorderRadius: 4,
        barBorderWidth: 0,
        height: 6,
        buttonArrowColor: '#eee',
        rifleColor: '#656565',
        buttonBackgroundColor: 'transparent',
        buttonBorderWidth: 0,
        buttonBorderRadius: 0,
        trackBackgroundColor: '#eee',
        trackBorderWidth: 0,
        trackBorderRadius: 4,
        showFull: false,
      },
      min: 0,
      max: 30,
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
        dataLabels: {
          // enabled: true,
        },
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد اصناف ثبت نامی در هر استان
      </legend>

      {/* {JSON.stringify(data1, null, 2)} */}
      {/* {JSON.stringify(dataset, null, 2)} */}

      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            <div className="flex items-center">
              <SearchableSingleSelect
                endPoint={guildService.getRegisterList}
                placeholder="کل اصناف"
                objectKey="categoryId"
                setQueryParams={setQueryParams}
                queryParams={queryParams}
              />
            </div>
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

        {!loading &&
          !errorMessage &&
          (isEmpty(dataset) ? (
            <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
          ) : (
            <HeadlessChart data={dataset} optionsProp={optionChart} />
          ))}
      </div>
    </fieldset>
  );
};

export default OverviewGuildRegisterPercentage;
