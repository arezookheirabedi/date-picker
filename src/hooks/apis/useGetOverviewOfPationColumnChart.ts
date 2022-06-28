import {useEffect, useState} from 'react';
import axios from 'axios';
import hcsService from '../../services/hcs.service';

export default function useGetOverviewOfVaccinationStackChart(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false) as any;
  const [dataset, setDataset] = useState<any>({});

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    setError(null);
    try {
      const {data} = await hcsService.getTableOverviewTestResults(
        {...params},
        {cancelToken: source.token}
      );

      const categoryValue: any[] = [];

      const positiveMembersCountToMembersCountPercentage: any[] = [];
      const sortData = data.sort((a: any, b: any) =>
        a.positiveMembersCountToMembersCountPercentage >
        b.positiveMembersCountToMembersCountPercentage
          ? 1
          : -1
      );
      sortData.forEach((item: any) => {
        categoryValue.push(item.categoryValue);
        positiveMembersCountToMembersCountPercentage.push(
          item.positiveMembersCountToMembersCountPercentage
        );
      });
      const newData = [
        {
          showInLegend: false,
          name: 'درصد ابتلا',
          data: [...positiveMembersCountToMembersCountPercentage],
        },
      ];
      setDataset({categories: [...categoryValue], series: [...newData]});
    } catch (errors: any) {
      setError(errors.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getIt(query);
    return () => {
      setDataset({});
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, dataset};
}
