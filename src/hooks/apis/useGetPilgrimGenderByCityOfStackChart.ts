import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'زائران زن',
      color: '#FF0060',
      data: [],
    },
    {
      name: ' زائران مرد',
      color: '#004D65',
      data: [],
    },
  ],
} as any;

export default function useGetPilgrimGenderByCityOfStackChart(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await arbaeenService.getPligrimGenderPerCity(
        {
          ...params,
        },
        {cancelToken: source.token}
      );
      const provinces: any[] = [];
      const maleCount: any[] = [];
      const femaleCount: any[] = [];
      const sortData = res.data.sort((a: any, b: any) => (a.maleCount > b.maleCount ? 1 : -1));

      sortData.forEach((item: any) => {
        maleCount.push(item.maleCount);
        femaleCount.push(item.femaleCount);
        provinces.push(item.city);
      });

      setData(() => {
        return {
          categories: provinces,
          series: [
            {
              name: 'زائران زن',
              color: '#FF0060',
              data: [...femaleCount],
            },
            {
              name: ' زائران مرد',
              color: '#004D65',
              data: [...maleCount],
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
  const location = useLocation();
  useEffect(() => {
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
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, data};
}
