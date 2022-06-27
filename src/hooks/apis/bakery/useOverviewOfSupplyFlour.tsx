import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfSupplyFlour() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(null);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const getColumnChartTestResult = async (params: any) => {
  const getColumnChartTestResult = async () => {
    try {
        const {data} = await bakeryService.bakeryReport(
          { reportName: "numberOfShareFlour" },
          { cancelToken: source.token }
        );
        const province: any[] = [];
        const NumberOfShareFlour: any[] = [];
        data.forEach((item: any) => {
          province.push(item.title);
          NumberOfShareFlour.push(Number(item.numberOfShareFlour));
        });
        // setCategories([...province]);
        const newData = [
          {
            name: 'میزان سهم آرد',
            dataLabels: {
              // enabled: true,
            },
            showInLegend: false,
            data: [...NumberOfShareFlour],
          },
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