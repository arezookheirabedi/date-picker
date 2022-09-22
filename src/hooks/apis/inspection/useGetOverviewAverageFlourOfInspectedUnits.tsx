import {useEffect, useState} from 'react';
import inspectionService from 'src/services/inspection.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';

export default function useGetOverviewAverageFlourOfInspectedUnits(query: any) {
  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getColumnChartTestResult = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await inspectionService.inspectionAverageFlour(
        {},
        {
          cancelToken: cancelToken.token,
        }
      );

      const province: any[] = [];
      const averageFlour: any[] = [];
      response.data.forEach((item: any) => {
        province.push(item.province);
        averageFlour.push(item.averageFlour);
      });
      const newData = [
        {
          name: 'میانگین آرد',
          showInLegend: false,
          data: [...averageFlour],
        },
      ];
      setData({categories: [...province], series: [...newData]});
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getColumnChartTestResult();
    }, 500);

    return () => {
      setData([]);
      cancelRequest();
      clearTimeout(idSetTimeOut);
    };
  }, [query]);

  return {loading, error, data};
}
