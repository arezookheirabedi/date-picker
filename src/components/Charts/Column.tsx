import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


const Column: React.FC<any> = () => {

  const options = {
    chart: {
      type: 'column',
      className: 'guild-column-chart'
      // styledMode: true
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    colors: ['#FE2D2F'],
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
        borderRadius: 14,
        pointWidth: 28,
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
      categories: [
        'دیگر رسته‌ها',
        'باشگاه های ورزشی',
        'سینما‌ها',
        'آرایشگاه‌ها',
        'رستوران‌ها',
        'پاساژها',
        'سوپر مارکت',
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
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },
    series: [
      {
        name: 'save',
        data: [
          {
            y: 10,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, 0.4)'], // start
                [1, 'rgba(204, 0, 2, 0.4)'], // end
              ],
              opacity: 60,
            },
          },
          {
            y: 15,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, .6)'], // start
                [1, 'rgba(204, 0, 2, .6)'], // end
              ],
            },
          },
          {
            y: 20,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, .6)'], // start
                [1, 'rgba(204, 0, 2, .6)'], // end
              ],
            },
          },
          {
            y: 25,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, .8)'], // start
                [1, 'rgba(204, 0, 2, .8)'], // end
              ],
            },
          },
          {
            y: 40,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, .8)'], // start
                [1, 'rgba(204, 0, 2, .8)'], // end
              ],
            },
          },
          {
            y: 50,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, 1)'], // start
                [1, 'rgba(204, 0, 2, 1)'], // end
              ],
            },
          },
          {
            y: 60,
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, 'rgba(254, 45, 47, 1)'], // start
                [1, 'rgba(204, 0, 2, 1)'], // end
              ],
            },
          },
          // ,
          // {
          //   y: 70,
          //   color: {
          //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
          //     stops: [
          //       [0, "rgba(254, 45, 47, 1)"], // start
          //       [1, "rgba(204, 0, 2, 1)"] // end
          //     ]
          //   }
          // },
          // {
          //   y: 75,
          //   color: {
          //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
          //     stops: [
          //       [0, "rgba(254, 45, 47, 1)"], // start
          //       [1, "rgba(204, 0, 2, 1)"] // end
          //     ]
          //   }
          // }
        ],
      },
    ],
  };
  return <>
    <HighchartsReact highcharts={Highcharts} options={options}/></>
}

export default Column;