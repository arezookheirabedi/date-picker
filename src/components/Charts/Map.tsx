import React from 'react';

import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
// import map from '@highcharts/map-collection/countries/ir/ir-all.geo.json';
import map from './ir-all.geo.json';
import mapData from './mapData.json';

HighchartsMap(Highcharts);

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
         click(e : any) {
           console.log(e)
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
      color : '#707070',
      transform : 'translate(-20px,20px)',
      direction : 'rtl',
      textAlign : 'right',
    },
    align: "center",
    verticalAlign: "bottom",
    squareSymbol: false,
    valueDecimals: 0,
    symbolRadius: 4,
    symbolHeight: 7,
    symbolWidth: 85,
    itemDistance : -40
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
    enableButtons : false,
    enabled: true,
    enableMouseWheelZoom: false,
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
          fontWeight : "400",
          color : '#ffffff',
          fontFamily : 'inherit',
          backgroundColor : "transparent"
        }
      },

    },
  ],
};

const Map: React.FC<{}> = () => {
  return (
    // eslint-disable-next-line
    <>
      <HighchartsReact highcharts={Highcharts} constructorType="mapChart" options={options} />
    </>
  );
};

export default Map;
