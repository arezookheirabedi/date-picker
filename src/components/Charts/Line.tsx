import React, {useEffect, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {toPersianDigit} from "../../helpers/utils";

const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
};

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});
const Line: React.FC<any> = ({data, borderRadius, pointWidth, name = 'مبتلایان', showInLegends}) => {
  const [options, setOptions] = useState({
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
    categories: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'],
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
        borderRadius: borderRadius || 0,
        pointWidth: pointWidth || 0,
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
      categories: [
        'اسفند',
        'بهمن',
        'دی',
        'آذر',
        'آبان',
        'مهر',
        'شهریور',
        'مرداد',
        'تیر',
        'خرداد',
        'اردیبهشت',
        'فروردین',
      ],
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
    series: [
      {
        name,
        data: [50, 550, 330, 100, 400, 210, 270, 400, 300, 350, 200, 150],
        lineWidth: 4,
        dataLabels: {
          enabled: true,
        },
        showInLegend: !!showInLegends
      },
    ],
  }) as any;

  useEffect(() => {
    if (data.length) {
      const series = [] as any;
      const categories = [] as any;
      data.map((value: any) => {
        series.push(value.positiveMembersCount);
        return categories.push(toPersianDigit(value.date));
      });
      // console.log('series => ', series);
      // console.log('categories => ', categories);
      setOptions({
        xAxis: {
          categories,
          lineDashStyle: 'dash',
          lineColor: '#000000',
          lineWidth: 1,
        },
        series: [{data: series, showInLegend: !!showInLegends}],
      });
    }
  }, [data]);

  // const updateSeries = () => {
  //   // The chart is updated only with new options.
  //   setOptions({
  //       series: [
  //         { data: [Math.random() * 100, Math.random() * 250, Math.random() * 440 , Math.random() * 620 , Math.random() * 222 , Math.random() * 332, Math.random() * 777, Math.random() * 999, Math.random() * 122, Math.random() * 162, Math.random() * 462, Math.random() * 962  ]}
  //       ]
  //   });
  // }

  // useEffect(()=>{
  //   console.log(options.series[0].data)
  //    const id = setInterval(()=>{
  //     updateSeries()
  //   },2000)
  //
  //   return () => clearInterval(id);
  // })

  // const updateCategories = () => {
  //   // The chart is updated only with new options.
  //   setOptions({
  //     xAxis: {
  //       categories: [
  //         1,
  //         2,
  //         3,
  //         4,
  //         5,
  //         6
  //       ],
  //       lineDashStyle: "dash",
  //       lineColor: "#000000",
  //       lineWidth: 1
  //     }
  //   });
  // }

  return (
    <>
      {/* <button onClick={updateSeries} type="button">update series</button> */}
      {/* <button onClick={updateCategories} type="button">update categories</button> */}
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </>
  );
};

export default Line;
