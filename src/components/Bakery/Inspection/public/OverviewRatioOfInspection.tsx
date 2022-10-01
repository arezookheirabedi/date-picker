/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {isEmpty} from 'lodash';
//
import {chartNumberConverters as converters} from 'src/helpers/utils';
import Highcharts from 'highcharts';
import useGetPilgrimGenderByProvinceOfStackChart from 'src/hooks/apis/useGetPilgrimGenderByProvinceOfStackChart';
import RetryButton from 'src/components/RetryButton';
import Spinner from '../../../Spinner';
import HeadlessChart from '../HeadlessChart';
import useGetRatioOfInspection from '../../../../hooks/apis/inspection/useGetRatioOfInspection';

const OverviewRatioOfInspection: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState<any>({
    retry: false,
  });

  const {data: dataset, loading, error: errorMessage} = useGetRatioOfInspection(query);

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
              lineColor: '#fff',
              lineWidth: 3,
            },
          },
        },
        lineWidth: 2,
        threshold: null,
        borderRadius: 2,
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
        نگاه کلی نسبت نیاز به بازرسی به بازرسی‌های انجام شده به تفکیک استان
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">{/* asd */}</div>
          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#07816C'}} />
                  <span>بازرسی‌های انجام شده</span>
                </div>

                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#F3BC06'}} />
                  <span>نیاز به بازرسی</span>
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

export default OverviewRatioOfInspection;
