import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Highcharts from "highcharts/highstock";
import axios from 'axios';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewStatusOfCookingVariety(
  // query: any, 
  hasProvince: boolean = false
  ) {

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
        },
        legend: {
          enabled: false,
        },
      }

      const initialList = {
        categories: [ 'نان سنتی', 'نان خراسانی', 'نان گردان', 'نان تافتون', 'نان بربری', 'نان سنگک' , 'نان لواش'],
        series: [
          {
            name: 'وضعیت تنوع پخت',
            data: [
              {name: 'نان سنتی', y: 75, color: '#7DA6B8'},
              {name: 'نان خراسانی', y: 90, color: '#F3BC06'},
              {name: 'نان گردان', y: 62, color: '#209F92'},
              {name: 'نان تافتون', y: 80, color: '#004D65'},
              {name: 'نان بربری', y: 72, color: '#BFDDE7'},
              {name: 'نان سنگک', y: 80, color: '#716DE3'},
              {name: 'نان لواش', y: 59, color: '#FF0060'},
            ],
          },
        ]
      } as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  const location = useLocation();



  return {list, optionChart, error, loading};
}
