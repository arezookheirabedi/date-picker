import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import React from "react";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

const options = {
  chart: {
    type: "solidgauge",
    // height: "200px",
    // width: '1%',
    spacing: [0, 0, 0, 0],

    events: {
      //     render: renderIcons
    }
  },

  title: {
    text: "درصد رشد مبتلایان امروز",
    style: {
      fontSize: "24px"
    }
  },
  credits: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        // Track for Move
        outerRadius: "100%",
        innerRadius: "95%",
        backgroundColor: Highcharts.color("#eee").setOpacity(1).get(),
        borderWidth: 0
      },
      {
        // Track for Move
        outerRadius: "92%",
        innerRadius: "87%",
        backgroundColor: Highcharts.color("#eee").setOpacity(1).get(),
        borderWidth: 0
      },
      {
        // Track for Exercise
        outerRadius: "84%",
        innerRadius: "79%",
        backgroundColor: Highcharts.color("#eee").setOpacity(1).get(),
        borderWidth: 0
      },
      {
        // Track for Stand
        outerRadius: "76%",
        innerRadius: "71%",
        backgroundColor: Highcharts.color("#eee").setOpacity(1).get(),
        borderWidth: 0
      },
      {
        // Track for Stand
        outerRadius: "68%",
        innerRadius: "63%",
        backgroundColor: Highcharts.color("#eee").setOpacity(1).get(),
        borderWidth: 0
      }
    ]
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: false
      },
      linecap: "round",
      stickyTracking: false,
      rounded: true
    }
  },
  series: [
    {
      name: "Move",
      data: [
        {
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "#05D8A4"], // start
              [1, "#039572"] // end
            ]
          },
          radius: "100%",
          innerRadius: "95%",
          y: 80
        }
      ]
    },
    {
      name: "Exercise",
      data: [
        {
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "#B2B2B2"], // start
              [1, "#AEAEAE"] // end
            ]
          },
          radius: "92%",
          innerRadius: "87%",
          y: 65
        }
      ]
    },
    {
      name: "Stand",
      data: [
        {
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "#FE2D2F"], // start
              [1, "#CC0002"] // end
            ]
          },
          radius: "84%",
          innerRadius: "79%",
          y: 50
        }
      ]
    },
    {
      name: "dfgdgsdf",
      data: [
        {
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "#FE2D2F"], // start
              [1, "#CC0002"] // end
            ]
          },
          radius: "76%",
          innerRadius: "71%",
          y: 60
        }
      ]
    },
    {
      name: "dfgdgsdf",
      data: [
        {
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, "#FE2D2F"], // start
              [1, "#CC0002"] // end
            ]
          },
          radius: "68%",
          innerRadius: "63%",
          y: 80
        }
      ]
    }
  ]
};

const Gauge: React.FC<any> = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}
export default Gauge;

