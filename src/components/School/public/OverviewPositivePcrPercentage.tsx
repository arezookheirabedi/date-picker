import React, {useState} from 'react';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import DatepickerQuery from 'src/components/DatepickerQuery';
import useGetOverviewOfPationColumnChart from 'src/hooks/apis/useGetOverviewOfPationColumnChart';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import RetryButton from 'src/components/RetryButton';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const OverviewGuildPositivePcrPercentage: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
    tag: 'edu',
    category: 'grade',
    retry: false,
  });
  const {dataset, loading, error: errorMessage} = useGetOverviewOfPationColumnChart(query);

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
            <div className="flex items-center">
              {' '}
              <DatepickerQuery query={query} setQuery={setQuery} />
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
        {dataset &&
          dataset.categories &&
          dataset.categories.length === 0 &&
          !loading &&
          !errorMessage && <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>}
      </div>
    </fieldset>
  );
};

export default OverviewGuildPositivePcrPercentage;
