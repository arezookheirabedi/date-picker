import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface IProps {
  deadCount: number;
  infectedCount: number;
  saveCount: number;
}

const getOptions = (data: IProps) => ({
  chart: {
    type: 'pie',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    height: 50,
    width: 50,
    spacing: [0, 0, 0, 0],
  },

  title: {
    text: '',
  },

  tooltip: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      innerSize: 10,
    },
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [
        {
          name: 'Chrome',
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#05D8A4'], // start
              [1, '#039572'], // end
            ],
          },
          y: data.saveCount,
        },
        {
          name: 'Internet Explorer',
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#6E6E6E'], // start
              [1, '#393939'], // end
            ],
          },
          y: data.deadCount,
        },
        {
          name: 'Firefox',
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#FE2D2F'], // start
              [1, '#CC0002'], // end
            ],
          },
          y: data.infectedCount,
        },
      ],
    },
  ],
});

const CategoryDonut: React.FC<{
  data: IProps;
}> = ({data}) => {
  return (
    <>
      <div className="tooltip relative">
        <div style={{width: '50px', height: '50px'}}>
          <HighchartsReact highcharts={Highcharts} options={getOptions(data)} />
        </div>
        <ul className="tooltip__tooltippiechart">
          <li>
            <span className="recovered" />
            تعداد بهبودیافتگان
          </li>
          <li>
            <span className="victims" />
            تعداد فوت‌شدگان
          </li>
          <li>
            <span className="patients" />
            تعداد مبتلایان
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryDonut;
