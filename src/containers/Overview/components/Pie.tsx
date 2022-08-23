import React, {useEffect, useLayoutEffect, useRef} from 'react';

import Highcharts from 'highcharts';
import PatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';

PatternFill(Highcharts);

const options: (data: any[], name: string, sign: string) => any = (data, name, sign) => {

  let option: any = {
    chart: {type: 'pie', height: 200},
    title: {
      text: '',
      margin: 0,
      style: {fontSize: '1.5rem', fontWeight: '800'},
    },
    credits: {
      enabled: false,
    },
    colors: ['#75A29E'],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    tooltip: {
      // shared: true,
      useHTML: true,
      style: {
        color: '#fff',
        opacity: 0.9,
        direction: 'rtl',
        textAlign: 'right',
      },
      borderRadius: 16,
      borderWidth: 0,
      shape: 'square',
      pointFormat: `<div style="font-family: IRANSans">${name} : {point.y} ${sign}</div>`,
      backgroundColor: {
        linearGradient: [0, 0, 0, 60],
        stops: [
          [0, '#374151'],
          [1, '#6B7280'],
        ],
      },
    },
  };

  let temp = {}
  temp = data.map((item: any) => {
    return {
      name: item.title,
      y: item.count,
      color: {
        pattern: {
          image: item.image,
          width: 200,
          height: 200,
          aspectRatio: 2 / .75 ,
          y: 0,
          x: 200
        },
      },
      states: {
        hover: {
          color: item.color,
        },
        select: {
          color: item.color,
        },
      },
    }
  })
    option = {
      ...option,
    series: [{
      colorByPoint: true,
      data: temp
    }]
    }
  
  return option;
};

interface IProps {
  data: any[];
  name: string,
  sign: string
}

const Pie: React.FC<IProps> = ({data, name, sign}) => {
  const chartRef = useRef<any>();

  useEffect(() => {
    const {chart} = chartRef.current;
    chart.update({
      series: [],
    });
  }, []);

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <HighchartsReact
      ref={chartRef}
      highcharts={Highcharts}
      allowChartUpdate
      options={options(data, name, sign)}
    />
  );
};

export default Pie;
