import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import axios from 'axios';
import Charts from '../Charts';
import Spinner from '../Spinner';


const {HeadlessChart} = Charts;

// const mock: any = [
//   {date: 'استعلام مسافران', positiveMembersCount: 80000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 80000},
//   {date: 'امور استخدامی', positiveMembersCount: 30000},
//   {date: 'استعلام مسافران', positiveMembersCount: 50000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 200000},
//   {date: 'امور استخدامی', positiveMembersCount: 200100},
//   {date: 'استعلام مسافران', positiveMembersCount: 80000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 20000},
//   {date: 'امور استخدامی', positiveMembersCount: 30000},
//   {date: 'استعلام مسافران', positiveMembersCount: 200000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 80000},
//   {date: 'امور استخدامی', positiveMembersCount: 200000},
//   {date: 'استعلام مسافران', positiveMembersCount: 20000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 30000},
//   {date: 'امور استخدامی', positiveMembersCount: 50000},
//   {date: 'استعلام مسافران', positiveMembersCount: 90000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 50000},
//   {date: 'امور استخدامی', positiveMembersCount: 20000},
//   {date: 'استعلام مسافران', positiveMembersCount: 30000},
//   {date: 'استعلام گذرنامه', positiveMembersCount: 240000},
//   {date: 'امور استخدامی', positiveMembersCount: 110000},
// ];

const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
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
    text: '',
  },
  categories: [],
  colors: ['#ff0000', '#000000', '#AB0A0A'],
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
    categories: [],
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
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
    },

    // headerFormat: `<div style="min-width:220px">{point.x}</div>`
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      data: [],
      showInLegend: false,
    },
  ],
};

const initialData = {
  categories: [],
  series: [
    {
      data: [],
    },
  ],
} as any;

const CallChart: React.FC<any> = () => {
  const [dataset, setDataset] = useState<any[]>(initialData) as any;
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  // console.log('dataset => ', dataset);
  const {CancelToken} = axios;
  const source = CancelToken.source();





  useEffect(() => {
    return () => {
      setDataset(initialData);
      setIsCancel(false);
    };
  }, []);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نمودار فراخوانی</legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-12 shadow">
        {(loading || isCancel) && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && !isCancel && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isCancel && dataset.categories.length > 0 && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}

        {dataset.categories.length === 0 && !loading && !errorMessage && !isCancel && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default CallChart;
