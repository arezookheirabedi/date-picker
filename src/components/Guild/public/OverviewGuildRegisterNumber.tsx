import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
// import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import guildService from 'src/services/guild.service';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import DatePickerModal from '../../DatePickerModal';
import Calendar from '../../Calendar';
import {converters} from './constant';

const {HeadlessChart} = Charts;

const OverviewGuildRegisterNumber: React.FC<{}> = () => {
  const [dataset, setDataset] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    tags: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  // const normalizeData = (data: Array<any>) => {
  //   const province: any[] = [];
  //   const registered: any[] = [];
  //   const unregistered: any[] = [];
  //   data.forEach((item: any) => {
  //     province.push(item.province);
  //     unregistered.push(item.unregister);
  //     registered.push(item.register);
  //   });
  //   // setCategories([...province]);
  //   const newData = [
  //     {
  //       name: 'ثبت نام نشده',
  //       dataLabels: {
  //         // enabled: true,
  //       },
  //       showInLegend: false,
  //       data: [...unregistered],
  //     },
  //     {
  //       name: 'ثبت نام شده',
  //       dataLabels: {
  //         // enabled: true,
  //       },
  //       showInLegend: false,
  //       data: [...registered],
  //       linearGradient: {
  //         x1: 0,
  //         x2: 0,
  //         y1: 0,
  //         y2: 1,
  //       },
  //       stops: [
  //         [0, '#5F5B97'],
  //         [1, '#DDDCE9'],
  //       ],
  //     },
  //   ];
  //   // setDataset([...newData]);
  //   setDataset({categories: [...province], series: [...newData]});
  // };

  const getColumnChartRegisterNumber = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.numberOfRegisteredGuilds(params, {
        cancelToken: cancelToken.token,
      });
      const province: any[] = [];
      const registered: any[] = [];
      const allCount: any[] = [];
      data.forEach((item: any) => {
        province.push(item.province);
        allCount.push(item.allCount);
        registered.push(item.registeredCount);
      });
      // setCategories([...province]);
      const newData = [
        {
          name: 'کل',
          dataLabels: {
            // enabled: true,
          },
          showInLegend: false,
          data: [...allCount],
        },
        {
          name: 'ثبت نام شده',
          dataLabels: {
            // enabled: true,
          },
          showInLegend: false,
          data: [...registered],
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, '#5F5B97'],
            [1, '#DDDCE9'],
          ],
        },
      ];
      // setDataset([...newData]);
      setDataset({categories: [...province], series: [...newData]});
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
      getColumnChartRegisterNumber(queryParams);
    }, 500);
    // normalizeData(mockRegisterPercentage);
    return () => {
      clearTimeout(idSetTimeOut);

      cancelRequest();
      setDataset([]);
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
    colors: ['#209F92', '#F3BC06'],
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
    },
    // scrollbar: {
    //   enabled: true,
    //   barBackgroundColor: '#656565',
    //   barBorderColor: '#eee',
    //   barBorderRadius: 4,
    //   barBorderWidth: 0,
    //   height: 6,
    //   buttonArrowColor: '#eee',
    //   rifleColor: '#656565',
    //   buttonBackgroundColor: 'transparent',
    //   buttonBorderWidth: 0,
    //   buttonBorderRadius: 0,
    //   trackBackgroundColor: '#eee',
    //   trackBorderWidth: 0,
    //   trackBorderRadius: 4,
    // },
    xAxis: {
      // scrollbar: {
      //   enabled: true,
      //   showFull: false,
      // },
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      borderRadius: 16,
      borderWidth: 0,
      valueDecimals: 0,
      valueSuffix: 'نفر',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
      },

      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },
    series: [
      {
        lineWidth: 4,
      },
    ],
  };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به تعداد اصناف ثبت نامی در هر استان
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
          <div className="flex align-center space-x-5 rtl:space-x-reverse">
            {/* <div className="flex items-center">
              <SearchableSingleSelect
                placeholder="کل اصناف"
                tag="guild"
                category="categoryDesc"
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

        {!loading &&
          !errorMessage &&
          (dataset.length === 0 ? (
            <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
          ) : (
            <HeadlessChart data={dataset} optionsProp={optionChart} />
          ))}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  );
};

export default OverviewGuildRegisterNumber;
