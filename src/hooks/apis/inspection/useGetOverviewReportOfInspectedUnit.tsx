import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Highcharts from "highcharts/highstock";
import axios from 'axios';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewReportOfInspectedUnit(hasProvince: boolean = false) {

  const converters = {
    fa(number: any) {
      return number.toString().replace(/\d/g, (d: any) => {
        return String.fromCharCode(d.charCodeAt(0) + 1728);
      });
    },
  } as any;
  
  const optionChart = {
    chart: {
      renderTo: 'container',
      type: 'column',
      numberFormatter() {
        // eslint-disable-next-line prefer-rest-params
        const ret = Highcharts.numberFormat.apply(0, arguments as any);
        return converters.fa(ret);
      },
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderRadius: 10,
      },
      column: {
        threshold: null,
        grouping: false,
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '<h1 style="font-family: IRANSans">%{y}</h1>',
          style: {
            fontSize: '10px',
            fontFamily: 'IRANSans',
          },
          useHTML: true,
        }
      },
    },
    yAxis: {
      gridLineDashStyle: 'dash',
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
      opposite: true,
      title: {
        enabled: false,
      },
      labels: {
        format: '٪{text}',
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      type: 'category',
      labels: {
        rotation: 45,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: ' درصد',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
        fontSize: 10,
      },
      borderWidth: 0,
    }
  }

  const initialList = {
    categories: ['بازرسی های ادواری', 'بازرسی های مردمی' , 'بازرسی های دستوری'],
      series: [
        {
          name: 'گزارش',
            data: [
              {name: 'بازرسی های ادواری', y: 80, color: '#F3BC06'},
              {name: 'بازرسی های مردمی', y: 50, color: '#209F92'},
              {name: 'بازرسی های دستوری', y: 30, color: '#004D65'},
            ]
        }
    ],
  } as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {list, optionChart, error, loading};
}
