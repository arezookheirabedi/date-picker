import React from 'react';

import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import map from '@highcharts/map-collection/countries/ir/ir-all.geo.json';
import mapData from './mapData.json';

HighchartsMap(Highcharts);

HighchartsMap(Highcharts);

const options = {
  chart: {
    map,
    height: "60%",
    className: 'guild-map-chart'
  },

  title: {
    text: '',
  },

  credits: {
    enabled: false,
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
  colorAxis: {
    min: 0,
    minColor: '#FFC700',
    maxColor: '#CF0D0D',
  },

  mapNavigation: {
    enabled: true,
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
        enabled: false,
        format: '{point.properties.name}',
      },
    },
  ],
};

const Map: React.FC<{}> = () => {
  return (
    // eslint-disable-next-line
    <div>
      <HighchartsReact highcharts={Highcharts} constructorType="mapChart" options={options} />
    </div>
  );
};

export default Map;
