import React, {useEffect, useRef} from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

/*

 categories: [
      'آذربایجان شرقی',
      'آذربایجان غربی',
      'اردبیل',
      'اصفهان',
      'البرز',
      'ایلام',
      'بوشهر',
      'تهران',
      'خراسان جنوبی',
      'خراسان رضوی',
      'خراسان شمالی',
      'خوزستان',
      'زنجان',
      'سمنان',
      'سیستان و بلوچستان',
      'فارس',
      'قزوین',
      'قم',
      'کردستان',
      'کرمان',
      'کرمانشاه',
      'کهگیلویه وبویراحمد',
      'گلستان',
      'گیلان',
      'لرستان',
      'مازندران',
      'مرکزی',
      'هرمزگان',
      'همدان',
      'یزد',
      'چهارمحال و بختیاری',
    ],

 {
      name: 'واکسن نزده',
      color: '#FE2D2F',
      data: [
        17.8, 18.4, 17.5, 16.9, 17.9, 20.6, 15.1, 17.3, 18.7, 18.5, 19.5, 21.1, 20.6, 17.1, 16.7,
        23.7, 13.5, 14.5, 21.0, 19.2, 18.4, 18.0, 17.6, 17.9, 16.5, 20.5, 18.2, 16.9, 16.8, 20.1,
        20.5,
      ],
    },
    {
      name: 'دوز اول',
      color: '#FFC700',
      data: [
        17.8, 18.4, 17.5, 16.9, 17.9, 20.6, 15.1, 17.3, 18.7, 18.5, 19.5, 21.1, 20.6, 17.1, 16.7,
        23.7, 13.5, 14.5, 21.0, 19.2, 18.4, 18.0, 17.6, 17.9, 16.5, 20.5, 18.2, 16.9, 16.8, 20.1,
        20.5,
      ],
    },
    {
      name: 'دوز دوم',
      color: '#039572',
      data: [
        71.7, 71.5, 72.3, 69.4, 68.7, 67.3, 72.6, 70.4, 66.1, 73.1, 69.8, 67.3, 64.9, 72.7, 72.4,
        65.3, 76.7, 76.2, 59.8, 66.6, 70.0, 68.5, 69.8, 74.0, 73.6, 65.7, 70.5, 73.5, 75.3, 68.7,
        67.8,
      ],
    },
    {
      name: 'دوز سوم',
      color: '#00cfd6',
      data: [
        1.9, 2.7, 1.3, 2.1, 1.4, 1.8, 2.1, 1.9, 2.4, 0.8, 0.9, 1.5, 2.1, 1.1, 2.3, 0.7, 2.1, 1.2,
        1.0, 1.6, 1.6, 2.6, 0.6, 0.1, 2.3, 0.8, 2.3, 1.6, 2.0, 2.2, 2.5,
      ],
    },
    {
      name: 'بیش از ۳ دوز',
      color: '#1db7ff',
      data: [3, 4, 4, 2, 5, 6, 1],
    },

*/

const options = {
  chart: {
    renderTo: 'container',
    type: 'column',
    events: {
      redraw: () => {
        // eslint-disable-next-line
        console.log('redraw');
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

const Column: React.FC<{data: any; categories?: any}> = ({data, categories}) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const seriesLength = chartRef.current.chart.series.length;

      // eslint-disable-next-line
      for (let i = seriesLength - 1; i > -1; i--) {
        // eslint-disable-next-line
        chartRef.current.chart.series[i].remove();
      }

      data.forEach((series: any) => {
        chartRef.current.chart.addSeries({...series}, true);
        chartRef.current.chart.redraw();
      });
    }
  }, [data]);

  useEffect(() => {
    if (chartRef && chartRef.current && categories) {
      chartRef.current.chart.xAxis[0].setCategories(categories, true);
      chartRef.current.chart.xAxis[0].setExtremes(0, (categories.length || 1) - 1);
      chartRef.current.chart.redraw();
    }
  }, [categories]);

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{className: 'flex w-full', style: {maxWidth: 'calc(100vw - 550px)'}}}
      />
    </>
  );
};

export default Column;
