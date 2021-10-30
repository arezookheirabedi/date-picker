import React, {useEffect, useLayoutEffect, useRef} from 'react';

import Highcharts from 'highcharts';
import PatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import pattern1 from 'src/assets/images/patterns/pie-orange.svg';
import pattern4 from 'src/assets/images/patterns/pie-dark-red.svg';
import pattern2 from 'src/assets/images/patterns/pie-red.svg';
import pattern3 from 'src/assets/images/patterns/pie-dark-green.svg';

PatternFill(Highcharts);

const options: (data: any[]) => any = data => {
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
      pointFormat: '<div>{series.name} : {point.y} نفر</div>',
      backgroundColor: {
        linearGradient: [0, 0, 0, 60],
        stops: [
          [0, '#374151'],
          [1, '#6B7280'],
        ],
      },
    },
  };

  if(data && data.length > 4)
  option = {
    ...option,
    series: [
      {
        name: 'تعداد',
        colorByPoint: true,
        data: [
          {
            // index 0 is total employe
            name: data[1].title,
            y: data[1].count,
            color: {
              pattern: {
                //   opacity: 0.75,
                image: pattern3,
                aspectRatio: 3 / 2,
                width: 200,
                height: 200,
                y: 0,
                x: 40,
              },
            },
            states: {
              hover: {
                color: '#19544e',
              },
              select: {
                color: '#19544e',
              },
            },
          },
          {
            name: data[2].title,
            y: data[2].count,
            color: {
              pattern: {
                //   opacity: 0.75,
                image: pattern1,
                // aspectRatio: 3 / 2,
                width: 200,
                height: 200,
                y: 40,
                x: -40,
              },
            },
            states: {
              hover: {
                color: '#F3821F',
              },
              select: {
                color: '#F3821F',
              },
            },
          },
          {
            name: data[3].title,
            y: data[3].count,
            color: {
              pattern: {
                //   opacity: 0.75,
                image: pattern2,
                aspectRatio: 3 / 2,
                width: 200,
                height: 200,
                y: 10,
                x: 10,
              },
            },
            states: {
              hover: {
                color: '#C10000',
              },
              select: {
                color: '#C10000',
              },
            },
          },
          {
            name: data[4].title,
            y: data[4].count,
            color: {
              pattern: {
                //   opacity: 0.75,
                image: pattern4,
                aspectRatio: 3 / 2,
                width: 200,
                height: 200,
                y: 0,
                x: 10,
              },
            },
            states: {
              hover: {
                color: '#44032e',
              },
              select: {
                color: '#44032e',
              },
            },
          },
        ],
      },
    ],
  };

  return option;
};
interface IProps {
  data: any[];
}



const Pie: React.FC<IProps> = ({data}) => {
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
      options={options(data)}
    />
  );
};

export default Pie;
