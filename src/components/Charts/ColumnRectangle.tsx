import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

// import download from "../../assets/images/icons/download.svg";


const ColumnRectangle: React.FC<any> = () => {
  function getColor(a : any) {
    if (a < 50) return "#AB0A0A";
    if (a < 75) return "#FF8000";
    return "#047E61";
  }

  const options = {
    chart: {
      type: "column"
      // styledMode: true
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        lineWidth: 2,
        threshold: null,
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
        name: "save",
        data: [
          {
            y: 10,
            color: getColor(10)
          },
          {
            y: 15,
            color: getColor(15)
          },
          {
            y: 20,
            color: getColor(20)
          },
          {
            y: 25,
            color: getColor(25)
          },
          {
            y: 40,
            color: getColor(40)
          },
          {
            y: 50,
            color: getColor(50)
          },
          {
            y: 60,
            color: getColor(60)
          },
          {
            y: 70,
            color: getColor(70)
          },
          {
            y: 80,
            color: getColor(80)
          }
        ]
      }
    ]
  };

  return <>
    <HighchartsReact highcharts={Highcharts} options={options}/>
    {/* <div className="w-1/5 ml-auto my-4">
      <button type="button" className="button button--primary">
        <img src={download} className="pl-2" alt=""/>
        دانلود اطلاعات
      </button>
    </div> */}
  </>
}

export default ColumnRectangle;