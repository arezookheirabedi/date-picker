import React from 'react';

import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
// import map from '@highcharts/map-collection/countries/ir/ir-all.geo.json';


HighchartsMap(Highcharts);



const Map: React.FC<any> = ({options}) => {
  return (
    // eslint-disable-next-line
    <>
      <HighchartsReact highcharts={Highcharts} constructorType="mapChart" options={options} />
    </>
  );
};

export default Map;
