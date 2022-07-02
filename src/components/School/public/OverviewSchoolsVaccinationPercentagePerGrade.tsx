import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import hcsService from 'src/services/hcs.service';
import DatePickerModal from 'src/components/SingleDatePickerModal';
import Calendar from 'src/components/Calendar/SingleCalendar';
// import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import Highcharts from 'highcharts';
import {chartNumberconverters as converters} from 'src/helpers/utils';
import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

interface OverviewPerProvinceProps {}

const OverviewSchoolsVaccinationPercentagePerGrade: React.FC<OverviewPerProvinceProps> = () => {
  const [dataset, setDataset] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState({to: null, clear: false}) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [queryParams, setQueryParams] = useState({
    to: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // eslint-disable-next-line
      const {data} = await hcsService.peopleVaccinationOverview(params, {
        cancelToken: cancelToken.token,
      });
      const grade: any[] = [];

      // eslint-disable-next-line
      let nonVaccinesPercentage: any[] = [];
      // eslint-disable-next-line
      let vaccinesPercentage: any[] = [];

      const sortData = data.sort((a: any, b: any) =>
        a.nonVaccinesCountToMembersCountPercentage > b.nonVaccinesCountToMembersCountPercentage
          ? 1
          : -1
      );

      sortData.forEach((item: any) => {
        vaccinesPercentage.push(Number(item.vaccinesCountToMembersCountPercentage));
        nonVaccinesPercentage.push(Number(item.nonVaccinesCountToMembersCountPercentage));

        grade.push(item.categoryValue);
      });

      const newData = [
        {
          name: 'واکسن نزده',
          data: [...nonVaccinesPercentage],
          color: '#e21416',
          dataLabels: {
            // enabled: true,
            // rotation: 270,
          },
        },
        {
          dataLabels: {
            // enabled: true,
            // rotation: 270,
            // format: "{y}%"
          },
          name: 'واکسن زده',
          data: [...vaccinesPercentage],
          color: '#04b086',
        },
      ];
      setDataset({categories: [...grade], series: [...newData]});
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
      getLinearOverview({
        ...queryParams,
        tag: 'edu',
        category: 'grade',
        //  province: 'تهران'
      });
    }, 500);
    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset({});
    };
  }, [queryParams]);

  useEffect(() => {
    if (selectedDay.to) {
      const finalToDate = `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`;
      setQueryParams({
        ...queryParams,
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDay.clear) {
      setQueryParams({
        ...queryParams,
        to: null,
      });
    }
  }, [selectedDay]);

  const optionChart = {
    chart: {
      renderTo: 'container',
      type: 'column',
      numberFormatter() {
        // eslint-disable-next-line prefer-rest-params
        const ret = Highcharts.numberFormat.apply(0, arguments as any);
        return converters.fa(ret);
      },

      events: {
        redraw: () => {
          // eslint-disable-next-line
          // console.log('redraw');
        },
      },
      // zoomType: 'x'
      // styledMode: true
    },
    title: {
      text: '',
    },
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
    },
    credits: {
      enabled: false,
    },
    // colors: ['#FFC700', '#883BA4', '#175A76', '#00AAB1'],
    plotOptions: {
      series: {
        // stacking: 'percent',
        stacking: 'percent',
        // borderRadius: 5,
        pointWidth: 15,
      },
      column: {
        threshold: null,
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    yAxis: {
      tickInterval: 25,
      tickAmount: 5,
      softMin: 0,
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
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      type: 'category',
      labels: {
        rotation: 45,
      },
      // lineDashStyle: 'dash',
      // lineColor: '#000000',
      // lineWidth: 1
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
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },

    series: [],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد واکسیناسیون آموزش و پرورش در هر مقطع تحصیلی
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDay={setSelectedDay}
                  selectedDay={selectedDay}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <Calendar
                action={focusFromDate}
                to={selectedDay.to}
                setSelectedDay={setSelectedDay}
              />
            </div>
          </div>
          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#e21416'}} />
                  <span>واکسن نزده</span>
                </div>

                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#04b086'}} />
                  <span>واکسن زده </span>
                </div>
              </div>
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

export default OverviewSchoolsVaccinationPercentagePerGrade;
