import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Highcharts from "highcharts/highstock";
import axios from 'axios';
import inspectionService from '../../../services/inspection.service';
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

  const getListOfInspections = async (province: any) => {
    setLoading(true);
    try {
      const {data: result} = await inspectionService.inspectionStatusOfCookingVariety(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      const {y1, y2, y3, y4, y5, y6, y7} = result[0];
      setList(() => {
          return {
            categories: [ 'نان سنتی', 'نان خراسانی', 'نان گردان', 'نان تافتون', 'نان بربری', 'نان سنگک' , 'نان لواش'],
              series: [
                {
                  name: 'گزارش',
                  data: [
                    {name: 'نان سنتی', y: y1, color: '#7DA6B8'},
                    {name: 'نان خراسانی', y: y2, color: '#F3BC06'},
                    {name: 'نان گردان', y: y3, color: '#209F92'},
                    {name: 'نان تافتون', y: y4, color: '#004D65'},
                    {name: 'نان بربری', y: y5, color: '#BFDDE7'},
                    {name: 'نان سنگک', y: y6, color: '#716DE3'},
                    {name: 'نان لواش', y: y7, color: '#FF0060'},
                  ]
              }
            ],
          };
      }); 
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    return () => {
      setList([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity && hasProvince) {
      getListOfInspections(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
  }, [location.search]);

  return {list, optionChart, error, loading};
}
