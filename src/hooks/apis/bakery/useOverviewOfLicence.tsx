import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfLicence() {
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
      const {data} = await bakeryService.bakeryReport(
        { reportName: "permission" },
        { cancelToken: source.token }
      );
      const province: any[] = [];
      const samt: any[] = [];
      const sima: any[] = [];
      data.forEach((item: any) => {
        province.push(item.province);
        samt.push(Number(item.samt));
        sima.push(Number(item.sima));
      });
      const newData = [
        {
          name: 'صمت',
          dataLabels: {
            // enabled: true,
          },
          showInLegend: true,
          data: [...samt],
        },
        {
          name: 'سیما',
          dataLabels: {
            // enabled: true,
          },
          showInLegend: true,
          data: [...sima],
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, '#5F5B97'],
            [1, '#DDDCE9'],
          ],
        },
      ];
      setList({categories: [...province], series: [...newData]});
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    getColumnChartTestResult()
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };

  }, []);
// }, [query]);
  
  return {loading, list, error};
}