import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface IData {
  color: {
    linearGradient: any;
    stops: Array<Array<any>>;
  };
  name: string;
  title: string;
  y: number;
}

const getOptions = (opt: IData[]) => ({
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
      name: '',
      colorByPoint: true,
      data: opt.map((item: IData, index: number) => ({
        index,
        name: item.name,
        color: item.color || {
          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
          stops: [
            [0, '#05D8A4'], // start
            [1, '#039572'], // end
          ],
        },
        y: item.y,
      })),
    },
  ],
});

const CategoryDonut: React.FC<{
  data: IData[];
}> = ({data}) => {
  return (
    <>
      <div className="tooltip relative">
        <div style={{width: '50px', height: '50px'}}>
          <HighchartsReact highcharts={Highcharts} options={getOptions(data)} />
        </div>
        <ul className="tooltip__tooltippiechart">
          {data.map((item: IData, index: number) => (
            <li key={`${item.name}_${index}`}>
              <span
                style={{
                  background: `transparent linear-gradient(180deg, ${item.color.stops[0][1]} 0%, ${item.color.stops[1][1]} 100%) 0 0 no-repeat`,
                }}
              />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryDonut;
