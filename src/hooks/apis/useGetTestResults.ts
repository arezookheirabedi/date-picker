import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {getProvinceParam} from '../../helpers/utils';

export interface IInitialTestResults {
  positiveMembersCount: number;
  recoveredMembersCount: number;
  testResultsCount: number;
  totalPopulation: number;
  positiveMembersCountToTotalPopulationPercentage: number;
  recoveredMembersCountToTotalPopulationPercentage: number;
  positiveMembersCountToTestResultsCountPercentage: number;
}

export const initialTestResults = {
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





  return {loading, error, data};
}
