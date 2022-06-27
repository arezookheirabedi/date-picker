import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfSellCostAverage() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(null);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const getColumnChartTestResult = async (params: any) => {
  const getColumnChartTestResult = async () => {
    try {
        const {data} = await bakeryService.bakeryReport(
          { reportName: "salesValue" },
          { cancelToken: source.token }
        );
        // const response = await bakeryService.bakeryActiveTime(params, {
        //   cancelToken: cancelToken.token,
        // });
        const province: any[] = [];
        const todaysAverage: any[] = [];
        const similarDayAverageInMonth: any[] = [];
  
        data.forEach((item: any) => {
          province.push(item.province);
          todaysAverage.push(Number(item.todaysAverage));
          similarDayAverageInMonth.push(Number(item.similarDayAverageInMonth));
        });
        const newData = [
          {
            name: 'میانگین تراکنش',
            dataLabels: {
              // enabled: true,
            },
            showInLegend: true,
            data: [...todaysAverage],
          },
          {
            name: 'میانگین تراکنش روزهای مشابه در سه ماه گذشته',
            dataLabels: {
              // enabled: true,
            },
            showInLegend: true,
            data: [...similarDayAverageInMonth],
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