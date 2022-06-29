import {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import axios from 'axios';
import hcsService from '../../services/hcs.service';
import {sideCities} from "../../helpers/utils";


interface IInitialTestResults {
  positiveMembersCount: number;
  recoveredMembersCount: number;
  testResultsCount: number;
  totalPopulation: number;
  positiveMembersCountToTotalPopulationPercentage: number;
  recoveredMembersCountToTotalPopulationPercentage: number;
  positiveMembersCountToTestResultsCountPercentage: number;
}

const initialTestResults = {
  positiveMembersCount: 0,
  positiveMembersCountToTestResultsCountPercentage: 0,
  positiveMembersCountToTotalPopulationPercentage: 0,
  recoveredMembersCount: 0,
  recoveredMembersCountToTotalPopulationPercentage: 0,
  testResultsCount: 0,
  totalPopulation: 0,
};

export default function useGetTestResults(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialTestResults>(initialTestResults);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getTestResults = async (params: any) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await hcsService.testResults(params, {cancelToken: source.token});
      setData((prev: any) => {
        return {
          ...prev,
          ...result,
        };
      });
    } catch (err: any) {
      setError(err.message || '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getTestResults(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialTestResults);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

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
      getTestResults({...query, 'province': provinceName});
    } else {
      history.push('/dashboard/health/transport/province');
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialTestResults);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return {loading, error, data};
}
