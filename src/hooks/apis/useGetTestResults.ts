import {useEffect, useState} from 'react';
import axios from 'axios';
import hcsService from '../../services/hcs.service';

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

export default function useGetTestResults(query: any) {
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
    getTestResults(query);
    return () => {
      setData(initialTestResults);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}
