import {useEffect, useState} from "react";
import axios from "axios";
import hcsService from "../../services/hcs.service";

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
};

export default function useGetNumberOf(query : any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(initialNumberOf);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async (params : any) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await hcsService.numberOf(
        params,
        {cancelToken: source.token}
      );
      setData({...result});
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf(query);
    return () => {
      setData(initialNumberOf);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}