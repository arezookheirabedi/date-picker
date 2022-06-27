import {useEffect, useState} from 'react';
import axios from 'axios';
import vaccineService from '../../services/vaccine.service';

export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialVacinatelInfo = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,

  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCount: 0,
};
export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: any;
  doses: any;
  dosesToTotalPopulationPercentage: any;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
}

export default function useGetNumberOf(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async (params: any) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await vaccineService.membersGeneral(params, {
        cancelToken: source.token,
      });
      setData({...result});
    } catch (err: any) {
      setError(err.message || '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf(query);
    return () => {
      setData(initialVacinatelInfo);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}
