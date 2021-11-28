import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
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
          y: 61.41,
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
          y: 25.84,
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
          y: 24.85,
        },
      ],
    },
  ],
};

const CategoryDonut: React.FC<{}> = () => {
  return (
    <>
      <div className="tooltip relative">
        <div style={{width: '50px', height: '50px'}} >
          <HighchartsReact highcharts={Highcharts} options={options} />
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
