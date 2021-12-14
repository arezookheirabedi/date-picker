import React from "react";
import {useHistory} from "react-router-dom";

import Charts from "../Charts";
import map from "../Charts/ir-all.geo.json";
import mapData from "../Charts/mapData.json";


const {Map} = Charts;

interface OverviewDriversMapProps {
  sideCityStatus?: any;
  cityTitle: string;
  setQueryParams: any;
}


const OverviewDriversMap: React.FC<OverviewDriversMapProps> = ({
                                                                 sideCityStatus,
                                                                 cityTitle,
                                                                 setQueryParams
                                                               }) => {
  const history = useHistory();
  const options = {
    chart: {
      map,
      height: "70%",
      className: 'guild-map-chart',
      // backgroundColor: '#F3F5F9',
      margin: [0, 0, 50, 0],
    },

    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click(e: any) {
              history.push({
                search: `?provinceId=${e.point.name}`
              })
              setQueryParams({provinceId: e.point.name})
              // console.log(e.point.name);
              // history.push({
              //   pathname: '/dresses',
              //   search: '?color=blue'
              // })
            }
          }
        }
      }
    },
    subtitle: {
      text: '',
      floating: true,
      align: 'right',
      y: 50,
      style: {
        fontSize: '16px',
      },
    },
    legend: {
      itemStyle: {
        fontSize: "12px",
        fontWeight: '400',
        color: '#707070',
        transform: 'translate(-20px,20px)',
        direction: 'rtl',
        textAlign: 'right',
      },
      align: "center",
      verticalAlign: "bottom",
      squareSymbol: false,
      valueDecimals: 0,
      symbolRadius: 4,
      symbolHeight: 7,
      symbolWidth: 85,
      itemDistance: -40
    },
    colorAxis: {
      dataClasses: [
        {
          from: 500,
          to: 1000,
          color: '#AB0A0A',
          name: 'بیشتر از ۵۰٪',
        },
        {
          from: 400,
          to: 500,
          color: '#CF0D0D',
          name: '%۲۰ الی ۵۰%',
        },
        {
          from: 300,
          to: 400,
          color: '#FF9114',
          name: '%۱۰ الی ۲۰%',
        }, {
          from: 200,
          to: 300,
          color: '#FFC700',
          name: '%۵ الی ۱۰%',
        }, {
          from: 100,
          to: 200,
          color: '#F8D354',
          name: '%۲ الی ۵%',

        }, {
          from: 1,
          to: 100,
          color: '#FBE186',
          name: '%کمتر از ۲'
        }]
    },

    mapNavigation: {
      enableButtons: false,
      enabled: true,
      enableMouseWheelZoom: false,
      enableDoubleClickZoomTo: false,
      enableDoubleClickZoom: false,
      enableTouchZoom: false,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },

    series: [
      {
        data: mapData,
        keys: ['hasc', 'value'],
        joinBy: 'hasc',
        name: 'covid',
        borderColor: '#ffffff',
        borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.properties.fa-name}',
          style: {
            fontWeight: "400",
            color: '#ffffff',
            fontFamily: 'inherit',
            backgroundColor: "transparent"
          }
        },

      },
    ],
  };
  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت حمل و نقل عمومی استان‌
        &nbsp;
        {cityTitle}
      </legend>
      <div className="flex w-full rounded-xl bg-white pb-8 pt-8  shadow">
        <ul className="w-5/6">
          <Map options={options}/>
        </ul>
        <ul className="w-1/6">
          {
            sideCityStatus.map((item: any, index: any) => {
              return (
                <li key={index} className="flex justify-start items-center mb-2.5">
                  <span style={{width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '2px'}}/>
                  <span className="text-xs mr-2">{item.name}</span>

                </li>
              )
            })
          }
        </ul>
      </div>
    </fieldset>
  )
}

export default OverviewDriversMap;