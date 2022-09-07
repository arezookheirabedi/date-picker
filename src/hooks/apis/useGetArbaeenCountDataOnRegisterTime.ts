import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';

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
  countLastPositiveTestResultWhileRegistered: number;
  countLastPositiveTestResult: number;
  countNonIranian: number;
  countMaleNonIranian: number;
  countFemaleNonIranian: number;
  countIranian: number;
  countMaleIranian: number;
  countFemaleIranian: number;
  countTaxi: number;
  countBusAndMinibus: number;
  countPersonal: number;
  countIranianPercentage: number;
  countMaleIranianPercentage: number;
  countFemaleIranianPercentage: number;
  countNonIranianPercentage: number;
  countMaleNonIranianPercentage: number;
  countFemaleNonIranianPercentage: number;
  countTotalPercentage: number;
  countZaerinAirPercentage: number;
  countZaerinGroundPercentage: number;
  countZaerinRailPercentage: number;
  countLastPositiveTestResultPercentage: number;
  countLastPositiveTestResultWhileRegisteredPercentage: number;
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
  countLastPositiveTestResultWhileRegistered: 0,
  countLastPositiveTestResult: 0,
  countNonIranian: 0,
  countMaleNonIranian: 0,
  countFemaleNonIranian: 0,
  countIranian: 0,
  countMaleIranian: 0,
  countFemaleIranian: 0,
  countTaxi: 0,
  countBusAndMinibus: 0,
  countPersonal: 0,
  countIranianPercentage: 0,
  countMaleIranianPercentage: 0,
  countFemaleIranianPercentage: 0,
  countNonIranianPercentage: 0,
  countMaleNonIranianPercentage: 0,
  countFemaleNonIranianPercentage: 0,
  countTotalPercentage: 0,
  countZaerinAirPercentage: 0,
  countZaerinGroundPercentage: 0,
  countZaerinRailPercentage: 0,
  countLastPositiveTestResultPercentage: 0,
  countLastPositiveTestResultWhileRegisteredPercentage: 0,
};

export default function useGetArbaeenCountDataOnRegisterTime(
  query: any,
  hasProvince: boolean = false
) {
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

  // ((60000 * 5) + Math.floor(Math.random() * 120000) + 1)
  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt(query);
    setInterval(() => {
      getIt(query);
    },(60000 * 5))
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialCount);
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
      setInterval(() => {
        getIt({...query, province: provinceName});
      },(60000 * 5))
      getIt({...query, province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialCount);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return {loading, error, data};
}
