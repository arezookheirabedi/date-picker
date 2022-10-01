import {useEffect, useState} from 'react';
import inspectionService from 'src/services/inspection.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';

export default function useGetOverviewAverageFlourOfInspectedUnits(query: any) {
  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getIt = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await inspectionService.ratioOfInspection(
        {},
        {
          cancelToken: cancelToken.token,
        }
      );
      const sortData = res.data.sort((a: any, b: any) =>
        a.averageOfFlour > b.averageOfFlour ? 1 : -1
      );
      const province: any[] = [];
      const averageFlour: any[] = [];
      sortData.forEach((item: any) => {
        province.push(item.province || '');
        averageFlour.push(item.averageOfFlour || 0);
      });
      const newData = [
        {
          name: 'میانگین آرد',
          showInLegend: false,
          data: [...averageFlour],
        },
      ];
      setData({categories: [...province], series: [...newData]});
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
    getIt();
    return () => {
      setData([]);
      cancelRequest();
    };
  }, [query]);

  return {loading, error, data};
}
