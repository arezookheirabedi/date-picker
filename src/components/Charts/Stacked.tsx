import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ','
  },
})

const Column: React.FC<any> = () => {
  const options = {
    chart: {
      type: 'column',
      // styledMode: true
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    colors: ['#FFC700', '#883BA4', '#175A76', '#00AAB1'],
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
      // lineWidth: 1,
      title: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [
        'قم',
        'خراسان شمالی',
        'چهارمحال و بختیاری',
        'هرمزگان',
        'کهگیلویه و بویر احمد',
        'آذربایجان شرقی',
        'خراسان جنوبی',
        'اردبیل',
        'لرستان',
        'همدان',
      ],
      lineDashStyle: 'dash',
      lineColor: '#000000',
      // lineWidth: 1
    },
    tooltip: {
      shared: true,
      useHTML: true,
      // borderRadius: 16,
      borderWidth: 0,
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },

    series: [
      {
        name: 'دوز اول',
        data: [5, 3, 4, 7, 2, 2, 3],
      },
      {
        name: 'دوز دوم',
        data: [2, 2, 3, 2, 1, 2, 3],
      },
      {
        name: 'دوز سوم',
        data: [3, 4, 4, 2, 5, 4, 5],
      },
      {
        name: 'بیش از ۳ دوز',
        data: [3, 4, 4, 2, 5, 6, 1],
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Column;
