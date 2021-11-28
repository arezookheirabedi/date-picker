import React, { useState} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Line: React.FC<any> = () => {

  const [options] = useState({
    chart: {
      type: 'line',
      className: 'transport-line-chart'
    },
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
  }) as any;

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

  return <>
    {/* <button onClick={updateSeries} type="button">update series</button> */}
    {/* <button onClick={updateCategories} type="button">update categories</button> */}
    <HighchartsReact highcharts={Highcharts} options={options}/>
  </>
}

export default Line;