import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfActiveTime() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(null);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const getColumnChartTestResult = async (params: any) => {
  const getColumnChartTestResult = async () => {
    try {
        setLoading(true);
        setError(null);
        // const response = await bakeryService.bakeryActiveTime(params, {
        //   cancelToken: cancelToken.token,
        // });
        const {data} = await bakeryService.bakeryReport(
          { reportName: "averageWorkTime" },
          { cancelToken: source.token }
        );
        const province: any[] = [];
        const averageTime: any[] = [];
        const similarDayAverage: any[] = [];
        // const hour: any[] = [];
  
        data.forEach((item: any) => {
          province.push(item.province);
          averageTime.push(Number(item.averageTime));
          similarDayAverage.push(Number(item.similarDayAverage));
          // hour.push(item.hour);
        });
        // setCategories([...province]);
        const newData = [
          {
            name: 'میانگین ساعت',
            dataLabels: {
              // enabled: true,
            },
            showInLegend: true,
            data: [...averageTime],
          },
          {
            name: 'میانگین ساعات فعالیت روزهای مشابه در سه ماه گذشته',
            dataLabels: {
              // enabled: true,
            },
            showInLegend: true,
            data: [...similarDayAverage],
          },
          // {
          //   name: 'متوسط فعالیت',
          //   color: {
          //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
          //     stops: [
          //       [0, '#7DA6B8'], // start
          //       [1, '#175A76'], // end
          //     ],
          //   },
          //   dataLabels: {
          //     // enabled: true,
          //   },
          //   showInLegend: false,
          //   data: [...hour],
          //   linearGradient: {
          //     x1: 0,
          //     x2: 0,
          //     y1: 0,
          //     y2: 1,
          //   },
          //   stops: [
          //     [0, '#5F5B97'],
          //     [1, '#DDDCE9'],
          //   ],
          // },
        ];
        // setDataset([...newData]);
        setList({categories: [...province], series: [...newData]});
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
        // getColumnChartTestResult(query);
        getColumnChartTestResult();
      }, 500);
      
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
      clearTimeout(idSetTimeOut);
    };

  }, []);
// }, [query]);
  
  return {loading, list, error};
}