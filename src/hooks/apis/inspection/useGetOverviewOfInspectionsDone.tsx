import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

const optionChart = {
  chart: {
    type: 'column',
    className: 'transport-line-chart',
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            lineColor: '#fff',
            lineWidth: 3,
          },
        },
      },
      lineWidth: 2,
      threshold: null,
      borderRadius: 4,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
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
    labels: {
      format: '٪{text}',
    },
    title: {
      enabled: false,
    },
  },
  xAxis: {
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
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
  },
  legend: {
    enabled: false,
  },
};

export default function useGetOverviewOfInspectionsDone(
  query: any,
  hasProvince: boolean = false
) {

  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {loading, error, data, optionChart};
}