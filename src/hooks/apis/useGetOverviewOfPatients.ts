import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import hcsService from '../../services/hcs.service';
import {sideCities} from '../../helpers/utils';
import {EERRORS} from "../../constants/errors.enum";

export default function useGetOverviewOfPatients(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    try {
      const {data: result} = await hcsService.columnChartTestResultService(params, {
        cancelToken: source.token,
      });
      setData(result);
      setError(false);
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
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getIt({...query, province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [location.search, query]);

  return {loading, error, data};
}
