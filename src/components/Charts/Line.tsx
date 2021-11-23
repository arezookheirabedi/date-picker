import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Line: React.FC<any> = () => {

  const options = {
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    categories: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12"
    ],
    colors: ["#047E61", "#000000", "#AB0A0A"],
    plotOptions: {
      line: {
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
              lineColor: "#fff",
              lineWidth: 3
            }
          }
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    yAxis: {
      gridLineDashStyle: "dash",
      lineDashStyle: "dash",
      lineColor: "#000000",
      lineWidth: 1,
      opposite: true,
      title: {
        enabled: false
      }
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
      lineDashStyle: "dash",
      lineColor: "#000000",
      lineWidth: 1
    },
    tooltip: {
      shared: true,
      useHTML: true,
      borderRadius: 16,
      borderWidth: 0
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },
    series: [
      {
        name: "مبتلایان ",
        data: [50, 550, 330, 100, 400, 210, 270, 400, 300, 350, 200, 150],
        lineWidth : 4
      }
    ]
  };
  return <>
    <HighchartsReact highcharts={Highcharts} options={options}/>
  </>
}

export default Line;