import React, {useEffect, useRef, useState} from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});


const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
};


const StackArea: React.FC<{ data: any; categories?: any; notPercent?: boolean; }> = ({data}) => {
  const chartRef = useRef<any>(null);
  const [options, setOptions] = useState({
    chart: {
      renderTo: 'container',
      type: 'areaspline',
      numberFormatter() {
        // eslint-disable-next-line prefer-rest-params
        const ret = Highcharts.numberFormat.apply(0, arguments as any);
        return converters.fa(ret);
      },


      events: {
        redraw: () => {
          // eslint-disable-next-line
          // console.log('redraw');
        },
      },
      // zoomType: 'x'
      // styledMode: true
    },
    title: {
      text: '',
    },
    xAxis: {
      tickmarkPlacement: 'off',
      title: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      opposite: true,
    },
    credits: {
      enabled: false,
    },
    colors: ['#F3BC06', '#209F92', '#004D65', '#BFDDE7', '#716DE3'],
    plotOptions: {
      series: {
        fillOpacity: 1,
        marker: {
          enabled: false
        }
      },
      area: {
        stacking: 'normal',
        // lineColor: '#666666',
        // lineWidth: 1,
        // marker: {
        //   lineWidth: 1,
        //   lineColor: '#666666'
        // }
      }
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: ' نفر',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
        fontSize: 10,
      },
      borderWidth: 0,
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },

  }) as any;

  useEffect(() => {
    setOptions({
      xAxis: {
        categories: data.categories,
      },
      series: data.series
    })
  }, [data])


  // useEffect(() => {
  //   if (chartRef && chartRef.current) {
  //     const seriesLength = chartRef.current.chart.series.length;
  //
  //     // eslint-disable-next-line
  //     for (let i = seriesLength - 1; i > -1; i--) {
  //       // eslint-disable-next-line
  //       chartRef.current.chart.series[i].remove();
  //     }
  //
  //     data.forEach((series: any) => {
  //       chartRef.current.chart.addSeries({...series}, true);
  //       chartRef.current.chart.redraw();
  //     });
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (chartRef && chartRef.current && categories) {
  //     chartRef.current.chart.xAxis[0].setCategories(categories, true);
  //     chartRef.current.chart.xAxis[0].setExtremes(0, (categories.length || 1) - 1);
  //     chartRef.current.chart.redraw();
  //   }
  // }, [categories]);

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{className: 'flex w-full', style: {maxWidth: 'calc(100vw - 550px)'}}}
      />
    </>
  );
};

export default StackArea;
