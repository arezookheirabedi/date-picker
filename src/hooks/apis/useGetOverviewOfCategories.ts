import {useEffect, useState} from "react";
import axios from "axios";
import hcsService from "../../services/hcs.service";

export default function useGetOverviewOfCategories(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    setError(false);
    try {
      setLoading(true);
      const {data: result} = await hcsService.getTableOverviewTestResults({
        ...params,
        lang: 'fa',
      }, {cancelToken: source.token});

      const normalizedData: any[] = [];
      result.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue,
          employeesCount: item.membersCount || 0,
          infectedCount: item.positiveMembersCount || 0,
          infectedPercent: item.positiveMembersCountToMembersCountPercentage || 0,
          saveCount: item.recoveredMembersCount || 0,
          // deadCount: 120,
        });

      });
      setData([...normalizedData]);
      setOrgDataset([...normalizedData]);
      // setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt(query);
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [query]);

  return {loading, error, data , setData , orgDataset};
}