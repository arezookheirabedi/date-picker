import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import hcsService from '../../services/hcs.service';
import {sideCities} from '../../helpers/utils';

export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialVacinatelInfo = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: 0,
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCount: 0,
};

export interface IObjectOption {
  [key: number]: number;
}

export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: IObjectOption;
  doses: IObjectOption;
  dosesToTotalPopulationPercentage: IObjectOption;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: number;
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: number;
}

export default function useGetNumberOf(query?: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

  const {CancelToken} = axios;
  const source = CancelToken.source();


  const clear = () => {
    setData(initialVacinatelInfo);
    source.cancel('Operation canceled by the user.');
  }

  const getIt = async (params: any = {}) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await hcsService.numberOf(params, {cancelToken: source.token});
      setData({...result});
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
    getIt(query);
    // eslint-disable-next-line consistent-return
    return clear;
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
      getIt({...query, 'province': provinceName});
    } else {
      history.push('/dashboard/health/transport/province');
    }
    // eslint-disable-next-line consistent-return
    return clear;
  }, [location.search]);

  return {loading, error, data};
}
