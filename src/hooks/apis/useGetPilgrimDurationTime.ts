import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {ECOLOR} from 'src/constants/color.enum';
import {useLocation} from 'react-router-dom';
import {getProvinceParam} from 'src/helpers/utils';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'درصد زائران',
      color: ECOLOR.COLOR6,
      data: [],
    },
  ],
} as any;

export default function useGetPilgrimDurationTime(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await arbaeenService.getPligrimTripDurationPercentage(
        {
          ...params,
        },
        {cancelToken: source.token}
      );
      const travelDuration: any[] = [];
      const percentage: any[] = [];
      const sortData = res.data.sort((a: any, b: any) => (a.percentage > b.percentage ? 1 : -1));

      sortData.forEach((item: any) => {
        percentage.push(item.percentage);
        travelDuration.push(item.travelDuration);
      });

      setData(() => {
        return {
          categories: travelDuration,
          series: [
            {
              name: 'درصد زائران',
              color: ECOLOR.COLOR6,
              data: [...percentage],
            },
          ],
        };
      });
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
      setData(initialData);
      setError(null);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  const location = useLocation();
  function doProvinceActions() {
    if (getProvinceParam()) {
      getIt({...query, province: getProvinceParam()});
    }
  }

  useEffect(() => {
    if (!hasProvince) return;
    doProvinceActions();
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, data};
}
