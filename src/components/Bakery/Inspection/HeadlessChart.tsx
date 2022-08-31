import React, {useEffect, useRef, useState} from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const HeadlessChart: React.FC<{data: any; optionsProp?: any}> = ({data, optionsProp}) => {
  const chartRef = useRef<any>(null);
  const [options, setOptions] = useState(optionsProp) as any;

  useEffect(() => {
    setOptions({
      xAxis: {
        categories: data.categories,
      },
      series: data.series,
    });
  }, [data]);

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{className: 'flex w-full'}}
      />
    </>
  );
};

export default HeadlessChart;
