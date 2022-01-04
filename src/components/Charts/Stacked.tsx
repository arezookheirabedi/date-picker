import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

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
        'آذربایجان شرقی',
        'آذربایجان غربی',
        'اردبیل',
        'اصفهان',
        'البرز',
        'ایلام',
        'بوشهر',
        'تهران',
        'چهارمحال و بختیاری',
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
        'یزد'        
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
        data: [17.80, 18.40, 17.50, 16.90, 17.90, 20.60, 15.10, 17.30, 18.70, 18.50, 19.50, 21.10, 20.60, 17.10, 16.70, 23.70, 13.50, 14.50, 21.00, 19.20, 18.40, 18.00, 17.60, 17.90, 16.50, 20.50, 18.20, 16.90, 16.80, 20.10, 20.50],
      },
      {
        name: 'دوز دوم',
        data: [71.70,71.50,72.30,69.40,68.70,67.30,72.60,70.40,66.10,73.10,69.80,67.30,64.90,72.70,72.40,65.30,76.70,76.20,59.80,66.60,70.00,68.50,69.80,74.00,73.60,65.70,70.50,73.50,75.30,68.70,67.80,],
      },
      {
        name: 'دوز سوم',
        data: [1.90,2.70,1.30,2.10,1.40,1.80,2.10,1.90,2.40,0.80,0.90,1.50,2.10,1.10,2.30,0.70,2.10,1.20,1.00,1.60,1.60,2.60,0.60,0.10,2.30,0.80,2.30,1.60,2.00,2.20,2.50,],
      },
        // {
        //   name: 'بیش از ۳ دوز',
        //   data: [3, 4, 4, 2, 5, 6, 1],
        // },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        style={{width: "100%"}}
      />
    </>
  );
};

export default Column;
