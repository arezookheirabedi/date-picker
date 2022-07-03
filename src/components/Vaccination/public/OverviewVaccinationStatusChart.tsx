import React, {useState} from 'react';
import {converters} from 'src/components/Guild/public/constant';
import Highcharts from 'highcharts';
import useGetOverviewOfVaccinationStackChart from 'src/hooks/apis/useGetOverviewOfVaccinationStackChart';
import SingleDatepickerQuery from 'src/components/SingleDatepickerQuery';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import Charts from '../../Charts';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const OverviewVaccinationStatusChart: React.FC<{}> = () => {
  const [query, setQuery] = useState<any>({
    to: null,
  });
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
  const {
    data: dataset,
    loading,
    error: errorMessage,
  } = useGetOverviewOfVaccinationStackChart(query, shouldUpdate);

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
        // stacking: `${notPercent?'normal':'percent'}`,
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
      gridLineDashStyle: 'dash',
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
      opposite: true,
      title: {
        enabled: false,
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
      valueSuffix: ' نفر',
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
      <legend className="mx-auto px-3 text-black">نگاه کلی به وضعیت واکسیناسیون کل کشور</legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
              <SingleDatepickerQuery query={query} setQuery={setQuery} />
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#FF0060'}} />
                  <span>واکسن نزده</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#716DE3'}} />
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#F3BC06'}} />
                  <span>دوز اول</span>
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
        {errorMessage && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
          </div>
        )}
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

export default OverviewVaccinationStatusChart;
