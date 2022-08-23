import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';

export interface IInitialCount {
  countFemale: number;
  countHasAllergy: number;
  countHasBloodPressure: number;
  countHasDiabetes: number;
  countHasHepatitis: number;
  countHasHiv: number;
  countHasHormonalDisorders: number;
  countHasLiverProblems: number;
  countHasMetalInBody: number;
  countHasNervousOrMentalDisorders: number;
  countHasThyroidProblems: number;
  countHeartDisease: number;
  countMale: number;
  countSpecialDisease: number;
  countTotal: number;
  countZaerinAir: number;
  countZaerinGround: number;
  countZaerinRail: number;
}

export const initialCount = {
  countFemale: 0,
  countHasAllergy: 0,
  countHasBloodPressure: 0,
  countHasDiabetes: 0,
  countHasHepatitis: 0,
  countHasHiv: 0,
  countHasHormonalDisorders: 0,
  countHasLiverProblems: 0,
  countHasMetalInBody: 0,
  countHasNervousOrMentalDisorders: 0,
  countHasThyroidProblems: 0,
  countHeartDisease: 0,
  countMale: 0,
  countSpecialDisease: 0,
  countTotal: 0,
  countZaerinAir: 0,
  countZaerinGround: 0,
  countZaerinRail: 0,
};

export default function useGetArbaeenCountData(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialCount>(initialCount);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await arbaeenService.getPilgrimCount(params, {
        cancelToken: source.token,
      });
      setData((prev: any) => {
        return {
          ...prev,
          ...result,
        };
      });
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || '');
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialCount);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}
