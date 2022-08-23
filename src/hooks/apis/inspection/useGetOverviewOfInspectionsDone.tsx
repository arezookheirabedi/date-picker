import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import inspectionService from 'src/services/inspection.service';
import {sideCities} from '../../../helpers/utils';

export default function useGetOverviewOfInspectionsDone(
  // query: any, 
  hasProvince: boolean = false
  ) {

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

  const initialData = {
    categories: [
      "فروردین ۱۴۰۰",
      "اردیبهشت ۱۴۰۰",
      "خرداد ۱۴۰۰",
      "تیر ۱۴۰۰",
      "مرداد ۱۴۰۰",
      "شهریور ۱۴۰۰",
      "مهر ۱۴۰۰",
      "آبان ۱۴۰۰",
      "آذر ۱۴۰۰",
      "دی ۱۴۰۰",
      "بهمن ۱۴۰۰",
      "اسفند ۱۴۰۰"
    ],
    series: [
      {
        name: 'بازرسی‌های انجام شده',
        data: [80, 40, 20, 34, 75, 35, 41, 20, 30, 70, 67, 10],
        color: {
          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
          stops: [
            [0, '#041E39'],
            [1, '#57687A'],
          ],
        },
      }
    ],
  } as any;
  
    const [error, setError] = useState(null) as any;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);

    const {CancelToken} = axios;
    const source = CancelToken.source();
    
    const getListOfInspections = async (province: any) => {
        setLoading(true);
        setError(null);
        try {
          const response = await inspectionService.inspectionDone(
            {tag: 'transport', province},
            {cancelToken: source.token}
          );
          const date: any[] = [];
          const inspectionDone: any[] = [];
          response.data.forEach((items: any) => {
              items.data.forEach((item: any) => {
                if(items.province === province){
                  date.push(item.date);
                  inspectionDone.push(item.inspectionDone);
                }
            })
          });
          const newData = [
            {
              name: 'بازرسی‌های انجام شده',
              data: [...inspectionDone],
              color: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                  [0, '#041E39'],
                  [1, '#57687A'],
                ],
              },
            }
          ];
          setData({categories: [...date], series: [...newData]});
        } catch (err: any) {
            setError(err.message);
            console.log(err);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {
    // getListOfInspections({query, province : 'تهران'});
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
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
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

    return {loading, error, data, optionChart};
}