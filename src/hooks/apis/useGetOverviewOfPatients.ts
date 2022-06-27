import {useEffect, useState} from "react";
import axios from "axios";
import hcsService from "../../services/hcs.service";

export default function useGetOverviewOfPatients(query: any) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    try {
      const {data: result} = await hcsService.columnChartTestResultService(params, {
        cancelToken: source.token,
      });
      setData(result);
      setError(false)
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        return;
      }
      setError('خطا در اتصال به سرور')
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt(query);
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}