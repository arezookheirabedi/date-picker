import React, {useState} from 'react';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import {ECOLOR} from 'src/constants/color.enum';
import Information from 'src/assets/images/icons/information.svg';
import useGetPilgrimDurationTime from 'src/hooks/apis/useGetPilgrimDurationTime';
import Charts from '../../Charts';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const OverviewOfTripDurationProvince: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const [query, setQuery] = useState<any>({
    retry: false,
  });

  const {data: dataset, loading, error: errorMessage} = useGetPilgrimDurationTime(query);

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
    colors: [ECOLOR.COLOR6],
    plotOptions: {
      series: {
        borderRadius: 14,
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
      labels: {
        format: '٪{text}',
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
      // valueDecimals: 0,
      valueSuffix: '٪',
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
        نگاه کلی به مدت زمان سفر زائران استان &nbsp;{cityTitle}&nbsp; بر اساس اطلاعات خوداظهاری
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-start mb-10 mt-5 px-8">
          <div className="w-full">
            <div className="flex flex-row  items-center justify-start  text-xs">
              <img src={Information} className="inline " width="18" height="18" alt="" />
              <span className="px-2">
                {/* مقایسه درصد زائران ثبت نامی به تفکیک استان مبدا انتخاب شده در هنگام ثبت نام */}
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

export default OverviewOfTripDurationProvince;
