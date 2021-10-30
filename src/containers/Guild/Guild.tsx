import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import transportIcon from 'src/assets/images/icons/transport-color.svg';
import passengerIcon from 'src/assets/images/icons/passenger-color.svg';
import Statistic from './components/Statistic';
import Gauge from "./components/Gauge";

const options = {
  chart: {
    type: "column",
    direction: 'rtl',
    // styledMode: true
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  colors: ["#FE2D2F"],
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
            lineColor: "#fff",
            lineWidth: 3
          }
        }
      },
      lineWidth: 2,
      threshold: null,
      borderRadius: 14,
      pointWidth: 28
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
  legend: {
    enabled: false
  },
  xAxis: {
    categories: ['دیگر رسته‌ها', 'باشگاه های ورزشی', 'سینما‌ها', 'آرایشگاه‌ها', 'رستوران‌ها', 'پاساژها', 'سوپر مارکت'],
    lineDashStyle: "dash",
    lineColor: "#000000",
    lineWidth: 1,
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
      name: "save",
      data: [
        {
          y: 10,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, 0.4)"], // start
              [1, "rgba(204, 0, 2, 0.4)"] // end
            ],
            opacity: 60
          }
        },
        {
          y: 15,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, .6)"], // start
              [1, "rgba(204, 0, 2, .6)"] // end
            ]
          }
        },
        {
          y: 20,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, .6)"], // start
              [1, "rgba(204, 0, 2, .6)"] // end
            ]
          }
        },
        {
          y: 25,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, .8)"], // start
              [1, "rgba(204, 0, 2, .8)"] // end
            ]
          }
        },
        {
          y: 40,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, .8)"], // start
              [1, "rgba(204, 0, 2, .8)"] // end
            ]
          }
        },
        {
          y: 50,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, 1)"], // start
              [1, "rgba(204, 0, 2, 1)"] // end
            ]
          }
        },
        {
          y: 60,
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "rgba(254, 45, 47, 1)"], // start
              [1, "rgba(204, 0, 2, 1)"] // end
            ]
          }
        }
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
      ]
    }
  ]
};

const Guild: React.FC<any> = () => (
  <div className="p-5 pl-8 lg:pl-12 pr-8 xl:pr-28 space-y-16">

    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران
      </legend>

      <div>
        head
      </div>
      <div className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
        <div className="lg:w-7/12">
          <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
        <div className="lg:w-5/12">
          <Gauge />
        </div>
      </div>
    </fieldset>

    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">
        وضعیت کلی مسافران کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={guildIcon} text="مجموع کارمندان" count={2800}/>
          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800}/>
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450}/>
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200}/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={guildIcon} text="مجموع واکسیناسیون" count={654}/>
          <Statistic icon={guildIcon} text="تعداد استعلام شهروندان" count={654}/>
          <Statistic icon={transportIcon} text="تعداد استعلام های نتیجه مثبت" count={428}/>
          <Statistic icon={passengerIcon} text="تعداد آزمایش های کاربران" count={864}/>
        </div>

        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          map
        </div>
      </div>
    </fieldset>

    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت کرونا کشور</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        chart
      </div>
    </fieldset>

    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون کشور</legend>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        chart
      </div>
    </fieldset>
  </div>
);

export default Guild;
