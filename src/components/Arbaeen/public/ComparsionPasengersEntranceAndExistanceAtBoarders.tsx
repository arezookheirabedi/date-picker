import React, {useState} from 'react';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import useGetPilgrimExistanceAndImportanceChart from 'src/hooks/apis/useGetPilgrimExistanceAndImportanceChart';
import Information from 'src/assets/images/icons/information.svg';
import Charts from '../../Charts';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const ComparsionPasengersEntranceAndExistanceAtBoarders: React.FC<{}> = () => {
  const [query, setQuery] = useState<any>({
    retry: false,
  });

  const {
    data: dataset,
    loading,
    error: errorMessage,
  } = useGetPilgrimExistanceAndImportanceChart(query);

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
    colors: ['#c20a0c', '#07816c'],
    plotOptions: {
      series: {
        borderRadius: 10,
      },
      column: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              lineColor: '#fff',
              lineWidth: 3,
            },
          },
        },
        lineWidth: 2,
        threshold: null,
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
    legend: {
      enabled: false,
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

      // min: 0,
      // max: 30,

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
    },
    series: [
      {
        lineWidth: 4,
        // pointWidth: 16,
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        مقایسه روند ورود و خروج مسافران از مرزهای زمینی
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            {/* <div className="align-center flex justify-between">
              <SingleDatepickerQuery query={query} setQuery={setQuery} />
            </div> */}
          </div>

          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#07816c'}} />
                  <span> مسافران وارد شده به کشور</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#c20a0c'}} />
                  <span> مسافران خارج شده از کشور</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start mb-10 mt-5 px-8">
          <div className="w-full">
            <div className="flex flex-row  items-center justify-start  text-xs">
              <img src={Information} className="inline " width="18" height="18" alt="" />
              <span className="px-2">
                مقایسه روند ورود و خروج مسافران به تفکیک مرزهای زمینی از تاریخ ۱۴۰۱/۰۵/۳۱ تا به
                امروز
              </span>
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
            <RetryButton setQuery={setQuery} />
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

export default ComparsionPasengersEntranceAndExistanceAtBoarders;
