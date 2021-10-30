import React, { useLayoutEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    height: 500,
  },
  title: {
    text: 'تعداد فراخوانی',
    margin: 50,
    align: 'right',
    style: { fontSize: '1.25rem', fontWeight: '800' },
  },
  credits: {
    enabled: false,
  },
  colors: ['#75A29E'],
  plotOptions: {
    areaspline: {
      fillOpacity: 1,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            fillColor: {
              linearGradient: {
                x1: 0, x2: 0, y1: 0, y2: 1,
              },
              stops: [
                [0, '#194654'], // start
                [1, '#194654'], // end
              ],
            },
            lineColor: '#fff',
            lineWidth: 3,
          },
        },
      },
      lineWidth: 0,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  },
  yAxis: {
    gridLineDashStyle: 'dash',
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
    title: {
      enabled: false,
    },
  },
  xAxis: {
    categories: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    labels: {
      style: { fontWeight: 'bold' },
    },
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
  },
  legend: {
    squareSymbol: false,
    width: '100%',
    itemWidth: 350,
    symbolWidth: 70,
    align: 'left',
    margin: 48,
  },
  tooltip: {
    // shared: true,
    useHTML: true,
    style: {
      color: '#fff',
      opacity: 0.9,
      direction: 'rtl',
      textAlign: 'right',
    },
    borderRadius: 16,
    borderWidth: 0,
    shape: 'square',
    headerFormat: '<div style="min-width:220px; margin-bottom: 1rem">{point.x}</div>',
    pointFormat: '<div>{series.name} : {point.y}</div>',
    backgroundColor: {
      linearGradient: [0, 0, 0, 60],
      stops: [
        [0, '#374151'],
        [1, '#6B7280'],
      ],
    },
  },
  series: [
    {
      type: 'areaspline',
      name: 'اسکن QR کد',
      data: [4, 3, 20, 10, 9, 25, 30, 40, 30, 20, 20, 20],
    },
  ],
};

const Area: React.FC<any> = () => {
  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Area;
