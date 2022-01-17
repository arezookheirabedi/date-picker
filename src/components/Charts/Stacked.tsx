import React from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

const Column: React.FC<any> = () => {
  const options = {
    chart: {
      renderTo: 'container',
      type: 'column',
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
        stacking: 'normal',
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
      min: 0,
      max: 8,
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
      // lineDashStyle: 'dash',
      // lineColor: '#000000',
      // lineWidth: 1
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valuePrefix: '%',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
        fontSize: 10,
      },
      borderWidth: 0,
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },

    series: [
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
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{className: 'flex w-full', style: {maxWidth: 'calc(100vw - 550px)'}}}
      />
    </>
  );
};

export default Column;
