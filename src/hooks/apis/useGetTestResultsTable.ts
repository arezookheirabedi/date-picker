import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {sideCities} from '../../helpers/utils';
import hcsService from '../../services/hcs.service';
import {EERRORS} from "../../constants/errors.enum";

export default function useGetTestResultsTable(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  async function getIt({retry , ...params}: any) {
    setLoading(true);
    try {
      const {data: result} = await hcsService.testResultByCategory(params, {
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
      setOrgDataset([...normalizedData]);
      setError(false)
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [query]);

  const location = useLocation();

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
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, data, setData, orgDataset};
}
