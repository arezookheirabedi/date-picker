import {useEffect, useState} from "react";
import axios from "axios";
import guildService from "../../services/guild.service";

export default function useGetTestResultsTable(query : any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  async function getIt(params: any) {
    setLoading(true);
    try {
      const {data: result} = await guildService.guildTestResultByCategory(params, {
        cancelToken: source.token,
      });
      const normalizedData: any[] = [];
      result.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue || 'نامشخص',
          total: item.testResultsCount || 0,
          positiveCountPercentage: item.positiveTestResultsCountToTestResultsCountPercentage || 0,
          negativeCountPercentage: item.negativeTestResultsCountToTestResultsCountPercentage || 0,
        });
      });
      setData([...normalizedData]);
      // setOrgDataset([...normalizedData]);
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message || '')
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getIt(query)
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [query]);

  return {loading, error, data};
}