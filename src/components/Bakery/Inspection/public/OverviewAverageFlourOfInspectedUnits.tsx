// @ts-ignore
import {isEmpty} from 'lodash';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import Highcharts from 'highcharts';
import {useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Spinner from '../../../Spinner';
import HeadlessChart from '../../HeadlessChart';

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
  colors: ['#07816C'],
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
      borderRadius: 4,
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
  xAxis: {
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    // valueSuffix: 'کیسه',

    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
};

const OverviewAverageFlourOfInspectedUnits: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState({retry: false});
  

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        میانگین آرد مشاهده شده به تفکیک استان در واحدهای بازرسی شده کل کشور
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8">
            <div className="flex align-center justify-between">{/* dfd */}</div>
          </div>
        </div>
        
          <HeadlessChart data={[]} optionsProp={optionChart} />
     
      </div>
    </fieldset>
  );
};

export default OverviewAverageFlourOfInspectedUnits;
